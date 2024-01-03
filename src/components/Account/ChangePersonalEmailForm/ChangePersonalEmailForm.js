import React, { useState } from 'react'
import { View } from 'react-native'
import { Input, Button } from 'react-native-elements'
import { useFormik } from 'formik'
import { initialValues, validationSchema } from './ChangePersonalEmailForm.data'
import { styles } from './ChangePersonalEmailForm.styles'

export function ChangePersonalEmailForm(props) {

  const { onClose, onReload } = props
  const [showPassword, setShowPassword] = useState(false)

  const onShowPassword = () => { setShowPassword(!showPassword) }

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    onSubmit: async (formData) => {
      console.log("Formulario enviado")
      console.log(formData)
    }
  })

  return (
    <View style={styles.content}>
      <Input
        placeholder="Correo electrónico"
        containerStyle={styles.input}
        rightIcon={{
          type: "material",
          name: "email",
          color: "#c2c2c2"
        }}
        onChange={(text) => formik.setFieldValue("email", text)}
        errorMessage={formik.errors.email}
      />
      <Input
        placeholder="Contraseña"
        containerStyle={styles.input}
        secureTextEntry={!showPassword}
        rightIcon={{
          type: "material",
          name: showPassword ? "visibility-off" : "visibility",
          color: "#c2c2c2",
          onPress: onShowPassword
        }}
        onChange={(text) => formik.setFieldValue("password", text)}
        errorMessage={formik.errors.password}
      />

      <Button
        title="Guardar cambios"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </View>
  )
}