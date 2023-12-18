import React from 'react'
import { View, ScrollView } from 'react-native'
import {Text, Image} from "@rneui/base";
import { styles } from './LoginScreen.styles'
import { screen } from "../../../utils";
import { useNavigation } from "@react-navigation/native";
export function LoginScreen() {
  const navigation = useNavigation();

  const goToRegister = () => {
    navigation.navigate(screen.account.register);
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../../../../assets/img/restaurant-logo.png")}
            style={styles.image}
          />
        </View>
        <View style={styles.formContainer}>
          <Text>Login</Text>
        </View>
        <View style={styles.registerContainer}>
          <Text onPress={goToRegister}>Register</Text>
        </View>
      </View>
    </ScrollView>
  )
}