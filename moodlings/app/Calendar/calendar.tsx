import React, { useEffect, useState, useMemo } from "react";
import { View, Text, TouchableOpacity, Image, Modal, Animated, Easing } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import styles from "./stylecalendar";
import avatarMap, { AvatarType, Mood } from "./avatarMapStick";
import { resetAddMoodTrigger, setDayImages } from "../../redux/userSlice";

const Calendar: React.FC = () => {
    const dispatch = useDispatch();

    // Redux selectors
    const userInfo = useSelector((state: RootState) => state.user);
    const addMoodTriggered = useSelector((state: RootState) => state.user.addMoodTriggered);
    const containerUsage = useSelector((state: RootState) => state.user.containerUsage);
    const dayImages = useSelector((state: RootState) => state.user.dayImages);

    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const currentDay = today.getDate();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

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
        });
    };


    useEffect(() => {
        if (addMoodTriggered) {
            const moodImage = getAvatarImage();

            if (moodImage) {
                const updatedDayImages = { ...dayImages };


                if (!updatedDayImages[currentDay]) {
                    updatedDayImages[currentDay] = [null, null, null, null];
                }

                const nextIndex = updatedDayImages[currentDay].findIndex((img) => img === null);

                // If no empy container replace images in loop
                const indexToUpdate = nextIndex !== -1 ? nextIndex : updatedDayImages[currentDay].findIndex((img, idx) => idx === 0 || img !== null);

                // Update specific container in seqence
                updatedDayImages[currentDay] = updatedDayImages[currentDay].map((img, idx) =>
                    idx === indexToUpdate ? moodImage : img
                );

                // Redux state
                dispatch(setDayImages(updatedDayImages));
            }

            dispatch(resetAddMoodTrigger());
        }
        // Dependencies
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
                                {[0, 1, 2, 3].map((i) => (
                                    <View key={i} style={styles.smallSquare}>
                                        {dayImages[day] && dayImages[day][i] ? (
                                            <Image
                                                source={dayImages[day][i]}
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
                        <Text style={styles.modalTitle}>
                            Day {selectedDay}
                        </Text>
                        <View style={styles.modalContent}>
                            {/* Render the selected day's images */}
                            {selectedDay &&
                                dayImages[selectedDay]?.map((img, index) => (
                                    img && (
                                        <Image
                                            key={index}
                                            source={img}
                                            style={styles.modalImage}
                                        />
                                    )
                                ))}
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
