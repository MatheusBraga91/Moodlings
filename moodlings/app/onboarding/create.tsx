import React, { useEffect, useState } from "react";
import 'react-native-gesture-handler';
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
    TouchableOpacity,
    ImageProps,
} from "react-native";
import * as Font from "expo-font";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../../redux/userSlice";
import { getZodiacSign } from "../zodiac";
import styles from "./styles";
import { useRouter } from "expo-router";
import avatarMap, { AvatarType, Mood } from "../MainScreen/avatarMap";

// Avatars and Zodiac symbols setup
const initialAvatarType: AvatarType = "bunny"; // Default avatar type
const initialMood: Mood = "Default"; // Default mood
type ZodiacSymbols = Record<string, ImageProps>

export const zodiacSymbols: ZodiacSymbols = {
    default: require("../../assets/zodiac/default.png"),
    aries: require("../../assets/zodiac/aries.png"),
    taurus: require("../../assets/zodiac/taurus.png"),
    gemini: require("../../assets/zodiac/gemini.png"),
    cancer: require("../../assets/zodiac/cancer.png"),
    leo: require("../../assets/zodiac/leo.png"),
    virgo: require("../../assets/zodiac/virgo.png"),
    libra: require("../../assets/zodiac/libra.png"),
    scorpio: require("../../assets/zodiac/scorpio.png"),
    sagittarius: require("../../assets/zodiac/sagittarius.png"),
    capricorn: require("../../assets/zodiac/capricorn.png"),
    aquarius: require("../../assets/zodiac/aquarius.png"),
    pisces: require("../../assets/zodiac/pisces.png"),
};

export default function Index() {
    const [currentAvatarType, setCurrentAvatarType] = useState<AvatarType>(initialAvatarType);
    const [fontLoaded, setFontLoaded] = useState(false);
    const [date, setDate] = useState<Date>(new Date());
    const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
    const [currentZodiacSymbol, setCurrentZodiacSymbol] = useState('default');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isConfirmationModalVisible, setIsConfirmationModalVisible] = useState(false);
    const [isWarningModalVisible, setIsWarningModalVisible] = useState(false);
    const [name, setName] = useState("");

    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        const loadFont = async () => {
            await Font.loadAsync({
                "fink-heavy": require("../../assets/fonts/FinkHeavy.ttf"),
            });
            setFontLoaded(true);
        };
        loadFont();
    }, []);

    const changeAvatarRight = () => {
        const avatarTypes: AvatarType[] = ["bunny", "fox", "raccoon", "elephant", "monkey", "opossum"];
        const currentIndex = avatarTypes.indexOf(currentAvatarType);
        const nextIndex = (currentIndex + 1) % avatarTypes.length;
        setCurrentAvatarType(avatarTypes[nextIndex]);
    };

    const changeAvatarLeft = () => {
        const avatarTypes: AvatarType[] = ["bunny", "fox", "raccoon", "elephant", "monkey", "opossum"];
        const currentIndex = avatarTypes.indexOf(currentAvatarType);
        const nextIndex = (currentIndex - 1 + avatarTypes.length) % avatarTypes.length;
        setCurrentAvatarType(avatarTypes[nextIndex]);
    };

    const [isDateSelected, setIsDateSelected] = useState(false);

    const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        if (selectedDate) {
            setDate(selectedDate);
            setIsDateSelected(true);
            const zodiacSign = getZodiacSign(selectedDate);
            setCurrentZodiacSymbol(zodiacSign);
        }
        setShowDatePicker(false);
    };

    const handleCreateUser = () => {
        if (!name || !isDateSelected) {
            setIsWarningModalVisible(true); // Show warning modal if name or date is missing
            return;
        }
        setIsConfirmationModalVisible(true); // Show confirmation modal
    };

    const confirmCreateUser = () => {
        dispatch(
            setUserInfo({
                name: name,
                avatar: currentAvatarType,
                dateOfBirth: date.toLocaleDateString(),
                zodiacSymbol: currentZodiacSymbol,
            })
        );
        setIsConfirmationModalVisible(false);
        router.push("../../MainScreen/mainScreen");
    };

    return (
        <SafeAreaView style={styles.mainContainer}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={0}
            >
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <ImageBackground
                        source={require("../../assets/backgrounds/user_creation_background.png")}
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
                                <Image
                                    source={avatarMap[currentAvatarType][initialMood]}
                                    style={styles.avatarImage}
                                />
                            </View>
                            <View style={styles.zodiacContainer} >
                                <Image source={zodiacSymbols[currentZodiacSymbol]} style={[styles.zodiacImage]} />
                            </View>
                            <View style={styles.arrowLeft}>
                                <Pressable onPress={changeAvatarLeft} style={styles.arrowButtonLeft}>
                                    <Image
                                        source={require("../../assets/buttons/arrow-left.png")}
                                        style={styles.arrowImage}
                                    />
                                </Pressable>
                            </View>
                            <View style={styles.arrowRight}>
                                <Pressable onPress={changeAvatarRight} style={styles.arrowButtonRight}>
                                    <Image
                                        source={require("../../assets/buttons/arrow-right.png")}
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
                                    <Text style={styles.dateText}>
                                        {isDateSelected ? date.toLocaleDateString() : "Select date"}
                                    </Text>
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

                {/* Modal for entering name */}
                <Modal visible={isModalVisible} transparent animationType="slide">
                    <TouchableWithoutFeedback onPress={() => setIsModalVisible(false)}>
                        <View style={styles.modalOverlay}>
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
                                <TouchableOpacity onPress={() => setIsModalVisible(false)} style={styles.closeButton}>
                                    <Text style={styles.closeText}>Return</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>

                {/* Modal for missing name or date */}
                <Modal visible={isWarningModalVisible} transparent animationType="slide">
                    <TouchableWithoutFeedback onPress={() => setIsWarningModalVisible(false)}>
                        <View style={styles.modalOverlay}>
                            <View style={styles.modalContainer}>
                                <Text style={styles.modalInput}>Please enter a name and select a date of birth.</Text>
                                <TouchableOpacity onPress={() => setIsWarningModalVisible(false)} style={styles.closeButton}>
                                    <Text style={styles.closeText}>OK</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>

                {/* Modal for confirmation */}
                <Modal visible={isConfirmationModalVisible} transparent animationType="slide">
                    <TouchableWithoutFeedback onPress={() => setIsConfirmationModalVisible(false)}>
                        <View style={styles.modalOverlay}>
                            <View style={styles.modalContainer}>
                                <Text style={styles.modalInput}>Create your profile?</Text>
                                <View style={styles.buttonRow}>
                                    <TouchableOpacity onPress={confirmCreateUser} style={styles.closeButtonYes}>
                                        <Text style={styles.closeTextYes}>Yes</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => setIsConfirmationModalVisible(false)} style={styles.closeButtonNo}>
                                        <Text style={styles.closeTextNo}>No</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}