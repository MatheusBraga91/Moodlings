import React, { useState, useEffect } from 'react';
import {
  View, Text, Image, ImageBackground, Modal, TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useRouter } from 'expo-router';
import styles from './mainStyles';
import { THEMES } from '../cardThemes/themes';
import avatarMap, { AvatarType, Mood } from './avatarMap';
import { setMood, triggerAddMood, incrementContainerUsage } from '../../redux/userSlice';
import { DETAILS, DetailsCategory } from '../EditScreen/details';
import { zodiacSymbols } from '../onboarding/create';
import { supabase } from '../lib/supabaseClient'; // Import Supabase client
import 'react-native-gesture-handler';

const MainScreen = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  // Accessing user data and card theme from Redux
  const userInfo = useSelector((state: RootState) => state.user);
  const currentTheme = useSelector((state: RootState) => state.cardTheme.currentTheme);
  const currentDetail = useSelector((state: RootState) => state.cardTheme.currentDetail); // Get current detail
  const [isModalVisible, setModalVisible] = useState(false);
  const [temporaryMood, setTemporaryMood] = useState<Mood | null>(null); // Temporary mood for visual feedback

  // Open and close modal
  const openModal = () => {
    setTemporaryMood(null); // Reset temporary mood when modal opens
    setModalVisible(true);
  };
  const closeModal = () => {
    setTemporaryMood(null); // Reset temporary mood when modal closes
    setModalVisible(false);
  };

  // Handle mood selection in the modal (visual feedback only)
  const handleSelectMood = (selectedMood: Mood) => {
    setTemporaryMood(selectedMood); // Update temporary mood for visual feedback
  };

  // Handle Set Mood button click
  const handleSetMood = async () => {
    if (!temporaryMood) return; // Ensure a mood is selected

    try {
      // Update mood in Redux
      dispatch(setMood(temporaryMood));

      // Get the current user
      const { data: userData, error: userError } = await supabase.auth.getUser();

      if (userError || !userData.user) {
        console.error('Error getting user:', userError?.message);
        Alert.alert('Error', 'Failed to retrieve user information.');
        return;
      }

      const userId = userData.user.id;

      // Update mood in Supabase
      const { error } = await supabase
        .from('MoodUsers')
        .update({ mood: temporaryMood })
        .eq('id', userId);

      if (error) {
        console.error('Error updating mood in Supabase:', error.message);
        Alert.alert('Error', 'Failed to save mood.');
        return;
      }

      console.log('Mood updated successfully in Supabase.');

      // Trigger handleAddMood
      dispatch(triggerAddMood()); // Set addMoodTriggered to true
      dispatch(incrementContainerUsage()); // Increment container usage by 1

      // Close the modal
      closeModal();
    } catch (err) {
      console.error('Unexpected error:', err);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }
  };

  // Log user info when the page loads
  useEffect(() => {
    console.log('User Info from Redux:', userInfo);
  }, [userInfo]);

  // Get the avatar image based on user info
  const getAvatarImage = () => {
    const userAvatar = userInfo.avatar;
    const moodToUse = temporaryMood || userInfo.mood; // Use temporaryMood if modal is open, otherwise use Redux mood

    if (avatarMap[userAvatar] && avatarMap[userAvatar][moodToUse]) {
      return avatarMap[userAvatar][moodToUse];
    }
    return null;
  };

  const avatarImage = getAvatarImage();

  // Handle Add Mood button click
  const handleAddMood = () => {
    openModal(); // Open the modal when Add Mood is clicked
  };

  const calendarIcon = require('../../assets/icons/calendar.png');
  const editIcon = require('../../assets/icons/edit.png');
  const socialIcon = require('../../assets/icons/social.png');
  const giftsIcon = require('../../assets/icons/gifts.png');

  const zodiacImage = zodiacSymbols[userInfo.zodiacSymbol as keyof typeof zodiacSymbols] || zodiacSymbols.default;

  // Resolve the detail key to the actual image
  const detailImage = currentDetail
    ? Object.values(DETAILS)
      .flatMap(category => Object.entries(category))
      .find(([key]) => key === currentDetail)?.[1]
    : null;

  return (
    <View style={styles.mainContainer}>
      {/* Top Container */}
      <View style={[styles.topContainer, { backgroundColor: THEMES[currentTheme].topContainer }]}>
        <Text style={[styles.moodText, { color: THEMES[currentTheme].welcomeColor }]}>Hi {userInfo.name}, how are you feeling today? </Text>
        <TouchableOpacity style={[styles.addMoodButton, { backgroundColor: THEMES[currentTheme].moodContainerColor }]} onPress={handleAddMood}>
          <Text style={[styles.addMoodText, { color: THEMES[currentTheme].textColor }]}>Select Mood</Text>
        </TouchableOpacity>
      </View>

      {/* Middle Container with Card Background */}
      <ImageBackground
        source={THEMES[currentTheme].cardImage} // Use currentTheme from Redux
        style={styles.middleContainer}
        imageStyle={styles.cardBackgroundImage}
      >
        {detailImage && (
          <Image
            source={detailImage}
            style={styles.detailOverlay}
          />
        )}
        <Text style={[styles.testText, { color: THEMES[currentTheme].avatarContainerColor }]}>
          {userInfo.name}
        </Text>

        <View style={[styles.zodiacContainer, { backgroundColor: THEMES[currentTheme].avatarContainerColor }]}>
          <Image source={zodiacImage} style={[styles.zodiacImage, { tintColor: THEMES[currentTheme].zodiacImage }]} />
        </View>

        {/* Avatar */}
        <View style={[styles.avatarContainer, { backgroundColor: THEMES[currentTheme].avatarContainerColor }]}>
          <Image source={avatarImage as any} style={styles.avatarImage} />
        </View>

        {/* Mood Container */}
        <View style={[styles.moodContainer, { backgroundColor: THEMES[currentTheme].moodContainerColor }]}>
          <Text style={[styles.moodText, { color: THEMES[currentTheme].textColor }]}>
            {userInfo.mood ? userInfo.mood : 'Click to set!'}
          </Text>
        </View>
      </ImageBackground>

      {/* Modal for Mood Selection */}
      <Modal
        visible={isModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={[styles.modalContainer, { backgroundColor: THEMES[currentTheme].topContainer }]}>
          <Text style={[styles.modalTitle, { color: THEMES[currentTheme].avatarContainerColor }]}>Select Your Mood</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={true}>
            {['Happy', 'Sad', 'Angry'].map((mood) => (
              <TouchableOpacity
                key={mood}
                style={[styles.moodOption, { backgroundColor: THEMES[currentTheme].avatarContainerColor }]}
                onPress={() => handleSelectMood(mood as Mood)}
              >
                <Text style={[styles.moodTextModal, { color: THEMES[currentTheme].textColor }]}>{mood}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <View style={styles.modalButtonContainer}>
            <TouchableOpacity
              style={[styles.setMoodButton, !temporaryMood && styles.disabledButton]}
              onPress={handleSetMood}
              disabled={!temporaryMood}
            >
              <Text style={styles.setMoodText}>Set Mood</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Bottom Container */}
      <View style={[styles.bottomContainer, { backgroundColor: THEMES[currentTheme].bottomContainer }]}>
        <TouchableOpacity
          style={styles.calendarButton}
          onPress={() => router.push('../Calendar/calendar')}
        >
          <Image source={calendarIcon} style={styles.calendarIcon} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => router.push('../EditScreen/editScreen')}
        >
          <Image source={editIcon} style={styles.editIcon} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.socialButton}
          onPress={() => router.push('../SocialScreen/social')}
        >
          <Image source={socialIcon} style={styles.socialIcon} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.giftsButton}
        >
          <Image source={giftsIcon} style={styles.giftsIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MainScreen;