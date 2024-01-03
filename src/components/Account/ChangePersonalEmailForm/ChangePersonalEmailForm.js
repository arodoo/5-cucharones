import React, {useState} from 'react'
import { View} from 'react-native'
import { Input, Button } from 'react-native-elements'
import {styles} from './ChangePersonalEmailForm.styles'

export function ChangePersonalEmailForm(props) {

  const { onClose, onReload } = props
  const [showPassword, setShowPassword] = useState(false)

  const onShowPassword = () => { setShowPassword(!showPassword) }

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
      />
    </View>
  )
}