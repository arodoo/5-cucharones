import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Image, Text, Rating, Icon } from 'react-native-elements'
import { styles } from './RestaurantRanking.styles'

export function RestaurantRanking(props) {
  const { restaurant, index } = props
  return (
    <TouchableOpacity>
      <View style={styles.content}>
        <Image
          resizeMode="cover"
          PlaceholderContent={<Image source={require('../../../../assets/img/no-image.png')} style={styles.image} />}
          source={{ uri: restaurant.images[0] }}
          style={styles.image}
        />
        <View style={styles.titleRanking}>
          <Text style={styles.title}>{restaurant.name}</Text>
          <Rating imageSize={20} startingValue={restaurant.rating} readonly style={styles.rating} />
        </View>
        <Text style={styles.description}>{restaurant.description}</Text>
      </View>
    </TouchableOpacity>
  )
}