import React, {useState, forwardRef, useImperativeHandle} from 'react'
import { View, Text } from 'react-native'
import { Input } from 'react-native-elements'
import { MapForm } from '../MapForm'
import { styles } from './InfoForm.styles'


 function InfoForm(props, ref) {

  const [showMap, setShowMap] = useState(false)
  const { formik } = props
  const [iconColor, setIconColor] = useState('#c2c2c2')
  const onOpenCloseMap = () => { setShowMap(!showMap) }

  useImperativeHandle(ref, () => ({
    getColorIconMap() {
      if (formik.errors.location) {
        setIconColor('#ff0000')
      } else if (formik.values.location.latitude !== 0) {
        setIconColor('#00ff00')
      } else {
        setIconColor('#c2c2c2')
      }
    }
  }));


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
          color: iconColor,
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

      <MapForm show={showMap}
       close={onOpenCloseMap}
        formik={formik}
        setIconColor={setIconColor}
        />
    </>
  )
}

export default forwardRef(InfoForm)
