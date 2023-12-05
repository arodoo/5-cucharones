import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screen } from "../utils";
import { RestaurantsScreen } from "../screens/Restaurants/RestaurantsScreen";
import { AddRestaurantScreen } from "../screens/Restaurants/AddRestaurantScreen";
const Stack = createNativeStackNavigator();

export function RestaurantStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={screen.restaurant.restaurant}
                component={RestaurantsScreen}
                options={{ title: "Restaurantes" }}
            />
            <Stack.Screen
                name={screen.restaurant.addRestaurant}
                component={AddRestaurantScreen}
                options={{ title: "añade un restaurante" }}
            />
        </Stack.Navigator>
    );
}