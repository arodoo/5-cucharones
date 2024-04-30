import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { AppNavigation } from "./src/navigation/AppNavigation";
import Toast from "react-native-toast-message";

import { initFirebase } from "./src/utils";

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


