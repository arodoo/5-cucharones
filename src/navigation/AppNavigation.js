import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RestaurantsScreens } from "../screens/RestaurantsScreens";
import { FavoritesScreens } from "../screens/FavoritesScreens";
import { AccountScreen } from "../screens/AccountScreen";
import { SearchScreen } from "../screens/SearchScreen";
import { RankingScreen } from "../screens/RankingScreen";

import { Icon } from "@rneui/themed";


const Tab = createBottomTabNavigator();

export function AppNavigation() {
    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarActiveTintColor: "#F44336",
            tabBarInactiveTintColor: "#757575",
            tabBarIcon: ({ color, size }) => screenOptions(route, color, size),
        })}
        >
            <Tab.Screen name="Restaurant" component={RestaurantsScreens} />
            <Tab.Screen name="Favorites" component={FavoritesScreens} />
            <Tab.Screen name="Account" component={AccountScreen} />
            <Tab.Screen name="Search" component={SearchScreen} />
            <Tab.Screen name="Ranking" component={RankingScreen} />
        </Tab.Navigator>
    )
}

function screenOptions(route, color, size) {
    let iconName;
    if (route.name === "Restaurant") {
        iconName = "compass-outline";
    }
    if (route.name === "Favorites") {
        iconName = "heart-outline";
    }
    if (route.name === "Account") {
        iconName = "home-outline";
    }
    if (route.name === "Search") {
        iconName = "magnify";
    }
    if (route.name === "Ranking") {
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
