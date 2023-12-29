import React, { useEffect } from "react";
import { View, Alert } from "react-native";
import { Avatar, Text } from "@rneui/base";
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { styles } from "./InfoUser.styles";
// Importar las funciones de expo-media-library
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from 'expo-media-library';

export function InfoUser() {
    const { uid, photoURL, displayName, email } = getAuth().currentUser;


    // Pedir los permisos de la galería solo una vez cuando se monta el componente
    useEffect(() => {
        checkAndRequestPermissions();
    }, []);

    const checkAndRequestPermissions = async () => {
        // Usar la nueva función requestPermissionsAsync
        const { status } = await MediaLibrary.requestPermissionsAsync();
        if (status !== "granted") {
            Alert.alert(
                "Error al acceder a la galería",
                "Necesitas conceder los permisos de acceso a la galería para cambiar tu avatar",
                [{ text: "OK" }]
            );
        }
    };

    const selectImage = async () => {
        const storage = getStorage();

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
        });
        if (!result.canceled) {
            console.log("URI:", result.assets[0].uri);
            uploadImage(result.assets[0].uri, storage);
        }
    };

    const uploadImage = async (uri, storage) => {
        try {
            // Usar const para las variables que no cambian de valor
            const response = await fetch(uri);
            const blob = await response.blob();

            const refStorage = ref(storage, `avatar/${uid}`);

            // Usar async/await en lugar de then/catch
            await uploadBytes(refStorage, blob);
            console.log("Subida exitosa:");
            Alert.alert(
                "Tu perfil ha sido actualizado",
                "",
                [{ text: "OK" }]
            );
        } catch (error) {
            // Usar Alert en lugar de Toast
            console.error("Error al subir la imagen:", error.code, error.message);
            Alert.alert(
                "Error al actualizar tu perfil",
                "",
                [{ text: "OK" }]
            );
        }
    };

    return (
        <View style={styles.content}>
            <Avatar
                size="large"
                rounded
                icon={{ type: "material", name: "person" }}
                containerStyle={styles.avatar}
                source={photoURL ? { uri: photoURL } : null}
            >
                <Avatar.Accessory
                    size={24}

                    onPress={selectImage}
                />
            </Avatar>

            <View>
                <Text style={styles.displayName}>{displayName || "Anónimo"}</Text>
                <Text style={styles.email}>{email}</Text>
            </View>
        </View>
    );
}





/* import React from 'react'
import { View } from 'react-native'
import { Avatar, Text } from '@rneui/base'
import * as ImagePicker from 'expo-image-picker'
import { getAuth } from 'firebase/auth'
import { getStorage, ref, uploadBytes } from 'firebase/storage'
import Toast from 'react-native-toast-message'
import { styles } from './InfoUser.styles'

export function InfoUser() {

    const { uid, photoURL, displayName, email } = getAuth().currentUser

    const changeAvatar = async () => {
        const storage = getStorage()

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4]
        })

        if (!result.canceled) {
            console.log("URI: ", result.uri)
            uploadImage(result.uri, storage)
        }
    }

    const uploadImage = async (uri, storage) => {
        try {
            const response = await fetch(uri)
            const blob = await response.blob()

            const refStorage = ref(storage, `avatar/${uid}`)


            storage.uploadBytes(refStorage, blob)
                .then((snapshot) => {
                    Toast.show({
                        type: 'success',
                        text1: 'Avatar actualizado',
                        text2: 'Se ha actualizado tu avatar correctamente'
                    })
                })
        } catch (error) {
            console.log("Error al subir la imagen: ", error.message)
            Toast.show({
                type: 'error',
                position: 'bottom',
                text1: 'Error al subir la imagen'
            })
        }
    }


    return (
        <View style={styles.content}>

            <Avatar
                size="large"
                rounded
                icon={{ type: 'material', name: 'person' }}
                containerStyle={styles.avatar}
                source={photoURL ? { uri: photoURL } : null}
            >
                <Avatar.Accessory
                    size={24}
                    onPress={changeAvatar}
                />
            </Avatar>

            <View>
                <Text style={styles.displayName}>{displayName || "Anónimo"}</Text>
                <Text style={styles.email}>{email}</Text>
            </View>
        </View>
    )
} */