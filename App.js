import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { AppNavigation } from "./src/navigation/AppNavigation";
import {initFirebase} from "./src/utils";
import { LogBox } from 'react-native';

LogBox.ignoreAllLogs(true);
export default function App() {
  return (
    <>
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>
    </>
  );
}


