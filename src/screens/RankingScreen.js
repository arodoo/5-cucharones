import React, { useEffect, useState } from "react";
import { ScrollView, Text } from "react-native";
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { size, map } from 'lodash';
import { db } from "../utils";

import { RestaurantRanking } from '../components/Restaurants/RestaurantRanking';


export function RankingScreen() {

    const [restaurants, setRestaurants] = useState([]);
    //console.log(size(restaurants));

    useEffect(() => {
        const q = query(
            collection(db, 'restaurants'),
            orderBy('rating', 'desc'),
            limit(10)
        );

        onSnapshot(q, (querySnapshot) => {
            const restaurantsArray = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                data.id = doc.id;
                restaurantsArray.push(data);
            });
            setRestaurants(restaurantsArray);
        });
    }
        , []);

    return (
        <ScrollView >
            {map(restaurants, (restaurant, index) => (
                <RestaurantRanking
                    key={index}
                    restaurant={restaurant}
                    index={index} />
            ))}
        </ScrollView>
    );
}