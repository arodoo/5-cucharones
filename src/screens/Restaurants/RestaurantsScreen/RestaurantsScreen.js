import React, {useState, useEffect} from "react";
import { View} from "react-native";
import { Icon } from "react-native-elements"; 
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Toast from "react-native-toast-message";
import {screen} from "../../../utils";
import { styles } from "./RestaurantsScreen.styles";

export function RestaurantsScreen(props) {

    const { navigation } = props;
    const [currentUser, setCurrentUser] = useState(null)

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            user ? setCurrentUser(true) : setCurrentUser(false);
        });
    }, []);




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
