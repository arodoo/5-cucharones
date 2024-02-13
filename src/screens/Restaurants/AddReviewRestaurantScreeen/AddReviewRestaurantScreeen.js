import React from 'react'
import { useState, useEffect } from 'react';
import { View } from 'react-native'
import { Input, AirbnbRating, Button } from 'react-native-elements';
import {
  doc,
  onSnapshot,
} from 'firebase/firestore'
import { db } from '../../../utils'
import { styles } from './AddReviewRestaurantScreeen.styles';

export function AddReviewRestaurantScreeen(props) {
  const { route } = props;
  const [restaurant, setRestaurant] = useState(null)


  //console.log(route.params.idRestaurant);
  return (
    <View>
      <View style={styles.content}>
        <View>
          <Input
            placeholder="Titulo"
            containerStyle={styles.input}
          />
          <Input
            placeholder="Comentario..."
            multiline
            inputContainerStyle={styles.comment}
          />
        </View>
        <View style={styles.imgContent}>

        </View>
        <View style={styles.ratingContent}>
          <AirbnbRating
            count={5}
            reviews={["Malo", "Regular", "Normal", "Muy Bueno", "Excelente"]}
            defaultRating={0}
            size={35}
            onFinishRating={(value) => console.log(value)}
          />
        </View>
      </View>
      <View style={styles.btnContainer}>
        <Button
          title="Enviar Comentario"
          buttonStyle={styles.btn}
        />
      </View>
    </View>
  )
}
