import { StyleSheet, Dimensions } from "react-native";
import { scale, moderateScale } from 'react-native-size-matters';

const { width, height } = Dimensions.get("window"); // Get the screen width

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        padding: 0,
        backgroundColor: "#d1f1fe",
    },
    header: {
        marginBottom: 16,
    },
    headerText: {
        fontFamily: "fink-heavy",
        fontSize: moderateScale(30),
        color: '#bd8d56',
    },
    daysOfWeek: {
        flexDirection: "row",
        width: "100%",
        marginBottom: 8,
    },
    dayOfWeek: {
        fontFamily: "fink-heavy",
        flex: 1,
        textAlign: "center",
        fontWeight: "bold",
        color: "#bd8d56",
        fontSize: 10,
    },
    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        width: "100%",
        margin: 0, // Remove any margin
        padding: 0, // Remove any padding
        justifyContent: "flex-start", // Align items to the left
    },
    day: {

        width: width / 7, // 7 days in a row, each taking 1/7 of the screen width
        height: moderateScale(100), // Set a specific height for the day container
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
        borderWidth: 0.1, // Border thickness of 1px
        borderColor: "black", // Black border color
    },
    filledDay: {
        backgroundColor: "#e0f7fa",
    },
    emptyDay: {
        backgroundColor: "white",
    },
    dayText: {
        position: "absolute",
        top: 0, // Place the text at the top of the container
        fontFamily: "fink-heavy",
        fontSize: moderateScale(11),
        fontWeight: "bold",
        color: "#bd8d56",
    },

    currentDay: {
        backgroundColor: "#9cc1ff", // Yellow background for the current day
        borderColor: "#fbc02d", // A different border color
        borderWidth: 1, // Add a border to make it stand out
    },


    smallSquaresContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between", // Space between the small squares
        width: "80%", // Take up 80% of the container width
        marginTop: moderateScale(10), // Add some space below the day number
    },
    smallSquare: {
        width: "45%", // Each square takes up about 45% of the container width
        height: moderateScale(20), // Small height for each square
        marginBottom: moderateScale(5), // Space between squares
    },
    smallSquareImage: {
        width: "100%", // Each square takes up about 45% of the container width
        height: moderateScale(20), // Small height for each square
        backgroundColor: "#9cc1ff", // Yellow background for the current day
        marginBottom: moderateScale(5), // Space between squares
    },

    smallSquareNumber: {
        position: "absolute", // Ensures the text is positioned inside the square
        fontSize: 12, // Adjust the font size to fit nicely
        color: "rgba(0, 0, 0, 0.5)", // A subtle color for the numbers
        zIndex: 1, // Ensure it appears above the image
        textAlign: "center",
        width: "100%",
    },
    modalContainer: {
        backgroundColor: "#e0f7fa",
        borderRadius: 10,
        padding: 20,
        position: "absolute",
        top: height * 0.1,
        left: width * 0.1,
        width: width * 0.8,
        height: height * 0.8,
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        flexDirection: "column",
    },
    modalTitle: {
        textAlign: "center",
        fontFamily: "fink-heavy",
        fontSize: moderateScale(30),
        color: '#bd8d56',
        marginBottom: 10,
    },
    modalContent: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        flexGrow: 1, // Allow content to grow and push the button down
        overflow: "visible", // Ensure contents are not clipped
    },


    modalImage: {
        width: moderateScale(65),
        height: moderateScale(120),
        resizeMode: "contain",

    },
    selectedImageContainer: {
        justifyContent: "center",
        alignItems: "center",
        borderRadius: moderateScale(150),
        padding: moderateScale(12), // Slightly larger padding for better effect
        overflow: "visible", // Allow the image to extend beyond this container
    },
    selectedImage: {
        transform: [{ scale: 1.2 }], // Scale up when selected
        overflow: "visible",  // Ensure it doesn't get cut
        resizeMode: "contain",
    },



    closeButton: {
        backgroundColor: "red",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",  // Ensures text is centered
        marginTop: "auto",  // Push the button to the bottom of the modal
        width: "100%",  // Make the button fill the width
    },

    closeButtonText: {
        color: "white",
        fontWeight: "bold",
    },

    modalContentContainer: {
        flexDirection: "row", // Set to row to display images horizontally
        justifyContent: 'flex-start', // Adjust as per your needs, e.g., 'center' or 'space-around'
        alignItems: 'center', // Ensure images are aligned properly
        paddingBottom: 0, // Add padding to avoid clipping at the bottom
    },

    inputContainer: {
        padding: 10,
        marginTop: 10,
        width: '100%',
        height: '70%',

    },

    timeContainer: {
        marginBottom: 5, // Space between the time and input field
    },
    timeText: {
        fontSize: moderateScale(16),
        fontFamily: 'fink-heavy',
        color: '#bd8d56', // Or another color you prefer
        textAlign: 'center', // Align to the left or center depending on your design
    },
    inputField: {
        fontSize: moderateScale(20),
        fontFamily: 'fink-heavy',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        minHeight: 100,
        width: '100%',
        height: '80%',
    },
    saveButton: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    saveButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },




});

export default styles;
