// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { ReactNativeAsyncStorage } from '@react-native-async-storage/async-storage';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBz5qq7BjxS6q8gv_zYl4fHfu7PuckIL8g",
    authDomain: "cucharones-73d7f.firebaseapp.com",
    projectId: "cucharones-73d7f",
    storageBucket: "cucharones-73d7f.appspot.com",
    messagingSenderId: "613840435854",
    appId: "1:613840435854:web:b7850d7c087133e7e0a7df"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});