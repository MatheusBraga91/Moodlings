import { StyleSheet, Dimensions } from "react-native";
import { scale, moderateScale } from 'react-native-size-matters';

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    position: "relative",
    overflow: "hidden", 
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },

  topContainer: {
    minHeight: 150, 
    height: height * 0.25, 
    width: width * 0.99, 
    top: "0%", 
    justifyContent: "center",
    alignItems: "center",
  },
  titleContainer: {
    top: "0%", 
    width: moderateScale(300),
    height: moderateScale(120),
    justifyContent: "center",
    alignItems: "center",
  },
  selectAvatarText: {
    fontFamily: "fink-heavy", 
    fontSize: moderateScale(62), 
    color: "#bd8d56", 
    textAlign: "center",
  },
  middleContainer: {
    minHeight: 200, 
      height: height * 0.3, 
    width: width * 0.99, 
    top: "0%", 
    left: "0%", 
    right: "0%", 
      justifyContent: "center",
    alignItems: "center",
  },
  avatarContainer: {
    width: moderateScale(190),
    height: moderateScale(170),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: (width * 0.6) / 2, 
    backgroundColor: "#e7e9c2",
  },
  
  avatarImage: {
    position: "absolute",
    width: moderateScale(200), 
    height: moderateScale(200),
    top: "-20%",
    resizeMode: "contain",
  },
  arrowLeft: {
    position: "absolute",
    top: "35%", 
    left: "5%", 
    width: moderateScale(50),
    height: moderateScale(50),
    justifyContent: "center",
    alignItems: "center",
  },

  arrowButtonLeft: {
    position: "absolute",
    
  },
  arrowRight: {
    position: "absolute",
    top: "35%", 
    right: "5%", 
    width: moderateScale(50),
    height: moderateScale(50),
    justifyContent: "center",
    alignItems: "center",
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
    top: "2%", 
    left: "69.6%", 
    right: "0%", 
    width: moderateScale(53), 
    height: moderateScale(51),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: (width * 0.6) / 2, 
      backgroundColor: "#e7e9c2",
  },
  zodiacSymbol: {
    width: moderateScale(35), 
    height: moderateScale(35),
    resizeMode: "contain",
  },
  lowerContainer: {
    minHeight: 150, 
    height: height * 0.31, 
    width: width * 0.99, 
    top: "0%", 
    justifyContent: "center",
    alignItems: "center",
  },
  nameLetterContainer: {
    position: "absolute",
    top: "0%",
    width: moderateScale(300), 
    height: moderateScale(45),
    justifyContent: "center",
    alignItems: "center",


  },

  nameText: {
    fontFamily: 'fink-heavy',
    fontSize: moderateScale(40),
    color: "#bd8d56",
    textAlign: "center",

  },
  nameContainer: {
    top: "-5%",
    width: moderateScale(300), 
    height: moderateScale(60),

  },
  inputName: {
    
    fontFamily: 'fink-heavy',
    position: "absolute",
    width: moderateScale(300), 
    height: moderateScale(60),
    borderColor: "#fff",
    borderWidth: 2,
    borderRadius: 25,
    color: "#fff",
    textAlign: "center",
    fontSize: moderateScale(30), 
    lineHeight: moderateScale(60), 
  },
  selectBirthLetterContainer: {
    position: "absolute",
    top: "50%",
    width: moderateScale(300), 
    height: moderateScale(45),
    justifyContent: "center",
    alignItems: "center",

  },

  selectBirthText: {
    fontFamily: 'fink-heavy',
    fontSize: moderateScale(40),
    color: "#bd8d56",
    textAlign: "center",

  },

  dateContainer: {
    top: "20%",
    width: moderateScale(300), 
    height: moderateScale(50),

  },
  
  datePickerButton: {
    width: moderateScale(300), 
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
    fontSize: moderateScale(30), 
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#222",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalInput: {
    fontSize: 18,
    color: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
    textAlign: "center",
    padding: 10,
  },

  
  createButton: {
    position: "absolute",
    top: "-10%", 
    left: "7%", 
    width: moderateScale(100),
    height: moderateScale(50),
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,       
    borderColor: "pink",      
    borderRadius: 50, 
  },

  createButtonText: {
    fontFamily: 'fink-heavy',
    color: "#fff",
    fontSize: moderateScale(30), 
  },
  
  
});

export default styles;
