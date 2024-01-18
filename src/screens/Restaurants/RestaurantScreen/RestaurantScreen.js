import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import {
  doc,
  onSnapshot,
  collection,
  query,
  where,
  orderBy,
} from 'firebase/firestore'
import { db } from '../../../utils'
import { styles } from './RestaurantScreen.styles'
export function RestaurantScreen(props) {
  const { route } = props
  const [restaurant, setRestaurant] = useState(null)

  useEffect(() => {
    setRestaurant(null);
    onSnapshot(doc(db, 'restaurants', route.params.id), (doc) => {
      setRestaurant(doc.data())
    }
    )
  }
    , [route.params.id])

  return (
    <View>
      <Text>RestaurantScreen</Text>
    </View>
  )
}