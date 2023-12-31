import React from 'react'
import { View, ScrollView } from 'react-native'
import { Text, Image } from "react-native-elements";
import { styles } from './LoginScreen.styles'
import { screen } from "../../../utils";
import { LoginForm } from "../../../components/Auth";
import { useNavigation } from "@react-navigation/native";

export function LoginScreen() {
  const navigation = useNavigation();

  const goToRegister = () => {
    navigation.navigate(screen.account.register);
  }

  return (
    <ScrollView>
      <View>
        <View>
          <Image
            source={require("../../../../assets/img/restaurant-logo.png")}
            style={styles.image}
          />
        </View>
        <View >
          <LoginForm />
        </View>
        <View >
          <Text style={styles.textRegister}>¿Aún no te has registrado?</Text>
          <Text
            style={styles.btnRegister}
            onPress={goToRegister}
          >
            Regístrate
          </Text>
        </View>
      </View>
    </ScrollView>
  )
}