import React from 'react'
import { View } from 'react-native'
import { Button } from 'react-native-elements'
import {InfoForm} from '../../../components/Restaurants/AddRestaurant'
import { useFormik } from 'formik'
import { initialValues, validationSchema } from './AddRestaurantScreen.data'
import { styles } from './AddRestaurantScreen.styles'

export function AddRestaurantScreen() {

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: values => {
      console.log(values)
    }
  })

  return (
    <View>
      <InfoForm formik={formik} />
      <Button
        title="Crear restaurante"
        buttonStyle={styles.btnAddRestaurant}
        onPress={formik.handleSubmit}
       // loading={formik.isSubmitting}
      />
    </View>
  )
}