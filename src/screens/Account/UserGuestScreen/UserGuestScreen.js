import { ScrollView, View } from 'react-native';
import React from 'react';
import { Text, Button, Image } from "react-native-elements";
import { styles } from './UserGuestScreen.styles';
import { useNavigation } from '@react-navigation/native';
import { screen } from "../../../utils";

export function UserGuestScreen() {

  const navigation = useNavigation();
  const goToLogin = () => {
    navigation.navigate(screen.account.login)
  }

  return (
    <ScrollView centerContent={true} style={styles.container}>
      <Image
        source={require('../../../../assets/img/restaurant-logo.png')}
        style={styles.img} />
      <Text style={styles.title}>Consulta tu perfil en 5 cucharones</Text>
      <Text style={styles.description}>
        ¿Cómo describirías tu mejor restaurante? Busca y visualiza los mejores restaurantes de una forma sencilla, vota cual te ha gustado más y comenta cómo ha sido tu experiencia.
      </Text>
      <View style={styles.btnContainer}>
        <Button title={"Iniciar sesión"} buttonStyle={styles.btnContainer} onPress={goToLogin}>
        </Button>
      </View>
    </ScrollView>
  )
}