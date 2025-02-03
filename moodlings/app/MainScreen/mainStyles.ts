import { StyleSheet, Dimensions } from "react-native";
import { scale, moderateScale } from 'react-native-size-matters';

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1, // Ensures the whole screen is taken up
  },
  topContainer: {
    flex: 0.28, // 28% of the screen height
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleContainer: {
    flex: 0.54, // 54% of the screen height
    justifyContent: "center",
    alignItems: "center",
  },
  cardBackgroundImage: {
    resizeMode: 'cover', // Ensures the image fills the container
  },
  bottomContainer: {
    flex: 0.28, // 28% of the screen height
    backgroundColor: 'pink',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: "fink-heavy",
    fontSize: moderateScale(30),
    color: 'white',
  },

  // Styles for displaying user info
  testText: {
    top: "7%",
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
    borderWidth: 0.1, // Border thickness of 1px
    borderColor: "black", // Black border color
  },
  zodiacImage: {
    width: moderateScale(35),
    height: moderateScale(35),
    resizeMode: "contain",
  },
  footerText: {
    fontSize: 14,
    color: "#fff",
    textAlign: "center",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'black',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
  },
  modalTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  moodOption: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
    alignItems: 'center',
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f44336',
    borderRadius: 5,
  },
  closeText: {
    fontFamily: "fink-heavy",
    color: 'white',
    fontSize: 14,
  },

  calendarButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f44336',
    borderRadius: 5,
  },

  calendarButtonText: {
    fontFamily: "fink-heavy",
    color: 'white',
    fontSize: 14,
  },


  addMoodButton: {
    backgroundColor: '#007bff', // Button background
    padding: 12, // Padding for the button
    borderRadius: 8,
    alignItems: 'center', // Center the text inside the button
    justifyContent: 'center',
  },
  addMoodText: {
    fontFamily: "fink-heavy",
    color: '#ffffff', // Text color
    fontSize: 16, // Text size
    fontWeight: 'bold',
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
});


export default styles;
