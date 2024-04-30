import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Icon, Image, Text } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { deleteDoc, doc } from 'firebase/firestore'
import { db } from '../../../utils'
import { styles } from './RestaurantFavoritesstyles'

export function RestaurantFavorites(props) {

    const { restaurant } = props
    const navigation = useNavigation()

    const goToRestaurant = () => {
        navigation.navigate('RestaurantsTab', {
            screen: 'Restaurant',
            params: { id: restaurant.id }
        })
    }

    const onRemoveFavorite = async () => {
        try {
            await deleteDoc(doc(db, 'favorites', restaurant.idFavorite));
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <TouchableOpacity onPress={goToRestaurant}>
            <View style={styles.content}>
                <View style={styles.imageContainer}>
                    <Image
                        resizeMode='cover'
                        PlaceholderContent={<Text>Cargando</Text>}
                        source={{ uri: restaurant.images[0] }}
                        style={styles.image}
                    />
                </View>
                <View style={styles.info}>
                    <Text style={styles.name}>{restaurant.name}</Text>
                    <Icon
                        type='material'
                        name='favorite'
                        color='#f00'
                        containerStyle={styles.iconContainer}
                        underlayColor='transparent'
                        onPress={onRemoveFavorite}
                    />
                </View>
            </View>
        </TouchableOpacity>
    )
}
