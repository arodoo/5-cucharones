import React, { } from 'react'
import { View } from 'react-native'
import { Text, Rating } from 'react-native-elements'
import { styles } from './Header.styles'

export function Header(props) {

    const { restaurant } = props

    return (
        <View style={styles.content}>
            <View style={styles.viewRestaurantTitle}>
                <Text style={styles.restaurantTitle}>{restaurant.name}</Text>
                <Rating
                    style={styles.rating}
                    imageSize={20}
                    readonly
                    startingValue={restaurant.rating ? restaurant.rating : 0}
                />
            </View>
            <Text style={styles.restaurantDescription}>{restaurant.description}</Text>
        </View>
    )
}