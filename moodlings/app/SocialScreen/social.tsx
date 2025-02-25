import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, Modal, TextInput, ImageBackground } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import avatarMap, { AvatarType, Mood } from '../MainScreen/avatarMap'; // Import the types
import { THEMES } from '../cardThemes/themes';
import { DETAILS } from '../EditScreen/details';
import { zodiacSymbols } from '../onboarding/create';
import styles from './styles';
import editStyles from '../EditScreen/editStyles'; // Import editStyles
import { supabase } from '../lib/supabaseClient';

interface Friend {
    id: string;
    name: string;
    avatar: AvatarType; // Use AvatarType here
    mood: Mood; // Use Mood here
    theme: keyof typeof THEMES;
    detail: string;
    zodiac_symbol: string;
}

const SocialScreen = () => {
    const [friends, setFriends] = useState<Friend[]>([]); // Array to store friend objects
    const [isModalVisible, setIsModalVisible] = useState(false); // Modal for adding a friend
    const [isFriendModalVisible, setFriendModalVisible] = useState(false); // Modal for displaying friend info
    const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null); // Selected friend data
    const [friendEmail, setFriendEmail] = useState(''); // Input field for friend's email
    const [error, setError] = useState(''); // Error message

    // Access user info from Redux
    const userInfo = useSelector((state: RootState) => state.user);

    // Function to get the avatar image based on user info
    const getAvatarImage = (avatar: AvatarType, mood: Mood) => {
        if (avatarMap[avatar] && avatarMap[avatar][mood]) {
            return avatarMap[avatar][mood];
        }
        return null;
    };

    // Function to get the detail image
    const getDetailImage = (detail: string) => {
        if (detail) {
            const detailImage = Object.values(DETAILS)
                .flatMap(category => Object.entries(category))
                .find(([key]) => key === detail)?.[1];
            return detailImage || null;
        }
        return null;
    };

    const handleAddFriend = async () => {
        if (!friendEmail) {
            setError('Please enter a valid email address.');
            return;
        }

        try {
            // Query the MoodUsers table to find the user by email
            const { data: moodData, error: moodError } = await supabase
                .from('MoodUsers') // Query the MoodUsers table
                .select('id, name, avatar, mood , theme , detail, zodiac_symbol') // Select the required fields
                .eq('email', friendEmail) // Match the email
                .single(); // Ensure we get a single result

            if (moodError || !moodData) {
                setError('User not found. Please check the email and try again.');
                return;
            }

            // Add the friend to the list
            const friend = {
                id: moodData.id,
                name: moodData.name,
                avatar: moodData.avatar,
                mood: moodData.mood,
                theme: moodData.theme,
                detail: moodData.detail,
                zodiac_symbol: moodData.zodiac_symbol,
            };
            setFriends([...friends, friend]);

            // Close the modal and clear the input field
            setIsModalVisible(false);
            setFriendEmail('');
            setError('');
        } catch (err) {
            console.error('Error adding friend:', err);
            setError('An unexpected error occurred. Please try again.');
        }
    };

    // Handle friend container click
    const handleFriendClick = (friend: Friend) => {
        setSelectedFriend(friend); // Set the selected friend
        setFriendModalVisible(true); // Open the friend modal
    };

    // Close the friend modal
    const closeFriendModal = () => {
        setFriendModalVisible(false);
        setSelectedFriend(null);
    };

    return (
        <View style={styles.mainContainer}>
            {/* Top Container */}
            <View style={styles.topContainer}>
                <Text style={styles.title}>FRIENDS</Text>
                <View style={styles.addFriendContainer}>
                    <TouchableOpacity style={styles.addButton} onPress={() => setIsModalVisible(true)}>
                        <Text style={styles.addButtonText}>+</Text>
                    </TouchableOpacity>
                    <Text style={styles.addFriendText}>Add a friend</Text>
                </View>
            </View>

            {/* Main Container (Scrollable) */}
            <View style={styles.mainContainerMiddle}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    {friends.length === 0 ? (
                        <Text style={styles.emptyMessage}>Your friend list is empty.</Text>
                    ) : (
                        friends.map((friend, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.friendContainer}
                                onPress={() => handleFriendClick(friend)}
                            >
                                {/* Circular Avatar Container */}
                                <View style={styles.avatarContainer}>
                                    {friend.avatar && (
                                        <Image
                                            source={getAvatarImage(friend.avatar, friend.mood) as any}
                                            style={styles.avatarImage}
                                        />
                                    )}
                                </View>
                                {/* Rectangular Name Container */}
                                <View style={styles.nameContainer}>
                                    <Text style={styles.friendName}>{friend.name}</Text>
                                </View>
                            </TouchableOpacity>
                        ))
                    )}
                </ScrollView>
            </View>

            {/* Modal for Adding a Friend */}
            <Modal
                visible={isModalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setIsModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Search for friend email!</Text>
                        <TextInput
                            style={styles.inputName}
                            placeholder="Enter friend's email"
                            placeholderTextColor="#999"
                            value={friendEmail}
                            onChangeText={setFriendEmail}
                            autoCapitalize="none"
                            keyboardType="email-address"
                        />
                        {error && <Text style={styles.errorText}>{error}</Text>}
                        <TouchableOpacity style={styles.modalButton} onPress={handleAddFriend}>
                            <Text style={styles.modalButtonText}>Add Friend</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Modal for Displaying Friend Info */}
            <Modal
                visible={isFriendModalVisible}
                animationType="slide"
                transparent={false}
                onRequestClose={closeFriendModal}
            >
                <View style={styles.mainContainer}>
                    {/* Middle Container for Friend Card */}
                    {selectedFriend && (
                        <ImageBackground
                            source={THEMES[selectedFriend.theme].cardImage}
                            style={editStyles.middleContainer}
                            imageStyle={editStyles.cardBackgroundImage}
                        >
                            {/* Name */}
                            <Text style={[editStyles.testText, { color: THEMES[selectedFriend.theme].avatarContainerColor }]}>
                                {selectedFriend.name}
                            </Text>

                            {/* Zodiac */}
                            <View style={[editStyles.zodiacContainer, { backgroundColor: THEMES[selectedFriend.theme].avatarContainerColor }]}>
                                <Image
                                    source={zodiacSymbols[selectedFriend.zodiac_symbol] || zodiacSymbols.default}
                                    style={[editStyles.zodiacImage, { tintColor: THEMES[selectedFriend.theme].zodiacImage }]}
                                />
                            </View>

                            {/* Avatar */}
                            <View style={[editStyles.avatarContainer, { backgroundColor: THEMES[selectedFriend.theme].avatarContainerColor }]}>
                                <Image
                                    source={getAvatarImage(selectedFriend.avatar, selectedFriend.mood) as any}
                                    style={editStyles.avatarImage}
                                />
                            </View>

                            {/* Mood */}
                            <View style={[editStyles.moodContainer, { backgroundColor: THEMES[selectedFriend.theme].moodContainerColor }]}>
                                <Text style={[editStyles.moodText, { color: THEMES[selectedFriend.theme].textColor }]}>
                                    {selectedFriend.mood}
                                </Text>
                            </View>

                            {/* Detail Overlay */}
                            {selectedFriend.detail && (
                                <Image
                                    source={getDetailImage(selectedFriend.detail) as any}
                                    style={editStyles.detailOverlay}
                                />
                            )}
                        </ImageBackground>
                    )}

                    {/* Close Button */}
                    <TouchableOpacity style={styles.closeButton} onPress={closeFriendModal}>
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
};

export default SocialScreen;
