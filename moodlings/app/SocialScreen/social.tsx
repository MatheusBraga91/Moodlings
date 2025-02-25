import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import avatarMap from '../MainScreen/avatarMap';
import styles from './styles';

const SocialScreen = () => {
    const [friends, setFriends] = useState<string[]>([]); // Array to store friend names

    // Access user info from Redux
    const userInfo = useSelector((state: RootState) => state.user);

    // Function to get the avatar image based on user info
    const getAvatarImage = () => {
        const userAvatar = userInfo.avatar;
        const userMood = userInfo.mood;

        if (avatarMap[userAvatar] && avatarMap[userAvatar][userMood]) {
            return avatarMap[userAvatar][userMood];
        }
        return null;
    };

    const avatarImage = getAvatarImage(); // Get the avatar image

    const handleAddFriend = () => {
        // Generate a placeholder name for the new friend
        const newFriend = `Friend ${friends.length + 1}`;
        setFriends([...friends, newFriend]);
    };

    return (
        <View style={styles.mainContainer}>
            {/* Top Container (Fixed Position) */}
            <View style={styles.topContainer}>
                <Text style={styles.title}>FRIENDS</Text>
                <View style={styles.addFriendContainer}>
                    <TouchableOpacity style={styles.addButton} onPress={handleAddFriend}>
                        <Text style={styles.addButtonText}>+</Text>
                    </TouchableOpacity>
                    <Text style={styles.addFriendText}>Add a friend</Text>
                </View>
            </View>

            {/* Main Container (Scrollable within Fixed Height) */}
            <View style={styles.mainContainerMiddle}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    {friends.length === 0 ? (
                        <Text style={styles.emptyMessage}>Your friend list is empty.</Text>
                    ) : (
                        friends.map((friend, index) => (
                            <View key={index} style={styles.friendContainer}>
                                {/* Circular Avatar Container */}
                                <View style={styles.avatarContainer}>
                                    {avatarImage && (
                                        <Image
                                            source={avatarImage as any} // Use the avatar image from Redux
                                            style={styles.avatarImage}
                                        />
                                    )}
                                </View>
                                {/* Rectangular Name Container */}
                                <View style={styles.nameContainer}>
                                    <Text style={styles.friendName}>{friend}</Text>
                                </View>
                            </View>
                        ))
                    )}
                </ScrollView>
            </View>
        </View>
    );
};

export default SocialScreen;
