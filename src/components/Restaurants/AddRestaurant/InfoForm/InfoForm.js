import React, {useState} from 'react'
import { View, Text } from 'react-native'
import { Input } from 'react-native-elements'
import { MapForm } from '../MapForm'
import { styles } from './InfoForm.styles'


export function InfoForm(props) {

  const [showMap, setShowMap] = useState(false)
  const { formik } = props

  const onOpenCloseMap = () => { setShowMap(!showMap) }

  return (
    <>
    <View style={styles.container}>
      <Input placeholder="Nombre del restaurante"
        onChangeText={(text) => formik.setFieldValue('name', text)}
        errorMessage={formik.errors.name}
      />
      <Input placeholder="Direccion"
        rightIcon={{
          type: 'material-symbols-outline',
          name: 'location-pin',
          color: '#c2c2c2',
          size: 40,
          onPress: onOpenCloseMap
        }}
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

      <MapForm show={showMap} close={onOpenCloseMap}/>
    </>
  )
}