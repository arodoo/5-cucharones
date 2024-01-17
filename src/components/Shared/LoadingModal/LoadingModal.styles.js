import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    overlay: {
        height: 100,
        width: 200,
        backgroundColor: "#fff",
        borderColor: "#233142",
        borderWidth: 2,
        borderRadius: 10,
        // Set text color as white
        color: "#fff",
    },
    view: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        textAlign: "justify",
    },
});
