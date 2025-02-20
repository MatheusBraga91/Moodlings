import { StyleSheet, Dimensions } from "react-native";
import { scale, moderateScale } from 'react-native-size-matters';

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1, // Ensures the whole screen is taken up
  },
  topContainer: {
    flex: 0.25,
    backgroundColor: '#80aaff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleContainer: {
    flex: 0.60, // 54% of the screen height
    justifyContent: "center",
    alignItems: "center",
  },

  bottomContainer: {
    flexDirection: "row",
    flex: 0.15, // 28% of the screen height
    backgroundColor: '#80aaff',
    justifyContent: 'center',

  },
  cardBackgroundImage: {
    resizeMode: 'cover',
  },

  text: {
    top: "-10%",
    fontFamily: "fink-heavy",
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

  addMoodButton: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addMoodText: {
    fontFamily: "fink-heavy",
    color: '#ffffff',
    fontSize: 16,
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



  calendarButton: {
    width: moderateScale(75),
    height: moderateScale(65),
    marginTop: 20,
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
    marginTop: 20,
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
    marginTop: 20,
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
    marginTop: 20,
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
    width: '105%',
    top: -360, // Align to the top of the card
    left: -7, // Align to the left of the card
    right: 0, // Align to the right of the card
    bottom: 0, // Align to the bottom of the card
    resizeMode: 'contain', // Ensure the image fits within the card without distortion
  }

});


export default styles;
