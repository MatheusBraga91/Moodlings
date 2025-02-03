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
        margin: 0,
        padding: 0,
        justifyContent: "flex-start",
    },
    day: {

        width: width / 7,
        height: moderateScale(100),
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
        borderWidth: 0.1,
        borderColor: "black",
    },
    filledDay: {
        backgroundColor: "#e0f7fa",
    },
    emptyDay: {
        backgroundColor: "white",
    },
    dayText: {
        position: "absolute",
        top: 0,
        fontFamily: "fink-heavy",
        fontSize: moderateScale(11),
        fontWeight: "bold",
        color: "#bd8d56",
    },

    currentDay: {
        backgroundColor: "#9cc1ff",
        borderColor: "#fbc02d",
        borderWidth: 1,
    },


    smallSquaresContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        width: "80%",
        marginTop: moderateScale(10),
    },
    smallSquare: {
        width: "45%",
        height: moderateScale(20),
        marginBottom: moderateScale(5),
    },
    smallSquareImage: {
        width: "100%",
        height: moderateScale(20),
        backgroundColor: "#9cc1ff",
        marginBottom: moderateScale(5),
    },

    smallSquareNumber: {
        position: "absolute",
        fontSize: 12,
        color: "rgba(0, 0, 0, 0.5)",
        zIndex: 1,
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
        flexGrow: 1,
        overflow: "visible",
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
        padding: moderateScale(12),
        overflow: "visible",
    },
    selectedImage: {
        transform: [{ scale: 1.2 }],
        overflow: "visible",
        resizeMode: "contain",
    },



    closeButton: {
        backgroundColor: "red",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        marginTop: "auto",
        width: "100%",
    },

    closeButtonText: {
        color: "white",
        fontWeight: "bold",
    },

    modalContentContainer: {
        flexDirection: "row",
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingBottom: 0,
    },

    inputContainer: {
        padding: 10,
        marginTop: 10,
        width: '100%',
        height: '70%',

    },

    timeContainer: {
        marginBottom: 5,
    },
    timeText: {
        fontSize: moderateScale(16),
        fontFamily: 'fink-heavy',
        color: '#bd8d56',
        textAlign: 'center',
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
