import { StyleSheet, Dimensions } from "react-native";
import { scale, moderateScale } from 'react-native-size-matters';

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1, // Ensures the whole screen is taken up
  },
  topContainer: {
    flex: 0.28, // 28% of the screen height
    backgroundColor: 'blue', // Blue background for top container
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
    backgroundColor: 'pink', // Pink background for bottom container
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: "fink-heavy",
    fontSize: 18,
    color: 'white',
  },

  // Styles for displaying user info
  testText: {
    fontFamily: "fink-heavy",
    fontSize: 16,
    color: "#fff", // Or any color that contrasts with the background
    textAlign: "center",
    marginVertical: 5,
  },
  avatarImage: {
    top: "-7%",
    width: moderateScale(200), 
    height: moderateScale(200),
    resizeMode: "contain",
  },
  avatarContainer: {
    top: "-10%",
    width: moderateScale(200),
    height: moderateScale(180),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: (width * 0.6) / 2, 
    backgroundColor: "#e7e9c2",
  },

  moodContainer: {
    top: "-14%",
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
    color: "#fff", // Or any color that contrasts with the background
    textAlign: "center",
    marginVertical: 5,
  },
  zodiacContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  zodiacImage: {
    width: 20, // Adjust based on your design
    height: 20, // Adjust based on your design
    marginVertical: 10,
  },
  footerText: {
    fontSize: 14,
    color: "#fff", // Or any color that fits your design
    textAlign: "center",
  },
});

export default styles;
