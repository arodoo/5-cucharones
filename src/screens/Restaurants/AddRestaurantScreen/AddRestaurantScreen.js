import React, {useRef} from 'react'
import { View } from 'react-native'
import { Button } from 'react-native-elements'
import InfoForm from '../../../components/Restaurants/AddRestaurant/InfoForm/InfoForm'
import { useFormik } from 'formik'
import Toast from 'react-native-toast-message'
import { initialValues, validationSchema } from './AddRestaurantScreen.data'
import { styles } from './AddRestaurantScreen.styles'

export function AddRestaurantScreen() {

  const infoFormRef = useRef();

  const handleSubmit = () => {
    formik.handleSubmit()
    if(formik.errors.location) {
      Toast.show({
        text1: 'Ubicación',
        text2: 'Es necesario seleccionar la ubicación del restaurante',
        type: 'error'
      })
      infoFormRef.current.getColorIconMap(formik)
      return
    }
  }

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
      <InfoForm formik={formik} ref={infoFormRef} />
      <Button
        title="Crear restaurante"
        buttonStyle={styles.btnAddRestaurant}
        onPress={handleSubmit}
       // loading={formik.isSubmitting}
      />
    </View>
  )
}