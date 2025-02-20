import React from 'react';
import { Image, StyleSheet, Dimensions } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle } from 'react-native-reanimated';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Define the base size as a percentage of the screen width
const HAND_STAMP_WIDTH = screenWidth * 0.2; // 20% of screen width
const HAND_STAMP_HEIGHT = (HAND_STAMP_WIDTH * 345) / 320; // Maintain aspect ratio (320x345)

const HandStamp = () => {
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const offsetX = useSharedValue(0);
    const offsetY = useSharedValue(0);

    const panGesture = Gesture.Pan()
        .onBegin(() => {
            // Set the starting point for a smooth transition
            translateX.value = offsetX.value;
            translateY.value = offsetY.value;
        })
        .onUpdate((event) => {
            translateX.value = offsetX.value + event.translationX;
            translateY.value = offsetY.value + event.translationY;
        })
        .onEnd(() => {
            // Save the final position so it doesn’t reset
            offsetX.value = translateX.value;
            offsetY.value = translateY.value;
        });

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { translateX: translateX.value },
            { translateY: translateY.value },
        ],
    }));

    return (
        <GestureDetector gesture={panGesture}>
            <Animated.View style={[styles.handStamp, animatedStyle]}>
                <Image
                    source={require('../../assets/stamps/stamp.png')}
                    style={[styles.handStampImage, { width: HAND_STAMP_WIDTH, height: HAND_STAMP_HEIGHT }]}
                />
            </Animated.View>
        </GestureDetector>
    );
};

const styles = StyleSheet.create({
    handStamp: {
        position: 'absolute',
        zIndex: 999, // Ensure it's above other elements
    },
    handStampImage: {
        resizeMode: 'contain',
    },
});

export default HandStamp;