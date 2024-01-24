import React, { useState } from 'react'
import { View } from 'react-native'
import { Input, Button } from 'react-native-elements'
import { useFormik } from 'formik'
import {
  getAuth,
  updateEmail,
  EmailAuthProvider,
  reauthenticateWithCredential
} from 'firebase/auth'
import Toast from 'react-native-toast-message'
import { initialValues, validationSchema } from './ChangePersonalEmailForm.data'
import { styles } from './ChangePersonalEmailForm.styles'

export function ChangePersonalEmailForm(props) {
  const { onClose, onReload } = props
  const [showPassword, setShowPassword] = useState(false)

  const onShowPassword = () => { setShowPassword(!showPassword) }

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formData) => {
      try {
        const { password } = formData;
        const email = getAuth().currentUser.email;
        const credential = EmailAuthProvider.credential(email, password);
        await reauthenticateWithCredential(getAuth().currentUser, credential);
        await updateEmail(getAuth().currentUser, formData.email);
        onReload();
        onClose(false);
        Toast.show({
          type: "success",
          position: "bottom",
          text1: "Email actualizado",
        })
      } catch (error) {
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Error al actualizar el email",
        })
      }
    }
  })
  return (
    <View>
      <Input
        placeholder="Nuevo email"
        containerStyle={styles.input}
        onChangeText={(text) => formik.setFieldValue("email", text)}
        errorMessage={formik.errors.email}
      />
      <Input
        placeholder="Contraseña"
        containerStyle={styles.input}
        secureTextEntry={showPassword ? false : true}
        rightIcon={{
          type: "material-community",
          name: showPassword ? "eye-off-outline" : "eye-outline",
          color: "#c2c2c2",
          onPress: onShowPassword,
        }}
        onChangeText={(text) => formik.setFieldValue("password", text)}
        errorMessage={formik.errors.password}
      />
      <Button
        title="Cambiar email"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </View>
  )
}