import React from 'react'
import { View } from 'react-native'
import { Text, Icon, Button } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { screen } from '../../../utils'
import { styles } from './NotFoundRestaurants.styles'

export function NotFoundRestaurants() {

    const navigation = useNavigation()
    const goToRestaurants = () => {
        navigation.navigate(screen.restaurant.tab,
            {
                screen: screen.restaurant.restaurants
            })        
    }
  return (
    <View style = {styles.content}>
        <Icon
            type='material'
            name='restaurant'
            size={50}
            color='#c2c2c2'
        />
        <Text style={styles.text}>No tienes restaurantes favoritos</Text>
        <Button
            title='Ir a restaurantes'
            containerStyle={styles.btnContainer}
            buttonStyle={styles.btn}
            onPress={goToRestaurants}
        />
    </View>
  )
}