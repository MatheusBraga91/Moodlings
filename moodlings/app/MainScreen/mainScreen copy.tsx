import React from 'react';
import { View, Text, Image, ImageBackground } from 'react-native';
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import styles from "./mainStyles";
import { THEMES } from '../cardThemes/themes'; // Adjust the path as needed

const MainScreen = () => {
  // Accessing user data from Redux
  const userInfo = useSelector((state: any) => state.user); // Adjust 'state.user' based on your Redux structure
  
  // Set default theme (can be dynamically updated later)
  const currentTheme = 'grape';  // Set to 'grape' by default

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
        imageStyle={styles.cardBackgroundImage} // Optional: Customize how the image is displayed
      >
        <Text style={[styles.testText, { color: THEMES[currentTheme].textColor }]}>
          {userInfo.name}
        </Text>

        <View style={[styles.zodiacContainer, { backgroundColor: THEMES[currentTheme].avatarContainerColor }]}>
          <Image source={userInfo.zodiacSymbol} style={styles.zodiacImage} />
        </View>

        {/* Avatar */}
        <View style={[styles.avatarContainer, { backgroundColor: THEMES[currentTheme].avatarContainerColor }]}>
          <Image source={userInfo.avatar} style={styles.avatarImage} />
        </View>

        {/* Mood container */}
        <View style={[styles.moodContainer, { backgroundColor: THEMES[currentTheme].moodContainerColor }]}>
          <Text style={[styles.moodText, { color: THEMES[currentTheme].textColor }]}>
           Click to set! {/* Mood text can be dynamically updated */}
          </Text>
        </View>
      </ImageBackground>

      {/* Bottom Container */}
      <View style={styles.bottomContainer}>
        <Text style={styles.footerText}>Bottom Container</Text>
      </View>
    </View>
  );
};

export default MainScreen;
