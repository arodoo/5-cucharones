import React from 'react'
import { View } from 'react-native'
import { Button, Input } from 'react-native-elements'
import {useFormik} from 'formik'
import Toast from 'react-native-toast-message'
import {getAuth, updateProfile} from 'firebase/auth'
import { initialValues, validationSchema } from './ChangueDisplayNameForm.data'
import { styles } from './ChangueDisplayNameForm.styles'

export function ChangueDisplayNameForm(props) {

  const {  onReload } = props;
  const { onCloseOpenModal } = props;

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formData) => {
      try {
        const {displayName} = formData;
        const currentUser = getAuth().currentUser;
        await updateProfile(currentUser, {displayName}).finally(() => {
          onReload();
          onCloseOpenModal(false);
        })
        /* await updateProfile(getAuth().currentUser, {displayName}) */
        Toast.show({
          type: "success",
          position: "bottom",
          text1: "Nombre y apellidos actualizados",
        })

      } catch (error) {
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Error al actualizar el nombre y apellidos",
        })
      }
    }
  })

  return (
    <View style={styles.content}>
      <Input
        placeholder="Nombre y apellidos"
        rightIcon={{
          type: "material-community",
          name: "account-circle-outline",
          color: "#c2c2c2"
        }}
        onChangeText={(text) => formik.setFieldValue("displayName", text)}
        errorMessage={formik.errors.displayName}
      />
      <Button
        title="Cambiar nombre"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </View>
  )
}