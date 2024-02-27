import {StyleSheet} from 'react-native';
import { colors } from '../../../utils';

export const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
    },
    btnContainer: {
        marginTop: 20,
        width: '80%',
    },
    btn: {
        backgroundColor: colors.firstColor,
    },
    });