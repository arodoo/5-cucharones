import React from 'react'
import { View } from 'react-native'
import { Button, Input } from 'react-native-elements'
import {useFormik} from 'formik'
import { initialValues, validationSchema } from './ChangueDisplayNameForm.data'
import { styles } from './ChangueDisplayNameForm.styles'

export function ChangueDisplayNameForm() {
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: (formData) => {
      console.log(formData)
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