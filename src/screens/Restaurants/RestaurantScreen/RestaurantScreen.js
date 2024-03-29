import React, { useEffect, useState } from 'react'
import { ScrollView, Dimensions, View } from 'react-native'
import {
  doc,
  onSnapshot,
} from 'firebase/firestore'
import { Carousel, Loading, Map } from '../../../components/Shared'
import { Header, Info, BtnReviewForm } from '../../../components/Restaurant'
import { db } from '../../../utils'
import { Reviews, BtnFavorite } from '../../../components/Restaurant'
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
        <BtnReviewForm idRestaurant={restaurant.id} />
        <Reviews idRestaurant={route.params.id} />
        { <BtnFavorite idRestaurant={route.params.id} />}
      </View>
    </ScrollView >
  )
}