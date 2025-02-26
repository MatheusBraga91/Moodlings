import { StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'cover', // Ensures the image covers the entire screen
        justifyContent: 'center',
    },
    title: {
        fontFamily: "fink-heavy",
        color: "#bd8d56",
        fontSize: moderateScale(60),
        textAlign: 'center', // Center the text
        marginTop: 0, // Add some space at the top
        textShadowColor: 'rgba(0, 0, 0, 0.75)', // Add a shadow for better readability
        textShadowOffset: { width: 2, height: 2 }, // Shadow offset
        textShadowRadius: 5, // Shadow radius
    },
    inputContainer: {
        width: '80%',
        backgroundColor: 'transparent', // Fully transparent background
        padding: 20,
        borderRadius: 10,
    },
    inputWrapper: {
        marginBottom: 15, // Spacing between input fields
        shadowColor: '#000', // Shadow color
        shadowOffset: { width: 4, height: 4 }, // Diagonal shadow pointing bottom-right
        shadowOpacity: 0.5, // Shadow opacity
        shadowRadius: 5, // Shadow blur radius
        elevation: 5, // Elevation for Android shadow
    },
    input: {
        height: 70, // Increased height for larger input fields
        borderColor: 'rgba(0, 0, 0, 0.1)', // Light border color
        borderWidth: 1,
        paddingHorizontal: 15, // Increased padding for better text alignment
        backgroundColor: '#fef3e1', // Custom background color
        borderRadius: 10, // Rounded edges
        fontSize: 16, // Larger font size
        color: 'black', // Black text color
    },
    buttonContainer: {
        flexDirection: 'row', // Arrange buttons side by side
        justifyContent: 'space-between',
        marginTop: 10,
        width: '100%',
    },
    button: {
        flex: 1, // Make buttons take equal space
        paddingVertical: 12,
        borderRadius: 25, // Rounded button
        alignItems: 'center',
        marginHorizontal: 5, // Space between buttons
    },
    loginButton: {
        backgroundColor: '#fcbba6', // Red
    },
    signUpButton: {
        backgroundColor: '#be7566', // Purple
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
});