import React from 'react'
import { FlatList, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Text, Image } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import {screen} from '../../../utils'
import { styles } from './ListRestaurants.styles'

export function ListRestaurants(props) {
    const { restaurants } = props
    const navigation = useNavigation()

    const goToRestaurant = (id) => {
        console.log(id);
        navigation.navigate(screen.restaurant.restaurant, { id: id })
    }
  return (
    <FlatList
        data={restaurants}
        renderItem={(restaurant) => {
            const restaurantData = restaurant.item.data();
            return (
                <TouchableOpacity onPress={() => goToRestaurant(restaurantData.id)}>
                    <View style={styles.viewRestaurant}>
                        <Image
                        source={{ uri: restaurantData.images[0] }}
                        style={styles.imageRestaurant}
                        PlaceholderContent={<ActivityIndicator color="#fff" />}
                        resizeMode="cover"
                        />
                        <View>
                            <Text style={styles.restaurantName}>{restaurantData.name}</Text>
                            <Text style={styles.restaurantAddress}>{restaurantData.address}</Text>
                            <Text style={styles.restaurantDescription}>
                                {restaurantData.description.substr(0, 60)}...
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        }
        }
        keyExtractor={(item, index) => index.toString()}
    />
    )
}