import { StyleSheet } from "react-native";
import {colors} from "../../../utils/colors";

export const styles = StyleSheet.create({
    content: {
        justifyContent: "space-between",
        marginHorizontal: 20,
    },
    input: {
        marginBottom: 10,
        marginTop: 60,
    },

    comment: {
        height: 100,
        padding: 0,
        margin: 0,
    },
    ratingContent: {
        height: 40,
        justifyContent: "center",
        marginTop: 50,
    },
    imgContent: {
        alignItems: "center",
        marginVertical: 20,
    },
    btnContainer: {
        marginTop: 80,
        width: "95%",
        alignSelf: "center",
    },
    btn: {
        backgroundColor: colors.firstColor,
    },
});