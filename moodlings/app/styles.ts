import { StyleSheet, Dimensions } from "react-native";
import { scale, moderateScale } from 'react-native-size-matters';

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    position: "relative",
    borderWidth: 1,
    borderColor: "red", // Border for debugging
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },

  topContainer: {
    position: "absolute",
    height: height * 0.3, // Set height to 60% of the screen height
    width: width * 0.99, // Set width to 80% of the screen width
    top: "0%", // Position the top container above the middle container
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "yellow", // Border for debugging
  },
  titleContainer: {
    position: "absolute",
    top: "22%", // This ensures the container starts 20% from the top, adjusting dynamically
    width: moderateScale(300),
    height: moderateScale(120),
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "green", // Border for debugging
  },
  selectAvatarText: {
    fontFamily: "fink-heavy", // Apply the imported font
    fontSize: moderateScale(62), // Use scale for responsive font size
    color: "#bd8d56", // White text color
    textAlign: "center",
  },
  middleContainer: {
      position: "absolute",
      height: height * 0.3, // Set height to 60% of the screen height
    width: width * 0.99, // Set width to 80% of the screen width
    top: "33%", // This ensures the container starts 20% from the top, adjusting dynamically
    left: "0%", // This centers the container with some space from the left side
    right: "0%", // This centers the container with some space from the right side
      justifyContent: "center",
    alignItems: "center",
      borderWidth: 2,
      borderColor: "blue", // Border for debugging
  },
  avatarContainer: {
    width: moderateScale(190), // Scale based on screen width
    height: moderateScale(170),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: (width * 0.6) / 2, // This makes the container a circle
    borderWidth: 1,
    borderColor: "green", // Border for debugging
    backgroundColor: "#e7e9c2",
  },
  
  avatarImage: {
    position: "absolute",
    width: moderateScale(200), // Adjust to keep it within container size
    height: moderateScale(200),
    top: "-20%",
    resizeMode: "contain",
  },
  arrowLeft: {
    position: "absolute",
    top: "35%", // This ensures the container starts 20% from the top, adjusting dynamically
    left: "5%", // This centers the container with some space from the left side
    width: moderateScale(50),
    height: moderateScale(50),
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "pink", // Border for debugging
  },

  arrowButtonLeft: {
    position: "absolute",
    
  },
  arrowRight: {
    position: "absolute",
    top: "35%", // This ensures the container starts 20% from the top, adjusting dynamically
    right: "5%", 
    width: moderateScale(50),
    height: moderateScale(50),
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "pink", // Border for debugging
  },
  arrowButtonRight: {
    position: "absolute",
  },
  arrowImage: {
    width: moderateScale(50),
    height: moderateScale(50),
    resizeMode: "contain",
  },
  zodiacContainer: {
    position: "absolute",
    top: "2%", // This ensures the container starts 20% from the top, adjusting dynamically
    left: "69.6%", // This centers the container with some space from the left side
    right: "0%", 
    width: moderateScale(53), // Scale based on screen width
    height: moderateScale(51),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: (width * 0.6) / 2, // This makes the container a circle
    borderWidth: 1,
    borderColor: "purple", // Border for debugging
      backgroundColor: "#e7e9c2",
  },
  zodiacSymbol: {
    width: moderateScale(35), // Scale based on screen width
    height: moderateScale(35),
    resizeMode: "contain",
  },
  lowerContainer: {
    position: "absolute",
    height: height * 0.31, // Set height to 60% of the screen height
    width: width * 0.99, // Set width to 80% of the screen width
    top: "66%", // Positioned below the middle container (adjust as needed)
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "orange", // Border for debugging
  },
  nameLetterContainer: {
    position: "absolute",
    top: "0%",
    width: moderateScale(300), // Scale based on screen width
    height: moderateScale(45),
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "grey", // Border for debugging

  },

  nameText: {
    fontFamily: 'fink-heavy',
    fontSize: moderateScale(40),
    borderWidth: 1,
    color: "#bd8d56",
    borderColor: "grey", // Border for debugging
    textAlign: "center",

  },
  nameContainer: {
    top: "-5%",
    width: moderateScale(300), // Scale based on screen width
    height: moderateScale(60),
    borderWidth: 1,
    borderColor: "grey", // Border for debugging

  },
  inputName: {
    fontFamily: 'fink-heavy',
    position: "absolute",
    width: moderateScale(300), // Scale based on screen width
    height: moderateScale(60),
    borderColor: "#fff",
    borderWidth: 2,
    borderRadius: 25,
    color: "#fff",
    textAlign: "center",
    fontSize: moderateScale(30), // Use scale for responsive font size
    marginBottom: 20,
  },
  selectBirthLetterContainer: {
    position: "absolute",
    top: "50%",
    width: moderateScale(300), // Scale based on screen width
    height: moderateScale(45),
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "grey", // Border for debugging

  },

  selectBirthText: {
    fontFamily: 'fink-heavy',
    fontSize: moderateScale(40),
    borderWidth: 1,
    color: "#bd8d56",
    borderColor: "grey", // Border for debugging
    textAlign: "center",

  },

  dateContainer: {
    top: "20%",
    width: moderateScale(300), // Scale based on screen width
    height: moderateScale(50),
    borderWidth: 1,
    borderColor: "grey", // Border for debugging

  },
  
  datePickerButton: {
    width: moderateScale(300), // Scale based on screen width
    height: moderateScale(50),
    borderColor: "#fff",
    borderWidth: 2,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  dateText: {
    fontFamily: 'fink-heavy',
    color: "#fff",
    fontSize: moderateScale(30), // Use scale for responsive font size
  },
});

export default styles;
