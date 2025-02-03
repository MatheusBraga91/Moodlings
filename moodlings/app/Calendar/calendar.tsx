import React, { useEffect, useState, useMemo } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    Modal,
    Animated,
    Easing,
    ScrollView,
    TextInput,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import styles from "./stylecalendar";
import avatarMap, { AvatarType, Mood } from "./avatarMapStick";
import {
    resetAddMoodTrigger,
    setDayImages,
    updateImageMessage,
} from "../../redux/userSlice";

const Calendar: React.FC = () => {
    const dispatch = useDispatch();

    // Redux selectors
    const userInfo = useSelector((state: RootState) => state.user);
    const addMoodTriggered = useSelector(
        (state: RootState) => state.user.addMoodTriggered
    );
    const dayImages = useSelector((state: RootState) => state.user.dayImages);
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const currentDay = today.getDate();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    const daysOfWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];

    const calendarDays = useMemo(() => {
        const days = Array(firstDayOfMonth).fill(null);
        for (let day = 1; day <= daysInMonth; day++) {
            days.push(day);
        }
        while (days.length < 42) {
            days.push(null);
        }
        return days;
    }, [firstDayOfMonth, daysInMonth]);

    // Helper to get the avatar image
    const getAvatarImage = (): any | null => {
        const userAvatar = userInfo.avatar as AvatarType;
        const userMood = userInfo.mood as Mood;

        if (avatarMap[userAvatar] && avatarMap[userAvatar][userMood]) {
            return avatarMap[userAvatar][userMood];
        }
        return null;
    };

    // Modal state
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedDay, setSelectedDay] = useState<number | null>(null);
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
        null
    );
    const [messageInput, setMessageInput] = useState<string>("");
    const slideAnim = useMemo(() => new Animated.Value(0), []);

    const openModal = (day: number) => {
        setSelectedDay(day);
        setModalVisible(true);

        // Slide animation
        Animated.timing(slideAnim, {
            toValue: 1,
            duration: 300,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
        }).start();
    };

    const closeModal = () => {
        Animated.timing(slideAnim, {
            toValue: 0,
            duration: 300,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
        }).start(() => {
            setModalVisible(false);
            setSelectedDay(null);
            setSelectedImageIndex(null); // Reset selected image
            setMessageInput(""); // Clear input field
        });
    };

    // Handle image click in the modal
    const handleImageClick = (index: number) => {
        setSelectedImageIndex(index);
        if (selectedDay !== null && dayImages[selectedDay]?.[index]) {
            setMessageInput(dayImages[selectedDay][index].message || "");
        }
    };

    // Save message to Redux
    const handleSaveMessage = () => {
        if (selectedDay !== null && selectedImageIndex !== null) {
            dispatch(
                updateImageMessage({
                    day: selectedDay,
                    imageIndex: selectedImageIndex,
                    message: messageInput,
                })
            );
            setSelectedImageIndex(null); // Close the input field
            setMessageInput(""); // Clear the input
        }
    };

    useEffect(() => {
        if (addMoodTriggered) {
            const moodImage = getAvatarImage();

            if (moodImage) {
                // Create a deep copy of dayImages to ensure immutability
                const updatedDayImages = JSON.parse(JSON.stringify(dayImages));

                // Ensure the current day has an array for images (initialized to empty if it doesn't exist)
                if (!updatedDayImages[currentDay]) {
                    updatedDayImages[currentDay] = [];
                }

                // Add the new image with an empty message and the current time
                updatedDayImages[currentDay].push({
                    image: moodImage,
                    message: "",
                    time: new Date().toLocaleTimeString(), // Add the current time
                });

                // Dispatch the updated images to Redux state
                dispatch(setDayImages(updatedDayImages));
            }

            // Reset the mood trigger after adding the image
            dispatch(resetAddMoodTrigger());
        }
    }, [addMoodTriggered, currentDay, dispatch, dayImages]);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>
                    {today.toLocaleString("default", { month: "long" })} {currentYear}
                </Text>
            </View>

            <View style={styles.daysOfWeek}>
                {daysOfWeek.map((day) => (
                    <Text key={day} style={styles.dayOfWeek}>
                        {day}
                    </Text>
                ))}
            </View>

            <View style={styles.grid}>
                {calendarDays.map((day, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.day,
                            day ? styles.filledDay : styles.emptyDay,
                            day === currentDay && styles.currentDay,
                        ]}
                        onPress={() => day && openModal(day)}
                    >
                        <Text style={styles.dayText}>{day || ""}</Text>

                        {day && (
                            <View style={styles.smallSquaresContainer}>
                                {/* Show only the first 4 images */}
                                {[0, 1, 2, 3].map((i) => (
                                    <View key={i} style={styles.smallSquare}>
                                        {dayImages[day] && dayImages[day][i] ? (
                                            <Image
                                                source={dayImages[day][i].image}
                                                style={styles.smallSquareImage}
                                            />
                                        ) : null}
                                    </View>
                                ))}
                            </View>
                        )}
                    </TouchableOpacity>
                ))}
            </View>

            {/* Modal */}
            {modalVisible && (
                <Modal
                    transparent={true}
                    visible={modalVisible}
                    animationType="none"
                    onRequestClose={closeModal}
                >
                    <Animated.View
                        style={[
                            styles.modalContainer,
                            {
                                transform: [
                                    {
                                        translateY: slideAnim.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [600, 0], // off-screen to center
                                        }),
                                    },
                                ],
                            },
                        ]}
                    >
                        <Text style={styles.modalTitle}>Day {selectedDay}</Text>
                        <ScrollView
                            horizontal={true}
                            contentContainerStyle={styles.modalContentContainer}
                        >
                            {selectedDay &&
                                dayImages[selectedDay]?.map((img, index) => (
                                    <TouchableOpacity key={index} onPress={() => handleImageClick(index)}>
                                        <View
                                            style={[

                                                selectedImageIndex === index && styles.selectedImageContainer,
                                            ]}
                                        >
                                            <Image
                                                source={img.image}
                                                style={[
                                                    styles.modalImage,
                                                    selectedImageIndex === index && styles.selectedImage,
                                                ]}
                                            />
                                        </View>
                                    </TouchableOpacity>
                                ))}
                        </ScrollView>

                        {/* Input Field and Save Button */}
                        <View style={styles.inputContainer}>
                            {selectedImageIndex !== null && selectedDay !== null && (
                                <>
                                    {/* Time Container */}
                                    <View style={styles.timeContainer}>
                                        <Text style={styles.timeText}>
                                            {dayImages[selectedDay]?.[selectedImageIndex]?.time || "Unknown"}
                                        </Text>
                                    </View>

                                    {/* Message Input Field */}
                                    <TextInput
                                        style={styles.inputField}
                                        placeholder="What made you feel this way?"
                                        maxLength={400}
                                        value={messageInput}
                                        onChangeText={(text) => {
                                            // Remove the time prefix before updating the message
                                            const message = text.replace(`${dayImages[selectedDay]?.[selectedImageIndex]?.time || "Unknown"}\n`, "");
                                            setMessageInput(message);
                                        }}
                                        multiline
                                    />

                                    {/* Save Button */}
                                    <TouchableOpacity
                                        style={styles.saveButton}
                                        onPress={handleSaveMessage}
                                    >
                                        <Text style={styles.saveButtonText}>Save</Text>
                                    </TouchableOpacity>
                                </>
                            )}
                        </View>

                        <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>

                    </Animated.View>
                </Modal>
            )}
        </View>
    );
};

export default Calendar;