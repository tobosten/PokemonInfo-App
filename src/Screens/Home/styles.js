import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    topImageContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    redirectButtons: {
        backgroundColor: "white",
        width: "50%",
        minWidth: 150,
        maxWidth: 300,
        borderRadius: 10,
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        marginTop: 20
    },
    redirectButtonsText: {
        fontSize: 18
    }
})

export default styles;