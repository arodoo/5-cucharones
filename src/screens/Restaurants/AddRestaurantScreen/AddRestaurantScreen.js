import React, { useRef } from 'react'
import { ScrollView } from 'react-native'
import { Button } from 'react-native-elements'
import { useFormik } from 'formik'
import Toast from 'react-native-toast-message'
import { useNavigation } from '@react-navigation/native'
import uuid from 'react-native-uuid';
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../../../utils/firebase'
import { initialValues, validationSchema } from './AddRestaurantScreen.data'
import InfoForm from '../../../components/Restaurants/AddRestaurant/InfoForm/InfoForm'
import { UploadImagesForm } from '../../../components/Restaurants/AddRestaurant'
import { PrincipalImage } from '../../../components/Restaurants/AddRestaurant'
import { styles } from './AddRestaurantScreen.styles'

export function AddRestaurantScreen() {

  const infoFormRef = useRef();
  const navigation = useNavigation()

  const handleSubmit = () => {
    formik.handleSubmit()
    
    if (formik.errors.location) {
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
    onSubmit: async (formData) => {
      try {
        const newData = formData;
        newData.id = uuid.v4();
        newData.createdAt = new Date();

        const myDb = doc(db, "restaurants", newData.id);
        await setDoc(myDb, newData).then(() => {
          Toast.show({
            text1: 'Restaurante creado',
            text2: 'El restaurante se ha creado correctamente',
            type: 'success'
          })
          navigation.goBack()
        })

      }
      catch (error) {
        Toast.show({
          text1: 'Error',
          text2: 'Ha ocurrido un error al crear el restaurante',
          type: 'error'
        })
      }
    }
  })

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <PrincipalImage formik={formik} />
      <InfoForm formik={formik} ref={infoFormRef} />
      <UploadImagesForm formik={formik} />
      <Button
        title="Crear restaurante"
        buttonStyle={styles.btnAddRestaurant}
        onPress={handleSubmit}
        loading={formik.isSubmitting}
      />
    </ScrollView>
  )
}