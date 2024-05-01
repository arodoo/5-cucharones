import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { size } from 'lodash';
import { db } from "../utils";


export function RankingScreen() {

    const [restaurants, setRestaurants] = useState([]);
    console.log(size(restaurants));

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
        <View >
            <Text>Ranking</Text>
        </View>
    );
}