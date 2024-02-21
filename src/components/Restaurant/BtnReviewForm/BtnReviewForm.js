import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { Text, Button } from 'react-native-elements'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useNavigation } from '@react-navigation/native'
import { size } from 'lodash'
import { query, collection, where, onSnapshot } from 'firebase/firestore'
import { screen, colors, db } from '../../../utils'

import { styles } from './BtnReviewForm.styles'

export function BtnReviewForm(props) {

    const { idRestaurant } = props;
    const auth = getAuth();
    const [hasLogged, setHasLogged] = useState(false);
    const [hasReview, setHasReview] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setHasLogged(user ? true : false);
        }
        )
    }
        , []);

    useEffect(() => {
        if (hasLogged) {
            const q = query
                (collection(db, 'reviews'),
                    where('idRestaurant', '==', idRestaurant),
                    where('idUser', '==', auth.currentUser.uid)
                );
            onSnapshot(q, (snapshot) => {
                setHasReview(size(snapshot.docs) > 0 ? true : false);
            });
        }
    }, [hasLogged]);

    const goToLogin = () => {
        navigation.navigate(screen.account.tab,
            { screen: screen.account.login });
    }

    const goToAddReview = () => {
        navigation.navigate(screen.restaurant.addReviewRestaurant,
            { idRestaurant });
    }

    if (hasReview) {
        return (
            <View style={styles.View}>
                <Text style={styles.textAddedReview}>
                    ¡Ya has calificado este restaurante! :D
                </Text>
            </View>
        )
    }

    return (
        <View style={styles.View}>
            {hasLogged ? (
                <Button
                    title="Escribe una opinión"
                    icon={{
                        type: 'material',
                        name: 'rate-review',
                        color: colors.firstColor,
                    }}
                    buttonStyle={styles.button}
                    titleStyle={styles.btnText}
                    onPress={() => goToAddReview()}
                />
            ) : (
                <Text
                    style={styles.text}
                    onPress={goToLogin}
                >
                    Para escribir una opinión es necesario estar logueado
                    <Text style={{ fontWeight: 'bold' }}> Inicia sesión</Text>
                </Text>
            )}
        </View>
    )
}