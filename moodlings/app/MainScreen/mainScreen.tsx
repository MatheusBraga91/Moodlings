import React, { useState, useEffect } from 'react';
import {
  View, Text, Image, ImageBackground, Modal, TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import styles from './mainStyles';
import { THEMES } from '../cardThemes/themes';
import avatarMap, { AvatarType, Mood } from './avatarMap';
import { setMood } from '../../redux/userSlice'; // Import the setMood action

const MainScreen = () => {
  const dispatch = useDispatch();
  // Accessing user data from Redux
  const userInfo = useSelector((state: RootState) => state.user); // 'state.user' based on Redux structure

  // Set default theme and mood
  const currentTheme = 'garden'; // Set 'garden' by default
  const [isModalVisible, setModalVisible] = useState(false); // State to control modal visibility

  // Open and close modal
  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  // Handle mood selection with Redux
  const selectMood = (selectedMood: Mood) => {
    dispatch(setMood(selectedMood)); // Dispatch selected mood to Redux
    closeModal(); // Close modal after selection
  };

  // Log the user info from Redux when the page loads
  useEffect(() => {
    console.log('User Info from Redux:');
    console.log('Name:', userInfo.name);
    console.log('Avatar:', userInfo.avatar);
    console.log('Mood:', userInfo.mood);
    console.log('Zodiac Symbol:', userInfo.zodiacSymbol);
    console.log('Date of Birth:', userInfo.dateOfBirth);
  }, [userInfo]); // Dependency array to run the effect whenever `userInfo` changes

  // Get the avatar image based on user info
  const getAvatarImage = () => {
    const userAvatar = userInfo.avatar as AvatarType;
    const userMood = userInfo.mood as Mood; // Fallback to 'default' if mood is not set

    // Ensure the avatar and mood exist in the map
    if (avatarMap[userAvatar] && avatarMap[userAvatar][userMood]) {
      return avatarMap[userAvatar][userMood];
    }
    return null; // Fallback to null if no matching avatar
  };

  const avatarImage = getAvatarImage();

  return (
    <View style={styles.mainContainer}>
      {/* Top Container */}
      <View style={styles.topContainer}>
        <Text style={styles.text}>Top Container</Text>
      </View>

      {/* Middle Container with Card Background */}
      <ImageBackground
        source={THEMES[currentTheme].cardImage} // Dynamically use the card image based on the theme
        style={styles.middleContainer}
        imageStyle={styles.cardBackgroundImage} // Customize how image is displayed
      >
        <Text style={[styles.testText, { color: THEMES[currentTheme].avatarContainerColor }]}>
          {userInfo.name}
        </Text>

        <View style={[styles.zodiacContainer, { backgroundColor: THEMES[currentTheme].avatarContainerColor }]}>
          <Image source={userInfo.zodiacSymbol as any} style={styles.zodiacImage} />
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
                onPress={() => selectMood(mood as Mood)} // Cast to Mood here
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
      </View>
    </View>
  );
};

export default MainScreen;
