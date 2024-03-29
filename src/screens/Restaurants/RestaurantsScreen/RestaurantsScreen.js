import React, {useState, useEffect} from "react";
import { View} from "react-native";
import { Icon, Text } from "react-native-elements"; 
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {collection, onSnapshot, orderBy, query} from "firebase/firestore";
import Toast from "react-native-toast-message";
import {screen, db} from "../../../utils";
import { LoadingModal } from "../../../components/Shared";
import { ListRestaurants } from "../../../components/Restaurants/ListRestaurants/ListRestaurants";
import { styles } from "./RestaurantsScreen.styles";

export function RestaurantsScreen(props) {

    const { navigation } = props;
    const [currentUser, setCurrentUser] = useState(null)
    const [restaurants, setRestaurants] = useState(null)

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            user ? setCurrentUser(true) : setCurrentUser(false);
        });
    }, []);

    useEffect(() => {
        const q = query(
            collection(db, "restaurants"),
            orderBy("createdAt", "desc")
            );
        onSnapshot(q, (querySnapshot) => {
            setRestaurants(querySnapshot.docs)
        }
        );
    }
    , []);


    const goToAddRestaurant = () => {
        if(!currentUser){
            Toast.show({
                type: "info",
                text1: "Inicia sesión para agregar un restaurante",
                autoHide: true,
                topOffset: 60,
                bottomOffset: 40,
            });
            navigation.navigate(screen.account.login)
        }else if(currentUser){
            navigation.navigate(screen.restaurant.addRestaurant)
        }
    };
    return (
        <View style={styles.container}>
            {!restaurants ? (
                <LoadingModal show text="Espere un momento, estamos trabajando duro por usted" />
            ) : (
                <ListRestaurants restaurants={restaurants} />
            )}
            

            <Icon
                type="material"
                name="add"
                color="#442484"
                reverse
                containerStyle={styles.btnAddRestaurant}
                onPress={goToAddRestaurant}  
            />          
        </View>
    );
}
