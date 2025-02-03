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
import { zodiacSymbols } from '../index';

const MainScreen = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  // Accessing user data from Redux
  const userInfo = useSelector((state: RootState) => state.user);

  // Set default theme and mood
  const currentTheme = 'redish';
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

  const zodiacImage = zodiacSymbols[userInfo.zodiacSymbol as keyof typeof zodiacSymbols] || zodiacSymbols.default

  return (
    <View style={styles.mainContainer}>
      {/* Top Container */}
      <View style={styles.topContainer}>
        <Text style={styles.text}>Top Container</Text>
        <TouchableOpacity style={styles.addMoodButton} onPress={handleAddMood}>
          <Text style={styles.addMoodText}>Add Mood</Text>
        </TouchableOpacity>

      </View>

      {/* Middle Container with Card Background */}
      <ImageBackground
        source={THEMES[currentTheme].cardImage}
        style={styles.middleContainer}
        imageStyle={styles.cardBackgroundImage}
      >
        <Text style={[styles.testText, { color: THEMES[currentTheme].avatarContainerColor }]}>
          {userInfo.name}
        </Text>

        <View style={[styles.zodiacContainer, { backgroundColor: THEMES[currentTheme].avatarContainerColor }]}>
          <Image source={zodiacImage} style={styles.zodiacImage} />
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
        <Text style={styles.footerText}>Bottom Container</Text>
        <TouchableOpacity
          style={styles.calendarButton}
          onPress={() => router.push('../Calendar/calendar')}
        >
          <Text style={styles.calendarButtonText}>calendar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MainScreen;
