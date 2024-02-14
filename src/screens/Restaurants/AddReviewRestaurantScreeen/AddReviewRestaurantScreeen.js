import React from 'react'
import { useState, useEffect } from 'react';
import { View } from 'react-native'
import { Loading } from '../../../components/Shared';
import { Input, AirbnbRating, Button, Image } from 'react-native-elements';
import { useFormik } from 'formik';
import { initialValues, validationSchema } from './AddReviewRestaurantScreeen.data';
import {
  doc,
  onSnapshot,
} from 'firebase/firestore'
import { db } from '../../../utils'
import { styles } from './AddReviewRestaurantScreeen.styles';

export function AddReviewRestaurantScreeen(props) {
  const { route } = props;
  const [restaurant, setRestaurant] = useState(null)
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  useEffect(() => {
    setRestaurant(null);
    onSnapshot(doc(db, 'restaurants', route.params.idRestaurant), (doc) => {
      setRestaurant(doc.data())
    }
    )
  }
    , [route.params.idRestaurant])

  if (!restaurant) {
    return <Loading show text='Cargando restaurantes' />
  }
  
  const getRestaurantImage = () => {
    return restaurant.images[0];
  }



  return (
    <View>
      <View style={styles.content}>
        <View>
          <Input
            placeholder="Titulo"
            onChangeText={(text) => formik.setFieldValue('title', text)}
            errorMessage={formik.errors.title}
            containerStyle={styles.input}
          />
          <Input
            placeholder="Comentario..."
            onChangeText={(text) => formik.setFieldValue('comment', text)}
            errorMessage={formik.errors.comment}
            multiline
            inputContainerStyle={styles.comment}
          />
        </View>
        <View style={styles.imgContent}>
          <Image
            source={{ uri: getRestaurantImage() }}
            style={{ width: 110, height: 110 }}
          />
        </View>
        <View style={styles.ratingContent}>
          <AirbnbRating
            count={5}
            reviews={["Malo", "Regular", "Normal", "Muy Bueno", "Excelente"]}
            defaultRating={formik.values.rating}
            size={35}
            onFinishRating={(value) => formik.setFieldValue('rating', value)}
          />
        </View>
      </View>
      <View style={styles.btnContainer}>
        <Button
          title="Enviar Comentario"
          onPress={formik.handleSubmit}
          loading={formik.isSubmitting}
          buttonStyle={styles.btn}
        />
      </View>
    </View>
  )
}
