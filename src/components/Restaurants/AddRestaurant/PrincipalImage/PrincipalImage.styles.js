import { StyleSheet, Dimensions } from "react-native";

const widthScreen = Dimensions.get("window").width;
export const styles = StyleSheet.create({

    content: {
        marginTop: 20,
        marginBottom: 20,
        alignItems: "center",
    },
    image: {
        width: widthScreen,
        height: 200,
    },
});