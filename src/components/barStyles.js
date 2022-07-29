import { StyleSheet } from "react-native";

const barStyle = StyleSheet.create({
    container: {
        backgroundColor: "white",
        width: "90%",
        alignSelf: "center",
        height: 60,
        borderRadius: 10,
        flexDirection: "row"
    },
    inputContainer: {
        /* borderWidth: 1, */
        flex: 2.5,
        borderRadius: 10,
        paddingHorizontal: 20,
        justifyContent: "center",

    },
    textInput: {
        fontSize: 20
    },
    buttonContainer: {
        /* borderWidth: 1, */
        flex: 1,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default barStyle;