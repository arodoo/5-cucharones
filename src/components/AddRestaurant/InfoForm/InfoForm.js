import React from 'react'
import { View, Text } from 'react-native'
import { Input } from 'react-native-elements'
import { styles } from './InfoForm.styles'


export function InfoForm() {
  return (
    <View style={styles.container}>
      <Input placeholder="Nombre del restaurante" />
      <Input placeholder="Direccion" />
      <Input
        placeholder="Descripcion del restaurante"
        multiline={true}
        inputContainerStyle={styles.textArea} />
    </View>
  )
}