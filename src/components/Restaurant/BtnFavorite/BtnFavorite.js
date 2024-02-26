import React from 'react'
import { View } from 'react-native'
import { Icon } from 'react-native-elements'
import { getAuth } from 'firebase/auth'
import { doc, setDoc, getDoc, query, where, collection, deleteDoc } from 'firebase/firestore'
import uuid from 'react-native-uuid'
import { db } from '../../../utils'
import { styles } from './BtnFavorite.styles'

export function BtnFavorite(props) {
  const { idRestaurant } = props
  const auth = getAuth()

  const addFavorite = async () => {
    try {
      const idFavorite = uuid.v4()
      const data = {
        id: idFavorite,
        idRestaurant: idRestaurant,
        idUser: auth.currentUser.uid
      }
      await setDoc(doc(db, 'favorites', idFavorite), data);
    } catch (error) {
      
    }
  }
  return (
    <View style={styles.content}>
      <Icon
        type='material'
        name='favorite'
        color='#DCDCDC'
        size={40}

        onPress={() => addFavorite()}
      />
    </View>
  )
}