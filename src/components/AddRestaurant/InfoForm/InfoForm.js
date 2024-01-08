import React from 'react'
import { View, Text } from 'react-native'
import { Input } from 'react-native-elements'
import { styles } from './InfoForm.styles'


export function InfoForm(props) {

  const { formik } = props

  return (
    <View style={styles.container}>
      <Input placeholder="Nombre del restaurante"
        onChangeText={(text) => formik.setFieldValue('name', text)}
        errorMessage={formik.errors.name}
      />
      <Input placeholder="Direccion"
        onChangeText={(text) => formik.setFieldValue('address', text)}
        errorMessage={formik.errors.address}
      />
      <Input placeholder='Teléfono'
        onChangeText={(text) => formik.setFieldValue('phone', text)}
        errorMessage={formik.errors.phone}
      />
      <Input placeholder='Email'
        onChangeText={(text) => formik.setFieldValue('email', text)}
        errorMessage={formik.errors.email}
      />
      <Input
        placeholder="Descripcion del restaurante"
        onChangeText={(text) => formik.setFieldValue('description', text)}
        errorMessage={formik.errors.description}
        multiline={true}
        inputContainerStyle={styles.textArea}
      />
    </View>
  )
}