import { View } from 'react-native'
import React, { useState } from 'react'
import { Button } from 'react-native-elements'
import { InfoUser, AccountOptions } from '../../../components/Account'
import { LoadingModal } from "../../../components"
import { getAuth, signOut } from 'firebase/auth'
import { styles } from './UserLoggedScreen.styles'
import Toast from 'react-native-toast-message'

export function UserLoggedScreen() {

  const [loading, setLoading] = useState(false)
  const [loadingText, setLoadingText] = useState("")
  const [_, setReload] = useState(false)

  const onReload = () => setReload((prevState) => !prevState)

  const logout = async () => {
    try {
      setLoading(true)
      setLoadingText("Cerrando sesión")
      await signOut(getAuth())
      setLoading(false)
      Toast.show({
        type: 'success',
        text1: 'Sesión cerrada',
        text2: 'Vuelve pronto',
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      })
    } catch (error) {
      setLoading(false)
      Toast.show({
        type: 'error',
        text1: 'Error al cerrar sesión',
        text2: 'Vuelve a intentarlo',
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      })
    }
  }

  return (
    <View>
      <InfoUser setLoading={setLoading} setLoadingText={setLoadingText} />
      <AccountOptions onReload={onReload}></AccountOptions>
      <Button
        title={'Cerrar sesión'}
        buttonStyle={styles.button}
        onPress={logout}
        titleStyle={styles.buttonTitle}
      />

      <LoadingModal show={loading} text={loadingText} />
    </View>
  )
}