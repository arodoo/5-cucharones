import { StyleSheet } from "react-native";
import {colors} from '../../../utils/colors'

export const styles = StyleSheet.create({


    View: {
        margin: 10,
    },
    button: {
        backgroundColor: 'transparent', // 'rgba(206, 206, 206, 0.5)',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    btnText: {
        color: colors.firstColor,
        fontSize: 18,
        textAlign: "center",
    },
    text: {
        color: "black",
        fontSize: 18,
        textAlign: "center",
    },
    });