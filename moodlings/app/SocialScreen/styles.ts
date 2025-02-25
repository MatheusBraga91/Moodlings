import { StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

const styles = StyleSheet.create({
    // Main container for the screen
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff', // White background
    },
    // Top container (Fixed Position)
    topContainer: {
        position: 'absolute', // Fixed at the top
        top: 0,
        left: 0,
        right: 0,
        height: '30%', // 30% of the screen height
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#f0f0f0', // Light gray background
        zIndex: 1, // Ensure it stays on top
    },
    // Title for the top container
    title: {
        fontFamily: "fink-heavy",
        fontSize: moderateScale(62),
        color: "#bd8d56",
        textAlign: "center",
        top: "-10%",
    },
    // Container for the "+" button and "Add a friend" text
    addFriendContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    // "+" button
    addButton: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#007BFF', // Blue background
        borderRadius: 5,
        marginRight: 10,
    },
    // Text inside the "+" button
    addButtonText: {
        fontSize: 24,
        color: '#fff', // White text
    },
    // "Add a friend" text
    addFriendText: {
        fontSize: 18,
        color: '#333', // Dark gray text
    },
    // Main container (Fixed Height and Scrollable)
    mainContainerMiddle: {
        position: 'absolute',
        top: '30%', // Start below the top container
        left: 0,
        right: 0,
        bottom: 0, // Take up the remaining space
        backgroundColor: '#fff', // White background
    },
    // Scroll container inside the main container
    scrollContainer: {
        flexGrow: 1,
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
    // Empty friend list message
    emptyMessage: {
        fontSize: 20,
        color: '#999', // Light gray text
        textAlign: 'center',
        marginTop: 20,
    },
    // Container for each friend (Positioned from the right)
    friendContainer: {
        width: '70%', // 80% of the screen width
        height: 80, // 10% of the main container height
        backgroundColor: '#f9f9f9', // Light background for the rectangular container
        borderRadius: 10,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
        alignSelf: 'flex-end', // Position from the right
    },
    // Circular avatar container
    avatarContainer: {
        width: 80,
        height: 80,
        borderRadius: 40, // Makes it circular
        backgroundColor: '#ddd', // Placeholder color
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: -35, // Half outside the rectangular container
        zIndex: 1,
    },
    // Avatar image
    avatarImage: {
        width: 70,
        height: 70,
        borderRadius: 0,
    },
    // Name container (rectangular)
    nameContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 35, // To avoid overlap with the circular avatar
    },
    // Friend name text
    friendName: {
        fontSize: 18,
        color: '#333', // Dark gray text
    },
});

export default styles;
