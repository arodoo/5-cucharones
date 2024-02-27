import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, getDoc, query, where, collection, deleteDoc, onSnapshot } from 'firebase/firestore'
import { db } from "../utils";
import { Loading } from "../components/Shared";
import { size } from "lodash";
import { UserNotLogged, NotFoundRestaurants } from "../components/Favorites";


export function FavoritesScreen() {
    const [hasLogged, setHasLogged] = useState(false)
    const [loading, setLoading] = useState(true)
    const [favorites, setFavorites] = useState([])
    const auth = getAuth()

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
            for await (const item of snapshot.docs) {
                const data = item.data();
                const docRef = doc(db, 'restaurants', data.idRestaurant);
                const response = await getDoc(docRef);
                const newData = response.data();
                newData.id = data.id;
                favoritesArray.push(newData);
            }
            setLoading(false);
            setFavorites(favoritesArray);
        }
        )
    }
        , [])




    if (loading) return (<Loading show text='Cargando' />)

    if (size(favorites) === 0) return (<NotFoundRestaurants />)

    if (!hasLogged) return (<UserNotLogged />)

    return (
        <View >
            <Text>textttt </Text>
        </View>
    );
}

