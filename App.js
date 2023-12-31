import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { AppNavigation } from "./src/navigation/AppNavigation";
import { LogBox } from 'react-native';
import Toast from "react-native-toast-message";

import { initFirebase } from "./src/utils";


LogBox.ignoreAllLogs(true);
export default function App() {
  return (
    <>
      <NavigationContainer>
        <AppNavigation />
        <Toast></Toast>
      </NavigationContainer>


    </>
  );
}


