import { View } from 'react-native'
import React, { useState } from 'react'
import { Button, Input, Icon } from 'react-native-elements'
import { initialValues, validationSchema } from './LoginForm.data';
import { useNavigation } from '@react-navigation/native'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../../utils/firebase'
import { screen } from '../../../utils'
import Toast from 'react-native-toast-message'
import { useFormik } from 'formik';
import { styles } from './LoginForm.styles'

export function LoginForm() {

  const [showPassword, setShowPassword] = useState(false)

  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const navigation = useNavigation();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        await signInWithEmailAndPassword(
          auth,
          formValue.email,
          formValue.password
        ).then((userCredentials) => {
          const user = userCredentials.user
          Toast.show({
            type: 'success',
            text1: 'Bienvenido',
            text2: user.email,
            visibilityTime: 3000,
            autoHide: true,
            topOffset: 30,
            bottomOffset: 40,
          })
          navigation.navigate(screen.account.account)
        })
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: error.message,
          visibilityTime: 3000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
        })
      }
    }
  })


  return (
    <View style={styles.content}>
      <Input
        placeholder="Correo electrónico"
        containerStyle={styles.input}
        rightIcon={
          <Icon
            type="material-community"
            name="at"
            iconStyle={styles.icon}
          />
        }
        onChangeText={(text) => formik.setFieldValue('email', text)}
        errorMessage={formik.errors.email}
      />
      <Input
        placeholder="Contraseña"
        containerStyle={styles.input}
        password={true}
        secureTextEntry={!showPassword}
        rightIcon={
          <Icon
            type="material-community"
            name={showPassword ? 'eye-off-outline' : 'eye-outline'}
            onPress={handleShowPassword}
            iconStyle={styles.icon}
          />
        }
        onChangeText={(text) => formik.setFieldValue('password', text)}
        errorMessage={formik.errors.password}
      />
      <Button
        title={"Iniciar sesión"}
        buttonStyle={styles.btnRegister}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </View>
  )
}
