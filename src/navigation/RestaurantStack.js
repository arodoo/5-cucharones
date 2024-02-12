import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RestaurantsScreen } from "../screens/Restaurants/RestaurantsScreen";
import { AddRestaurantScreen } from "../screens/Restaurants/AddRestaurantScreen";
import { RestaurantScreen } from "../screens/Restaurants/RestaurantScreen";
import { AddReviewRestaurantScreeen } from "../screens/Restaurants/AddReviewRestaurantScreeen";
import { screen } from "../utils";
const Stack = createNativeStackNavigator();

export function RestaurantStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={screen.restaurant.restaurants}
                component={RestaurantsScreen}
                options={{ title: "Restaurantes" }}
            />
            <Stack.Screen
                name={screen.restaurant.addRestaurant}
                component={AddRestaurantScreen}
                options={{ title: "añade un restaurante" }}
            />
            <Stack.Screen
                name={screen.restaurant.restaurant}
                component={RestaurantScreen}
                options={{ title: "Restaurante" }}
            />
            <Stack.Screen
                name={screen.restaurant.addReviewRestaurant}
                component={AddReviewRestaurantScreeen}
                options={{ title: "Añade una opinión" }}
            />
        </Stack.Navigator>
    );
}