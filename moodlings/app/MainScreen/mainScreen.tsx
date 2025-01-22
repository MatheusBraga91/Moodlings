import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  Modal,
  TouchableOpacity,
} from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import styles from './mainStyles';
import { THEMES } from '../cardThemes/themes'; 

const MainScreen = () => {
  // Accessing user data from Redux
  const userInfo = useSelector((state: any) => state.user); // 'state.user' based on Redux structure

  // Set default theme and mood
  const currentTheme = 'grape'; // Set 'grape' by defaut
  const [mood, setMood] = useState<string | null>(null); // State for the select mood
  const [isModalVisible, setModalVisible] = useState(false); // State to control modal visibility

  // Open and clse modal
  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  // handle mod selection
  const selectMood = (selectedMood: string) => {
    setMood(selectedMood); // Set the selecte mood
    closeModal(); // Close modal
  };

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
        imageStyle={styles.cardBackgroundImage} // Customize how image displayed
      >
        <Text style={[styles.testText, { color: THEMES[currentTheme].avatarContainerColor }]}>
          {userInfo.name}
        </Text>

        <View style={[styles.zodiacContainer, { backgroundColor: THEMES[currentTheme].avatarContainerColor }]}>
          <Image source={userInfo.zodiacSymbol} style={styles.zodiacImage} />
        </View>

        {/* Avatar */}
        <View style={[styles.avatarContainer, { backgroundColor: THEMES[currentTheme].avatarContainerColor }]}>
          <Image source={userInfo.avatar} style={styles.avatarImage} />
        </View>

        {/* Mood Container */}
        <TouchableOpacity
          style={[styles.moodContainer, { backgroundColor: THEMES[currentTheme].moodContainerColor }]}
          onPress={openModal}
        >
          <Text style={[styles.moodText, { color: THEMES[currentTheme].textColor }]}>
            {mood ? mood : 'Click to set!'}
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
            {['Happy', 'Sad', 'Angry'].map((m) => (
              <TouchableOpacity
                key={m}
                style={styles.moodOption}
                onPress={() => selectMood(m)}
              >
                <Text style={styles.moodText}>{m}</Text>
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