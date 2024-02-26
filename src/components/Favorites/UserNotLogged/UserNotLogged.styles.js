import { StyleSheet } from "react-native";
import {colors} from "../../../utils";

export const styles = StyleSheet.create({
    content:{
        justifyContent: "center",
        alignItems: "center",
        height: "100%"
    },
    info:{
        fontSize: 18,
        textAlign: "center",
        marginBottom: 20,
        fontWeight: "bold"
    },
    btnContainer:{
        marginTop: 20,
        width: "80%"
    },
    btn:{
        backgroundColor: colors.firstColor
    }
});