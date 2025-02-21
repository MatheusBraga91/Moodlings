import React, { useState, useEffect } from 'react';
import {
  View, Text, Image, ImageBackground, Modal, TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useRouter } from 'expo-router';
import styles from './mainStyles';
import { THEMES } from '../cardThemes/themes';
import avatarMap, { AvatarType, Mood } from './avatarMap';
import { setMood, triggerAddMood, incrementContainerUsage } from '../../redux/userSlice';
import { DETAILS, DetailsCategory } from '../EditScreen/details';
import { zodiacSymbols } from '../index';
import 'react-native-gesture-handler';

const MainScreen = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  // Accessing user data and card theme from Redux
  const userInfo = useSelector((state: RootState) => state.user);
  const currentTheme = useSelector((state: RootState) => state.cardTheme.currentTheme);
  const currentDetail = useSelector((state: RootState) => state.cardTheme.currentDetail); // Get current detail
  const [isModalVisible, setModalVisible] = useState(false);

  // Open and close modal
  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  // Handle mood selection with Redux
  const selectMood = (selectedMood: Mood) => {
    dispatch(setMood(selectedMood));
    closeModal();
  };

  // Log user info when the page loads
  useEffect(() => {
    console.log('User Info from Redux:', userInfo);
  }, [userInfo]);

  // Get the avatar image based on user info
  const getAvatarImage = () => {
    const userAvatar = userInfo.avatar;
    const userMood = userInfo.mood;

    if (avatarMap[userAvatar] && avatarMap[userAvatar][userMood]) {
      return avatarMap[userAvatar][userMood];
    }
    return null;
  };

  const avatarImage = getAvatarImage();

  // Handle Add Mood button click
  const handleAddMood = () => {
    dispatch(triggerAddMood()); // Set addMoodTriggered to true
    dispatch(incrementContainerUsage()); // Increment container usage by 1
  };

  const calendarIcon = require('../../assets/icons/calendar.png');
  const editIcon = require('../../assets/icons/edit.png');
  const socialIcon = require('../../assets/icons/social.png');
  const giftsIcon = require('../../assets/icons/gifts.png');

  const zodiacImage = zodiacSymbols[userInfo.zodiacSymbol as keyof typeof zodiacSymbols] || zodiacSymbols.default;

  return (
    <View style={styles.mainContainer}>
      {/* Top Container */}
      <View style={styles.topContainer}>
        <Text style={styles.text}>Hi {userInfo.name}, how are you feeling today? </Text>
        <TouchableOpacity style={styles.addMoodButton} onPress={handleAddMood}>
          <Text style={styles.addMoodText}>Add Mood</Text>
        </TouchableOpacity>
      </View>

      {/* Middle Container with Card Background */}
      <ImageBackground
        source={THEMES[currentTheme].cardImage} // Use currentTheme from Redux
        style={styles.middleContainer}
        imageStyle={styles.cardBackgroundImage}
      >
        {currentDetail && (
          <Image
            source={typeof currentDetail === 'string' ? { uri: currentDetail } : currentDetail}
            style={styles.detailOverlay} // Add a style for positioning the detail
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
        <TouchableOpacity
          style={[styles.moodContainer, { backgroundColor: THEMES[currentTheme].moodContainerColor }]}
          onPress={openModal}
        >
          <Text style={[styles.moodText, { color: THEMES[currentTheme].textColor }]}>
            {userInfo.mood ? userInfo.mood : 'Click to set!'}
          </Text>
        </TouchableOpacity>
      </ImageBackground>

      {/* Modal for Mood Selection */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Select Your Mood</Text>
            {['Happy', 'Sad', 'Angry'].map((mood) => (
              <TouchableOpacity
                key={mood}
                style={styles.moodOption}
                onPress={() => selectMood(mood as Mood)}
              >
                <Text style={styles.moodText}>{mood}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Bottom Container */}
      <View style={styles.bottomContainer}>
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