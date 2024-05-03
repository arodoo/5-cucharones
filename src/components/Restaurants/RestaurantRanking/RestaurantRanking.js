import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Image, Text, Rating, Icon } from 'react-native-elements'
import { styles } from './RestaurantRanking.styles'

export function RestaurantRanking(props) {
  const { restaurant, index } = props

  const renderIcon = () => {
    if (index === 0) {
      return <Icon type="material-community" name="trophy" color="#FFD700" style={styles.medal} />
    }
    if (index === 1) {
      return <Icon type="material-community" name="trophy" color="#C0C0C0" style={styles.medal} />
    }
    if (index === 2) {
      return <Icon type="material-community" name="trophy" color="#cd7f32" style={styles.medal} />
    }
  }

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
          <View style={{ flexDirection: 'row', flex: 1 }}>
            {renderIcon()}
            <Text style={styles.title}>{restaurant.name}</Text>
          </View>
          <Rating imageSize={20} startingValue={restaurant.rating} readonly style={styles.rating} />
        </View>
        <Text style={styles.description}>{restaurant.description}</Text>
      </View>
    </TouchableOpacity>
  )
}