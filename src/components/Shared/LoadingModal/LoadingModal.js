import { Text } from 'react-native';
import React from 'react';
import {View, ActivityIndicator } from "react-native";
import {styles} from "./LoadingModal.styles";
import { Overlay } from 'react-native-elements';

export function LoadingModal(props) {
    const {show, text} = props;

  return (
    <Overlay isVisible = {show} overlayStyle = {styles.overlay}>
        <View style = {styles.view}>
            <ActivityIndicator size = "large" color = "#00a680" />
            {text && <Text style = {styles.text}>{text}</Text>}
        </View>
    </Overlay>
  )
}

LoadingModal.defaultProps = {
    text: "Cargando...",
    show: false,
}