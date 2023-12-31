import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements"; 
import {screen} from "../../utils";

export function RestaurantsScreen(props) {

    const { navigation } = props;

    const goToAddRestaurant = () => {
        //navigation.navigate(screen.restaurant.addRestaurant);
        navigation.navigate(screen.restaurant.addRestaurant);
    };
    return (
        <View>
            <Text>Restaurant</Text>

            <Button onPress={goToAddRestaurant}>Añadir restaurante</Button>
        </View>
    );
}
