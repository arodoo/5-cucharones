import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    content: {
        flexDirection: 'column',
        flex: 1,
        marginVertical: 10,
        marginHorizontal: 15,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 10,
    },

    image: {
        width: '100%',
        height: 180,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },

    titleRanking: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        marginHorizontal: 10,

    },

    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },

    rating: {
        marginTop: 10,

    },

    description: {
        color: 'grey',
        marginTop: 10,
        marginHorizontal: 15,
    },

});
