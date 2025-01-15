import React, { useEffect, useState } from "react";
import { 
  Image, 
  ImageBackground, 
  StyleSheet, 
  Text, 
  View, 
  Pressable, 
  TextInput, 
  KeyboardAvoidingView, 
  TouchableWithoutFeedback, 
  Keyboard 
} from "react-native";
import * as Font from "expo-font";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { getZodiacSign } from "./zodiac";
import { KeyboardAccessoryView } from 'react-native-keyboard-accessory'

// Avatar images
const avatars = {
  bunny: require("../assets/avatars/bunny.png"),
  racoon: require("../assets/avatars/racoon.png"),
  fox: require("../assets/avatars/fox.png"),
};

// Zodiac symbols
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

  // Load custom font
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

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ImageBackground
          source={require("../assets/backgrounds/user_creation_background.png")}
          style={styles.background}
        >
          <View style={styles.innerContainer}>
            <Image source={currentAvatar} style={styles.avatar} />

            <Pressable onPress={changeAvatarLeft}>
              <Image
                source={require("../assets/buttons/arrow-left.png")}
                style={[styles.button, styles.leftButton]}
              />
            </Pressable>

            <Pressable onPress={changeAvatarRight}>
              <Image
                source={require("../assets/buttons/arrow-right.png")}
                style={[styles.button, styles.rightButton]}
              />
            </Pressable>

            {fontLoaded && (
              <TextInput
                style={styles.input}
                placeholder="Enter your name"
                placeholderTextColor="#fff"
                maxLength={12}
              />
            )}

            <Pressable onPress={() => setShowDatePicker(true)}>
              <Text style={styles.inputdate}>{date.toLocaleDateString()}</Text>
            </Pressable>

            {/* Zodiac symbol */}
            <Image source={currentZodiacSymbol} style={styles.zodiacImage} />

            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}

          </View>
        </ImageBackground>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    flex: 1,
  },
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    position: "relative",
      marginBottom: 0,
  },
  avatar: {
    width: 700,
    height: 700,
    resizeMode: "contain",
    position: "absolute",
    borderRadius: 75,
    marginBottom: 20,
  },
  button: {
    position: "absolute",
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  leftButton: {
    left: -180,
    top: "60%",
    marginTop: 50,
  },
  rightButton: {
    right: -180,
    top: "60%",
    marginTop: 50,
  },
  input: {
    width: "80%",
    height: 50,
    borderWidth: 2,
    borderColor: "#fff",
    borderRadius: 25,
    fontSize: 24,
    fontFamily: "fink-heavy",
    color: "#fff",
    marginTop: 20,
    position: "fixed",
    bottom: -215,
    textAlign: "center",
  },
  inputdate: {
    width: 150,
    height: 50,
    borderWidth: 2,
    borderColor: "#fff",
    borderRadius: 25,
    fontSize: 24,
    fontFamily: "fink-heavy",
    color: "#fff",
    marginTop: 20,
    position: "fixed",
    bottom: -275,
    textAlign: "center",
  },
  zodiacImage: {
    width: 35,
    height: 35,
    resizeMode: "contain",
    left: "1.5%", 
    marginTop: -30, 
    top: "-21%", 
    alignSelf: "center",
    marginLeft: 210,
  },
});
