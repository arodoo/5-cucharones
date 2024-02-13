import { StyleSheet } from "react-native";
import {colors} from "../../../utils/colors";

export const styles = StyleSheet.create({
    content: {
        justifyContent: "space-between",
        marginHorizontal: 20,
    },
    input: {
        marginBottom: 10,
        marginTop: 30,
    },
    comment: {
        height: 100,
        padding: 0,
        margin: 0,
    },
    ratingContent: {
        height: 40,
        justifyContent: "center",
        marginTop: 30,
    },
    imgContent: {
        alignItems: "center",
        marginVertical: 10,
    },
    btnContainer: {
        marginTop: 50,
        width: "95%",
        alignSelf: "center",
    },
    btn: {
        backgroundColor: colors.firstColor,
    },
});