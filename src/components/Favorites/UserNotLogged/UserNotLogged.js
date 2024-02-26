import React from 'react'
import { View } from 'react-native'
import { Text, Icon, Button } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { screen } from '../../../utils'
import { styles } from './UserNotLogged.styles'

export function UserNotLogged() {

    const navigation = useNavigation()

    const goToLogin = () => {
        navigation.navigate(screen.account.tab,
            {
                screen: screen.account.login
            })
    }

    return (
        <View style = {styles.content}>
            <Icon type = "material"
                name = "account-circle"
                size = {50}
            />
            <Text style = {styles.info}>
                Inicia sesión para ver tus favoritos
            </Text>
            <Button title = "Iniciar sesión"
                containerStyle = {styles.btnContainer}
                buttonStyle = {styles.btn}
                onPress = {goToLogin}
            />
        </View>
    )
}