import { View } from 'react-native'
import React, { useState } from 'react'
import { Button } from '@rneui/base'
import { InfoUser } from '../../../components/Account'
import {LoadingModal} from "../../../components"
import { getAuth, signOut } from 'firebase/auth'
import { styles } from './UserLoggedScreen.styles'

export function UserLoggedScreen() {

  const [loading, setLoading] = useState(false)
  const [loadingText, setLoadingText] = useState("")

  const logout = async () => {
    await signOut(getAuth())
  }
  
  return (
    <View>
      <InfoUser setLoading={setLoading} setLoadingText={setLoadingText} />

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