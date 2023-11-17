import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {screen} from "../utils";
import {RestaurantsScreen} from "../screens/Restaurants/RestaurantsScreens";

const Stack = createNativeStackNavigator();

export function RestaurantStack() {
    return (
        <Stack.Navigator>
        <Stack.Screen
            name={screen.restaurant.tab}
            component={RestaurantsScreen}
            options={{title: "Restaurantes"}}
        />
        </Stack.Navigator>
    );
    }