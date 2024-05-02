import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    viewRestaurant: {
        height: 100,
        flexDirection: "row",
        margin: 12,
        backgroundColor: "#fff",
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 10,
    },
    imageRestaurant: {
        width: 90,
        height: 100,
        borderRadius: 5,
    },
    restaurantName: {
        fontWeight: "bold",
    },
    restaurantAddress: {
        paddingTop: 2,
        color: "grey",
    },
    restaurantDescription: {
        paddingTop: 2,
        color: "grey",
        width: 300,
    },
});