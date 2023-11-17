import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RestaurantsScreens } from "../screens/RestaurantsScreens";
import { FavoritesScreens } from "../screens/FavoritesScreens";
import { AccountScreen } from "../screens/AccountScreen";
import { SearchScreen } from "../screens/SearchScreen";
import { RankingScreen } from "../screens/RankingScreen";
import { screen } from "../utils/index";

import { Icon } from "@rneui/themed";


const Tab = createBottomTabNavigator();

export function AppNavigation() {
    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarActiveTintColor: "#F44336",
            tabBarInactiveTintColor: "#757575",
            tabBarIcon: ({ color, size }) => tabBarIconOptions(route, color, size),
        })}
        >
            <Tab.Screen name={screen.restaurant.tab} component={RestaurantsScreens} options={{ title: "Restaurantes" }} />
            <Tab.Screen name={screen.favorites.tab} component={FavoritesScreens} options={{title: "Favoritos"}} />
            <Tab.Screen name={screen.ranking.tab} component={RankingScreen} options={{ title: "Ranking" }} />
            <Tab.Screen name={screen.account.tab} component={AccountScreen} options={{title: "Perfil"}} />
            <Tab.Screen name={screen.search.tab} component={SearchScreen} options={{ title: "Buscar" }} />

        </Tab.Navigator>
    )
}

function tabBarIconOptions(route, color, size) {
    let iconName;
    if (route.name === screen.restaurant.tab) {
        iconName = "compass-outline";
    }
    if (route.name === screen.favorites.tab) {
        iconName = "heart-outline";
    }
    if (route.name === screen.account.tab) {
        iconName = "home-outline";
    }
    if (route.name === screen.search.tab) {
        iconName = "magnify";
    }
    if (route.name === screen.ranking.tab) {
        iconName = "star-outline";
    }
    return (
        <Icon
            type="material-community"
            name={iconName}
            size={size}
            color={color}
        />
    );
}
