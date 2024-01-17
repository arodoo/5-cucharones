import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    viewRestaurant: {
        flexDirection: "row",
        margin: 10,
    },
    imageRestaurant: {
        width: 80,
        height: 80,
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