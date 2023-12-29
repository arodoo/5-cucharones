import { View } from 'react-native'
import React from 'react'
import { Button } from '@rneui/base'
import { InfoUser } from '../../../components/Account'
import { getAuth, signOut } from 'firebase/auth'
import { styles } from './UserLoggedScreen.styles'

export function UserLoggedScreen() {

  const logout = async () => {
    await signOut(getAuth())
  }
  
  return (
    <View>
      <InfoUser />

      <Button
        title={'Cerrar sesión'}
        buttonStyle={styles.button}
        onPress={logout}
        titleStyle={styles.buttonTitle}
      />
    </View>
  )
}