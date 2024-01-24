import React, { useEffect, useState } from 'react'
import { ScrollView, Dimensions, View } from 'react-native'
import {
  doc,
  onSnapshot,
  collection,
  query,
  where,
  orderBy,
} from 'firebase/firestore'
import { Carousel, Loading, Map } from '../../../components/Shared'
import { Header, Info } from '../../../components/Restaurant'
import { db } from '../../../utils'
import { styles } from './RestaurantScreen.styles'


export function RestaurantScreen(props) {
  const { route } = props
  const [restaurant, setRestaurant] = useState(null)

  const { width } = Dimensions.get('window')

  useEffect(() => {
    setRestaurant(null);
    onSnapshot(doc(db, 'restaurants', route.params.id), (doc) => {
      setRestaurant(doc.data())
    }
    )
  }
    , [route.params.id])

  if (!restaurant) {
    return <Loading show text='Cargando restaurantes' />
  }


  return (
    <ScrollView styles={styles.content}>
      <View style={{ flexDirection: 'column' }}>
        <Carousel arrayImages={restaurant.images} height={250} width={width} />
        <Header restaurant={restaurant} />
        <Info restaurant={restaurant} />
      </View>
    </ScrollView >
  )
}