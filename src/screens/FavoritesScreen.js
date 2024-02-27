import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, getDoc, query, where, collection, deleteDoc, onSnapshot } from 'firebase/firestore'
import { db } from "../utils";
import { UserNotLogged } from "../components/Favorites";


export function FavoritesScreen() {
    const [hasLogged, setHasLogged] = useState(false)
    const [favorites, setFavorites] = useState([])
    const auth = getAuth()
    console.log(favorites);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setHasLogged(user ? true : false)
        }
        )
    }
        , [])

    useEffect(() => {
        const q = query(
            collection(db, 'favorites'),
            where('idUser', '==', auth.currentUser.uid)
        );
        onSnapshot(q, async (snapshot) => {
            let favoritesArray = [];
            snapshot.forEach(async (item) => {
                const data = item.data();
                const docRef = doc(db, 'restaurants', data.idRestaurant);
                const response = await getDoc(docRef);
                const newData = response.data();
                newData.id = data.id;
                favoritesArray.push(newData);
            });
            setFavorites(favoritesArray);
        }
        )
    }
        , [hasLogged])



    if (!hasLogged) return (<UserNotLogged />)

    return (
        <View >
            <Text>Favorites</Text>
        </View>
    );
}

