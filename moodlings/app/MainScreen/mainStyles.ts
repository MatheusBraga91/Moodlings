import { StyleSheet, Dimensions } from "react-native";
import { scale, moderateScale } from 'react-native-size-matters';

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1, // Ensures the whole screen is taken up
  },
  topContainer: {
    flex: 0.25,
    justifyContent: 'center',
    alignItems: 'center',
  },

  middleContainer: {
    flex: 0.54, // 54% of the screen height
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden', // Clip any overflow
  },
  cardBackgroundImage: {
    flex: 1, // Fill the container
    resizeMode: 'stretch', // Stretch the image to fill the container
    width: '100%', // Ensure the image takes up the full width
    height: '100%', // Ensure the image takes up the full height
  },
  bottomContainer: {
    flexDirection: "row",
    flex: 0.21,
    justifyContent: 'center',

  },

  text: {
    top: "-10%",
    fontFamily: "fink-heavy",
    textAlign: "center",
    fontSize: moderateScale(30),
    color: 'white',
  },

  testText: {
    top: "2%",
    fontFamily: "fink-heavy",
    fontSize: moderateScale(30),
    color: "#fff",
    textAlign: "center",
    marginVertical: 5,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  avatarImage: {
    top: "-7%",
    width: moderateScale(200),
    height: moderateScale(200),
    resizeMode: "contain",
  },
  avatarContainer: {
    top: "5%",
    width: moderateScale(200),
    height: moderateScale(180),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: (width * 0.6) / 2,
    backgroundColor: "#e7e9c2",
  },

  moodContainer: {
    top: "0%",
    width: moderateScale(170
    ),
    height: moderateScale(50),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },

  moodText: {
    fontFamily: "fink-heavy",
    fontSize: moderateScale(30),
    color: "#fff",
    textAlign: "center",
    marginVertical: 5,
  },

  zodiacContainer: {
    position: "absolute",
    top: "24%",
    left: "75%",
    width: moderateScale(53),
    height: moderateScale(51),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: (width * 0.6) / 2,
    borderWidth: 0.1,
    borderColor: "black",
  },
  zodiacImage: {
    width: moderateScale(35),
    height: moderateScale(35),
    resizeMode: "contain",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    position: 'absolute',
    top: 0, // Position at the top of the screen
    width: '100%', // Take up full width
    borderBottomLeftRadius: 20, // Rounded corners at the bottom
    borderBottomRightRadius: 20,
    padding: 20,
    elevation: 5, // Add shadow for depth
  },
  modalTitle: {
    fontFamily: "fink-heavy",
    color: 'white', // Change text color to black
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center', // Center the title
  },
  moodOption: {
    width: moderateScale(80),
    height: moderateScale(50),
    padding: 10,
    marginHorizontal: 10, // Add horizontal spacing between mood options
    borderRadius: 10, // Rounded corners for mood options
  },
  moodTextModal: {
    fontFamily: "fink-heavy",
    fontSize: moderateScale(15),
    color: "black",
    textAlign: "center",
    marginVertical: 5,
  },
  disabledButton: {
    backgroundColor: '#A5D6A7', // Light green when disabled
  },
  setMoodText: {
    color: 'white',
    fontSize: 16,
    fontFamily: "fink-heavy",
  },
  setMoodButton: {
    backgroundColor: '#4CAF50', // Green color for the Set Mood button
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1, // Take up equal space
    marginRight: 10, // Add spacing between buttons
  },
  closeButton: {
    padding: 10,
    backgroundColor: '#f44336',
    borderRadius: 5,
    alignItems: 'center',
    flex: 1, // Take up equal space
  },
  closeText: {
    fontFamily: "fink-heavy",
    color: 'white',
    fontSize: 14,
  },

  addMoodButton: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 3,
  },
  addMoodText: {
    padding: 1,
    fontFamily: "fink-heavy",
    fontSize: moderateScale(20),
    color: '#ffffff',
  },

  horoscopeText: {
    fontFamily: "fink-heavy",
    color: 'white',
    fontSize: 14,
  },

  zodiacTitle: {
    fontFamily: "fink-heavy",
    color: 'white',
    fontSize: 14,
  },

  calendarButton: {
    width: moderateScale(75),
    height: moderateScale(65),
    marginTop: 50,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',

  },
  calendarIcon: {
    width: moderateScale(53),
    height: moderateScale(51),
    resizeMode: 'contain',
  },

  editButton: {
    width: moderateScale(60),
    height: moderateScale(65),
    marginTop: 50,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  editIcon: {
    left: '-15%',
    width: moderateScale(53),
    height: moderateScale(51),
    resizeMode: 'contain',
  },
  socialButton: {
    width: moderateScale(100),
    height: moderateScale(65),
    marginTop: 50,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  socialIcon: {
    top: '-35%',
    width: moderateScale(100),
    height: moderateScale(80),
    resizeMode: 'contain',
  },

  giftsButton: {
    width: moderateScale(75),
    height: moderateScale(65),
    marginTop: 50,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  giftsIcon: {
    top: '5%',
    width: moderateScale(53),
    height: moderateScale(51),
    resizeMode: 'contain',
  },
  detailOverlay: {
    position: 'absolute', // Position the detail overlay on top of the card
    width: '100%', // Match the width of the container
    height: '100%', // Match the height of the container
    justifyContent: 'center', // Center horizontally
    alignItems: 'center', // Center vertically
    resizeMode: 'contain', // Ensure the image fits within the card without distortion
  },

  modalButtonContainer: {
    flexDirection: 'row', // Place buttons side by side
    justifyContent: 'space-between', // Add space between buttons
    marginTop: 20,
  },



});


export default styles;
