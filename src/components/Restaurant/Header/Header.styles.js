import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: '#fff',
        paddingVertical: 20,
    },
    viewRestaurantTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    restaurantTitle: {
        fontWeight: 'bold',
        fontSize: 20,
        paddingLeft: 20,
    },
    rating: {
        position: 'absolute',
        right: 10,
    },
    restaurantDescription: {
        marginTop: 5,
        color: 'grey',
        left: 10,
    },
});