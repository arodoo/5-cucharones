import { View} from 'react-native';
import React from 'react';
import { Image } from 'react-native-elements';
import { RegisterForm } from '../../../components/Auth';
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view"
import { styles } from './RegisterScreen.styles';


export function RegisterScreen() {
  return (
    <KeyboardAwareScrollView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../../../../assets/img/restaurant-logo.png")}
          style={styles.image}
        />
      </View>
      <View style={styles.formContainer}>
        <RegisterForm />
      </View>
    </KeyboardAwareScrollView>
  )
}