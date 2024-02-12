import React, {useState, useEffect}  from 'react'
import { View } from 'react-native'
import { Text, Button } from 'react-native-elements'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useNavigation } from '@react-navigation/native'
import {screen} from '../../../utils'
import { styles } from './BtnReviewForm.styles'

export function BtnReviewForm(props) {

    const { idRestaurant } = props;
    const auth = getAuth();
    const [hasLogged, setHasLogged] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setHasLogged(user ? true : false);
        }
        )
    }
        , []);

        const goToLogin = () => {
            navigation.navigate(screen.account.tab, 
                { screen: screen.account.login });
        }

    return (
        <View style={styles.View}>
            {hasLogged ? (
                <Button
                    title="Escribe una opinión"
                    buttonStyle={styles.button}
                    titleStyle={styles.text}
                    onPress={() => console.log('Escribe una opinión')}
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