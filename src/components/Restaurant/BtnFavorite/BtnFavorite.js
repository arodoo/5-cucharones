import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Icon } from 'react-native-elements'
import { getAuth } from 'firebase/auth'
import { doc, setDoc, getDocs, query, where, collection, deleteDoc } from 'firebase/firestore'
import uuid from 'react-native-uuid'
import { size } from 'lodash'
import { db } from '../../../utils'
import { styles } from './BtnFavorite.styles'

export function BtnFavorite(props) {
  const { idRestaurant } = props
  const [isFavorite, setIsFavorite] = useState(false)
  const [isReload, setIsReload] = useState(false)
  const auth = getAuth()

  useEffect(() => {
    (async () => {
      const response = await getFavorites()
      if (size(response) > 0) {
        setIsFavorite(true)
      }
    })()
  }, [idRestaurant, isReload])

  const onReload = () => {
    setIsReload(!isReload)
  }

  const getFavorites = async () => {
    const q = query(collection(db, 'favorites'),
      where('idRestaurant', '==', idRestaurant),
      where('idUser', '==', auth.currentUser.uid));
    const response = await getDocs(q);
    return response.docs;
  }

  const removeFavorite = async () => {
    const response = await getFavorites()
    response.forEach(async (doc) => {
      await deleteDoc(doc.ref).then(() => {
        setIsFavorite(false)
        onReload()
      })
    })
  }


  const addFavorite = async () => {
    try {
      const idFavorite = uuid.v4()
      const data = {
        id: idFavorite,
        idRestaurant: idRestaurant,
        idUser: auth.currentUser.uid
      }
      await setDoc(doc(db, 'favorites', idFavorite), data).then(() => {
        onReload()
      });
    } catch (error) {

    }
  }
  return (
    <View style={styles.content}>
      <Icon
        type='material'
        name={isFavorite ? 'favorite' : 'favorite-border'}
        color={isFavorite ? '#f00' : '#DCDCDC'}
        size={40}

        onPress={isFavorite ? removeFavorite : addFavorite}
      />
    </View>
  )
}