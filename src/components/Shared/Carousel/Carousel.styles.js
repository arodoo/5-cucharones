import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    content: {
        position: 'relative',
        width: '100%',
        flex: 1,
        
    },
    containerPagination: {
        backgroundColor: 'transparent',
        zIndex: 1,
        position: 'absolute',
        bottom: 0,
        alignSelf: 'center',
    },
    dotStyle: {
        backgroundColor: '#fff',
        borderRadius: 10,
        marginHorizontal: 2,
        width: 10,
        height: 10,
    },
});