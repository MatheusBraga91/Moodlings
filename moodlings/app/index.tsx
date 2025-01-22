import React, { useEffect, useState } from "react";
import {
  Image,
  ImageBackground,
  Text,
  View,
  Pressable,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  Modal,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import * as Font from "expo-font";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../redux/userSlice";
import { getZodiacSign } from "./zodiac";
import styles from "./styles";
import { useRouter } from "expo-router";  // Importing useRouter for navigation

// Avatars and Zodiac symbols setup
const avatars = {
  bunny: require("../assets/avatars/bunny/bunny.png"),
  racoon: require("../assets/avatars/racoon/racoon.png"),
  fox: require("../assets/avatars/fox/fox.png"),
};

const zodiacSymbols = {
  default: require("../assets/zodiac/default.png"),
  aries: require("../assets/zodiac/aries.png"),
  taurus: require("../assets/zodiac/taurus.png"),
  gemini: require("../assets/zodiac/gemini.png"),
  cancer: require("../assets/zodiac/cancer.png"),
  leo: require("../assets/zodiac/leo.png"),
  virgo: require("../assets/zodiac/virgo.png"),
  libra: require("../assets/zodiac/libra.png"),
  scorpio: require("../assets/zodiac/scorpio.png"),
  sagittarius: require("../assets/zodiac/sagittarius.png"),
  capricorn: require("../assets/zodiac/capricorn.png"),
  aquarius: require("../assets/zodiac/aquarius.png"),
  pisces: require("../assets/zodiac/pisces.png"),
};

export default function Index() {
  const [currentAvatar, setCurrentAvatar] = useState(avatars.bunny);
  const [fontLoaded, setFontLoaded] = useState(false);
  const [date, setDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [currentZodiacSymbol, setCurrentZodiacSymbol] = useState(zodiacSymbols.default);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [name, setName] = useState("");
  
  const dispatch = useDispatch();
  const router = useRouter();  // Initialize useRouter for navigation

  useEffect(() => {
    const loadFont = async () => {
      await Font.loadAsync({
        "fink-heavy": require("../assets/fonts/FinkHeavy.ttf"),
      });
      setFontLoaded(true);
    };
    loadFont();
  }, []);

  const changeAvatarRight = () => {
    if (currentAvatar === avatars.bunny) {
      setCurrentAvatar(avatars.fox);
    } else if (currentAvatar === avatars.fox) {
      setCurrentAvatar(avatars.racoon);
    } else {
      setCurrentAvatar(avatars.bunny);
    }
  };

  const changeAvatarLeft = () => {
    if (currentAvatar === avatars.bunny) {
      setCurrentAvatar(avatars.racoon);
    } else if (currentAvatar === avatars.racoon) {
      setCurrentAvatar(avatars.fox);
    } else {
      setCurrentAvatar(avatars.bunny);
    }
  };

  const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (selectedDate) {
      setDate(selectedDate);
      const zodiacSign = getZodiacSign(selectedDate);
      const zodiacImage = zodiacSymbols[zodiacSign as keyof typeof zodiacSymbols] || zodiacSymbols.default;
      setCurrentZodiacSymbol(zodiacImage);
    }
    setShowDatePicker(false);
  };

  // REDUX SAVE INFO
  const handleCreateUser = () => {
    if (name) {
      // Show confirmation alert before saving
      Alert.alert(
        "Create your profile?",
        "Do you want to save your profile information?",
        [
          {
            text: "No",
            onPress: () => console.log("User cancelled profile creation."),
            style: "cancel",
          },
          {
            text: "Yes",
            onPress: () => {
              // Dispatch user info to Redux
              dispatch(setUserInfo({
                name: name,
                avatar: currentAvatar,
                dateOfBirth: date.toLocaleDateString(),
                zodiacSymbol: currentZodiacSymbol,
              }));

              alert("User information saved!");
              // Navigate to the main screen after profile creation
              router.push("../MainScreen/mainScreen");
            },
          },
        ],
        { cancelable: true }
      );
    } else {
      alert("Please enter a name.");
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={0}
      >
        {/* Touch event to dismiss the keyboard when tapping outside */}
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <ImageBackground
            source={require("../assets/backgrounds/user_creation_background.png")}
            style={styles.backgroundImage}
          >
            <View style={styles.topContainer}>
              <View style={styles.titleContainer}>
                {fontLoaded && (
                  <Text style={styles.selectAvatarText}>Select Your Avatar</Text>
                )}
              </View>
            </View>
            <View style={styles.middleContainer}>
              <Pressable onPress={handleCreateUser} style={styles.createButton}>
                <Text style={styles.createButtonText}>Create</Text>
              </Pressable>

              <View style={styles.avatarContainer}>
                <Image source={currentAvatar} style={styles.avatarImage} />
              </View>
              <View style={styles.zodiacContainer}>
                <Image source={currentZodiacSymbol} style={styles.zodiacSymbol} />
              </View>
              <View style={styles.arrowLeft}>
                <Pressable onPress={changeAvatarLeft} style={styles.arrowButtonLeft}>
                  <Image
                    source={require("../assets/buttons/arrow-left.png")}
                    style={styles.arrowImage}
                  />
                </Pressable>
              </View>
              <View style={styles.arrowRight}>
                <Pressable onPress={changeAvatarRight} style={styles.arrowButtonRight}>
                  <Image
                    source={require("../assets/buttons/arrow-right.png")}
                    style={styles.arrowImage}
                  />
                </Pressable>
              </View>
            </View>
            <View style={styles.lowerContainer}>
              <View style={styles.nameLetterContainer}>
                {fontLoaded && (
                  <Text style={styles.nameText}>Name</Text>
                )}
              </View>
              <Pressable onPress={() => setIsModalVisible(true)} style={styles.nameContainer}>
                {fontLoaded && (
                  <Text style={styles.inputName}>
                    {name || "Enter your name"}
                  </Text>
                )}
              </Pressable>
              <View style={styles.selectBirthLetterContainer}>
                {fontLoaded && (
                  <Text style={styles.selectBirthText}>Date of Birth</Text>
                )}
              </View>
              <View style={styles.dateContainer}>
                <Pressable onPress={() => setShowDatePicker(true)} style={styles.datePickerButton}>
                  <Text style={styles.dateText}>{date.toLocaleDateString()}</Text>
                </Pressable>

                {showDatePicker && (
                  <DateTimePicker
                    value={date}
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
                  />
                )}
              </View>
            </View>
          </ImageBackground>
        </TouchableWithoutFeedback>

        {/* Modal Screen */}
        <Modal visible={isModalVisible} transparent animationType="fade">
          <TouchableWithoutFeedback onPress={() => setIsModalVisible(false)}>
            <View style={styles.modalBackground}>
              <View style={styles.modalContainer}>
                <TextInput
                  style={styles.modalInput}
                  placeholder="Enter your name"
                  placeholderTextColor="#fff"
                  maxLength={12}
                  value={name}
                  onChangeText={(text) => setName(text)}
                  autoFocus
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
