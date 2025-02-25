import React, { useState } from 'react';
import { View, Image, ImageBackground, Text, TouchableOpacity, Modal, ScrollView, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { THEMES } from '../cardThemes/themes';
import { DETAILS, DetailsCategory } from '../EditScreen/details';
import avatarMap from '../MainScreen/avatarMap';
import { zodiacSymbols } from '../onboarding/create';
import styles from './editStyles';
import { setDetail, setTheme } from '../../redux/cardThemeSlice';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { supabase } from '../lib/supabaseClient';

const EditScreen = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state: RootState) => state.user);
  const currentTheme = useSelector((state: RootState) => state.cardTheme.currentTheme);
  const currentDetail = useSelector((state: RootState) => state.cardTheme.currentDetail); // Get current detail

  // State for modals
  const [isThemeModalVisible, setThemeModalVisible] = useState(false);
  const [isStampModalVisible, setStampModalVisible] = useState(false); // Controls the Stamps modal
  const [isDetailModalVisible, setDetailModalVisible] = useState(false); // Controls the Detail modal
  const [selectedCategory, setSelectedCategory] = useState<DetailsCategory | null>(null); // Tracks the selected category

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
  const handleThemeSelect = async (theme: keyof typeof THEMES) => {
    try {
      // Save the selected theme to Redux
      dispatch(setTheme(theme));

      // Get the current user
      const { data: userData, error: userError } = await supabase.auth.getUser();

      if (userError || !userData.user) {
        console.error('Error getting user:', userError?.message);
        Alert.alert('Error', 'Failed to retrieve user information.');
        return;
      }

      const userId = userData.user.id;

      // Update theme in Supabase
      const { error } = await supabase
        .from('MoodUsers')
        .update({ theme })
        .eq('id', userId);

      if (error) {
        console.error('Error updating theme in Supabase:', error.message);
        Alert.alert('Error', 'Failed to save theme.');
        return;
      }

      console.log('Theme updated successfully in Supabase.');
    } catch (err) {
      console.error('Unexpected error:', err);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }
  };


  // Resolve the detail key to the actual image
  const detailImage = currentDetail
    ? Object.values(DETAILS)
      .flatMap(category => Object.entries(category))
      .find(([key]) => key === currentDetail)?.[1]
    : null;

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

        {/* Stamp Categories Modal */}
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
                  style={styles.categoryOption}
                  onPress={() => {
                    setSelectedCategory(category as DetailsCategory);
                    setStampModalVisible(false);
                    setDetailModalVisible(true);
                  }}
                >
                  <Text style={styles.categoryText}>{category}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setStampModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        {/* Details Modal */}
        <Modal
          visible={isDetailModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setDetailModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={true}>
              {selectedCategory &&
                Object.entries(DETAILS[selectedCategory]).map(([detailId, detailImage]) => (
                  <TouchableOpacity
                    key={detailId}
                    style={styles.detailOption}
                    onPress={() => {
                      dispatch(setDetail(detailId)); // Save the selected detail's ID to Redux
                      setDetailModalVisible(false); // Close modal

                      // Save the selected detail to Supabase
                      const updateDetailInSupabase = async () => {
                        try {
                          // Get the current user
                          const { data: userData, error: userError } = await supabase.auth.getUser();

                          if (userError || !userData.user) {
                            console.error('Error getting user:', userError?.message);
                            Alert.alert('Error', 'Failed to retrieve user information.');
                            return;
                          }

                          const userId = userData.user.id;

                          // Update detail in Supabase
                          const { error } = await supabase
                            .from('MoodUsers')
                            .update({ detail: detailId })
                            .eq('id', userId);

                          if (error) {
                            console.error('Error updating detail in Supabase:', error.message);
                            Alert.alert('Error', 'Failed to save detail.');
                            return;
                          }

                          console.log('Detail updated successfully in Supabase.');
                        } catch (err) {
                          console.error('Unexpected error:', err);
                          Alert.alert('Error', 'An unexpected error occurred. Please try again.');
                        }
                      };

                      updateDetailInSupabase();
                    }}

                  >
                    <Image source={detailImage} style={styles.detailImage} />
                  </TouchableOpacity>
                ))}
            </ScrollView>

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
