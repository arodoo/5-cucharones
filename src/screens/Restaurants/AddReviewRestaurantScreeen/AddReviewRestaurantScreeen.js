import React from 'react'
import { View, Text } from 'react-native'

export function AddReviewRestaurantScreeen(props) {
    const { route } = props;
    console.log(route.params.idRestaurant);
  return (
    <View>
      <Text>AddReviewRestaurantScreeen</Text>
    </View>
  )
}