import { StyleSheet, Dimensions } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    // Existing styles...
    mainContainer: {
        flex: 1,
    },
    topContainer: {
        flex: 0.10,
        backgroundColor: '#80aaff',
    },
    middleContainer: {
        flex: 0.6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomContainer: {
        flexDirection: 'row',
        flex: 0.30,
        backgroundColor: '#80aaff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardBackgroundImage: {
        resizeMode: 'cover',
    },
    testText: {
        top: "2%",
        fontFamily: 'fink-heavy',
        fontSize: moderateScale(30),
        color: '#fff',
        textAlign: 'center',
        marginVertical: 5,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 1,
    },
    avatarImage: {
        top: '-7%',
        width: moderateScale(200),
        height: moderateScale(200),
        resizeMode: 'contain',
    },
    avatarContainer: {
        top: '5%',
        width: moderateScale(200),
        height: moderateScale(180),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: (width * 0.6) / 2,
        backgroundColor: '#e7e9c2',
    },
    moodContainer: {
        top: '0%',
        width: moderateScale(170),
        height: moderateScale(50),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
    },
    moodText: {
        fontFamily: 'fink-heavy',
        fontSize: moderateScale(30),
        color: '#fff',
        textAlign: 'center',
        marginVertical: 5,
    },
    zodiacContainer: {
        position: 'absolute',
        top: '24%',
        left: '75%',
        width: moderateScale(53),
        height: moderateScale(51),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: (width * 0.6) / 2,
        borderWidth: 0.1,
        borderColor: 'black',
    },
    zodiacImage: {
        width: moderateScale(35),
        height: moderateScale(35),
        resizeMode: 'contain',
    },

    // Theme Button styles
    themeButton: {
        backgroundColor: '#007bff',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    themeButtonText: {
        fontFamily: 'fink-heavy',
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },

    // Modal styles
    modalContainer: {
        position: 'absolute',
        bottom: 0,
        flex: 0.28,
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        alignItems: 'center',
        elevation: 5, // Shadow for Android
        shadowColor: '#000', // Shadow for iOS
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    themeOption: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginHorizontal: 10,
        overflow: 'hidden',
    },
    themeImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },

    // Close Button styles
    closeButton: {
        marginTop: 5,
        padding: 10,
        backgroundColor: '#007bff',
        borderRadius: 5,
    },
    closeButtonText: {
        fontFamily: 'fink-heavy',
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },

    // Add these styles
    categoryOption: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
    },
    categoryText: {
        fontFamily: 'fink-heavy',
        fontSize: 16,
        color: '#000',
    },
    stampOption: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    stampImage: {
        width: 80,
        height: 80,
        resizeMode: 'contain',
    },
    stampButton: {
        backgroundColor: '#007bff',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    stampButtonText: {
        fontFamily: 'fink-heavy',
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },

    // Add these styles
    colorContainer: {
        width: '100%',
        marginLeft: 10,
    },
    colorOption: {
        width: 40,
        height: 40,
        marginLeft: 10,
        borderRadius: 20,
        marginVertical: 5,
    },

    detailOption: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },
    detailImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    detailOverlay: {
        position: 'absolute', // Position the detail overlay on top of the card
        width: '105%',
        top: -360, // Align to the top of the card
        left: -7, // Align to the left of the card
        right: 0, // Align to the right of the card
        bottom: 0, // Align to the bottom of the card
        resizeMode: 'contain', // Ensure the image fits within the card without distortion
    }

});

export default styles;