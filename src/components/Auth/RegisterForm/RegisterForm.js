import { View } from 'react-native'
import React, { useState } from 'react'
import { Input, Icon, Button } from 'react-native-elements'
import { useFormik } from 'formik'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { useNavigation } from '@react-navigation/native'
import Toast from 'react-native-toast-message'
import { initialValues, validationSchema } from "./RegisterForm.data"
import { screen } from "../../../utils"
import { styles } from './RegisterForm.styles'


export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false)
  const navigation = useNavigation();

  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const auth = getAuth()
        await createUserWithEmailAndPassword(
          auth,
          formValue.email,
          formValue.password
        );
        navigation.navigate(screen.account.account)
      } catch (error) {
        Toast.show({
          type: 'error',
          position: 'bottom',
          text1: 'Error al registrar el usuario',
        })
      }
    }
  })

  return (
    <View style={styles.container}>
      <Input
        style={styles.input}
        label="Email"
        placeholder="Email"
        rightIcon={
          <Icon
            type='material-community'
            name='at'
            iconStyle={styles.icon}
          />
        }
        onChangeText={(text) => formik.setFieldValue('email', text)}
        errorMessage={formik.errors.email}
      />
      <Input
        style={styles.input}
        label="Contraseña"
        placeholder="Contraseña"
        secureTextEntry={!showPassword}
        rightIcon={
          <Icon
            type='material-community'
            name={showPassword ? 'eye-off-outline' : 'eye-outline'}
            iconStyle={styles.icon}
            onPress={handleShowPassword}
          />
        }
        onChangeText={(text) => formik.setFieldValue('password', text)}
        errorMessage={formik.errors.password}
      />
      <Input
        style={styles.input}
        label="Repetir contraseña"
        placeholder="Repetir contraseña"
        secureTextEntry={!showPassword}
        rightIcon={
          <Icon
            type='material-community'
            name={showPassword ? 'eye-off-outline' : 'eye-outline'}
            iconStyle={styles.icon}
            onPress={handleShowPassword}
          />
        }
        onChangeText={(text) => formik.setFieldValue('repeatPassword', text)}
        errorMessage={formik.errors.repeatPassword}
      />
      <Button
        title="Registrarse"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </View>
  )
}