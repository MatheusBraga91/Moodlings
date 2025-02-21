import React, { useState } from 'react';
import { View, Image, ImageBackground, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { THEMES } from '../cardThemes/themes';
import { DETAILS, DetailsCategory } from '../EditScreen/details';
import avatarMap from '../MainScreen/avatarMap';
import { zodiacSymbols } from '../index';
import styles from './editStyles';
import { setDetail, setTheme } from '../../redux/cardThemeSlice';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const EditScreen = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state: RootState) => state.user);
  const currentTheme = useSelector((state: RootState) => state.cardTheme.currentTheme);
  const currentDetail = useSelector((state: RootState) => state.cardTheme.currentDetail); // Get current detail

  // State for modals
  const [isThemeModalVisible, setThemeModalVisible] = useState(false);
  const [isStampModalVisible, setStampModalVisible] = useState(false); // Controls the Stamps modal
  const [isDetailModalVisible, setDetailModalVisible] = useState(false); // Controls the Detail modal
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof DETAILS | null>(null); // Tracks the selected category

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
  const zodiacImage = zodiacSymbols[userInfo.zodiacSymbol as keyof typeof zodiacSymbols] || zodiacSymbols.default;

  // Handle theme selection
  const handleThemeSelect = (theme: keyof typeof THEMES) => {
    dispatch(setTheme(theme)); // Save the selected theme to Redux
  };


  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.mainContainer}>
        {/* Top Container (Empty for now) */}
        <View style={styles.topContainer} />

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
          <View style={[styles.moodContainer, { backgroundColor: THEMES[currentTheme].moodContainerColor }]}>
            <Text style={[styles.moodText, { color: THEMES[currentTheme].textColor }]}>
              {userInfo.mood ? userInfo.mood : 'Click to set!'}
            </Text>
          </View>
        </ImageBackground>

        {/* Bottom Container */}
        <View style={styles.bottomContainer}>
          {/* Theme Button */}
          <TouchableOpacity
            style={styles.themeButton}
            onPress={() => setThemeModalVisible(true)}
          >
            <Text style={styles.themeButtonText}>Themes</Text>
          </TouchableOpacity>

          {/* Stamp Button */}
          <TouchableOpacity
            style={styles.stampButton}
            onPress={() => setStampModalVisible(true)} // Open the Stamps modal
          >
            <Text style={styles.stampButtonText}>Stamps</Text>
          </TouchableOpacity>
        </View>


        <Modal
          visible={isStampModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setStampModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={true}>
              {Object.keys(DETAILS).map((category) => (
                <TouchableOpacity
                  key={category}
                  style={styles.categoryOption} // Use a style for rounded containers
                  onPress={() => {
                    setSelectedCategory(category as keyof typeof DETAILS); // Set the selected category
                    setStampModalVisible(false); // Close the Stamps modal
                    setDetailModalVisible(true); // Open the Detail modal
                  }}
                >
                  <Text style={styles.categoryText}>{category}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Close Button */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setStampModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        <Modal
          visible={isDetailModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setDetailModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={true}>
              {selectedCategory && DETAILS[selectedCategory].map((image, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.detailOption} // Use a style for rounded containers
                  onPress={() => {
                    dispatch(setDetail(image)); // Set the selected image as the current detail
                  }}
                >
                  <Image source={image} style={styles.detailImage} />
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Close Button */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setDetailModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>



        {/* Themes Modal */}
        <Modal
          visible={isThemeModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setThemeModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={true}>
              {Object.keys(THEMES).map((theme) => (
                <TouchableOpacity
                  key={theme}
                  style={styles.themeOption}
                  onPress={() => handleThemeSelect(theme as keyof typeof THEMES)}
                >
                  <Image
                    source={THEMES[theme as keyof typeof THEMES].cardImage}
                    style={styles.themeImage}
                  />
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Close Button */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setThemeModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>




      </View>
    </GestureHandlerRootView>
  );
};

export default EditScreen;