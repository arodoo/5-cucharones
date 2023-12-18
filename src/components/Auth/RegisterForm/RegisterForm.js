import { View } from 'react-native'
import React from 'react'
import { Input, Icon, Button } from '@rneui/base'
import { useFormik } from 'formik'
import {initialValues} from "./RegisterForm.data"
import { styles } from './RegisterForm.styles'
export function RegisterForm() {

  const formik = useFormik({
    initialValues: initialValues(),
    onSubmit: (formValue) => {
      console.log(formValue)
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
      />
      <Input
        style={styles.input}
        label="Contraseña"
        placeholder="Contraseña"
        secureTextEntry
        rightIcon={
          <Icon
            type='material-community'
            name='eye-outline'
            iconStyle={styles.icon}
          />
        }
        onChangeText={(text) => formik.setFieldValue('password', text)}
      />
      <Input
        style={styles.input}
        label="Repetir contraseña"
        placeholder="Repetir contraseña"
        secureTextEntry
        rightIcon={
          <Icon
            type='material-community'
            name='eye-outline'
            iconStyle={styles.icon}
          />
        }
        onChangeText={(text) => formik.setFieldValue('repeatPassword', text)}
      />
      <Button
        title="Registrarse"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={formik.handleSubmit}
      />
    </View>
  )
}