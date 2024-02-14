import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native'
import { Input, AirbnbRating, Button, Image } from 'react-native-elements';
import { useFormik } from 'formik';
import Toast from 'react-native-toast-message';
import uuid from 'react-native-uuid';
import {map, mean} from 'lodash';
import { Loading } from '../../../components/Shared';
import { initialValues, validationSchema } from './AddReviewRestaurantScreeen.data';
import {
  doc,
  onSnapshot,
  setDoc,
  collection,
  query,
  where,
  updateDoc,
} from 'firebase/firestore'
import { db } from '../../../utils'
import { getAuth } from 'firebase/auth';
import { styles } from './AddReviewRestaurantScreeen.styles';

export function AddReviewRestaurantScreeen(props) {
  const { route } = props;
  const [restaurant, setRestaurant] = useState(null)
  const navigation = useNavigation()

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (values) => {
      try {
        const user = getAuth();
        const newData = {
          idDoc: uuid.v4(),
          idUser: user.currentUser.uid,
          avatar: user.currentUser.photoURL,
          idRestaurant: route.params.idRestaurant,
          title: values.title,
          comment: values.comment,
          rating: values.rating,
          createdAt: new Date(),
        }
        await setDoc(doc(db, 'reviews', newData.idDoc), newData).then(() => {
          updateRestaurantRating()
        })
      } catch (error) {
        Toast.show({
          text1: 'Error',
          text2: 'Ha ocurrido un error al enviar el comentario',
          type: 'error',
          position: 'bottom',
        })
      }
    },
  });

  const updateRestaurantRating = async () => {
    const q = query(
      collection(db, 'reviews'),
      where('idRestaurant', '==', route.params.idRestaurant)
    );
    onSnapshot(q, async (snapshot) => {
      const reviews = snapshot.docs;
      const reviewsArray = map(reviews, (review) => review.data().rating);
      const media = mean(reviewsArray);
      const restaurantRef = doc(db, 'restaurants', route.params.idRestaurant);

      await updateDoc(restaurantRef, {
        rating: media,
      }).finally(() =>
        Toast.show({
          text1: 'Comentario enviado',
          text2: '¡Gracias por tu comentario!',
          type: 'success',
          position: 'bottom',
        })
      );
      navigation.goBack();
    });
  }

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
