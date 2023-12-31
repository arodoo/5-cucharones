import React, { useEffect, useState } from "react";
import { View, Alert } from "react-native";
import { Avatar, Text } from "react-native-elements";
import Toast from 'react-native-toast-message';
import { getAuth, updateProfile } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { styles } from "./InfoUser.styles";
// Importar las funciones de expo-media-library
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from 'expo-media-library';

export function InfoUser(props) {

    const { setLoading, setLoadingText } = props;
    const { uid, photoURL, displayName, email } = getAuth().currentUser;
    const [avatar, setAvatar] = useState(photoURL)

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
            //console.log("URI:", result.assets[0].uri);
            uploadImage(result.assets[0].uri, storage);
        }
    };

    const uploadImage = async (uri, storage) => {
        setLoadingText("Subiendo imagen...");
        setLoading(true);
        try {
            // Usar const para las variables que no cambian de valor
            const response = await fetch(uri);
            const blob = await response.blob();

            const refStorage = ref(storage, `avatar/${uid}`);

            // Usar async/await en lugar de then/catch
            await uploadBytes(refStorage, blob).then((snapshot) => {
                updatePhotoURL(snapshot.metadata.fullPath);
            });

            Toast.show({
                type: 'success',
                text1: 'Avatar actualizado',
                text2: 'Se ha actualizado tu avatar correctamente'
            })
        } catch (error) {
            // Usar Alert en lugar de Toast
            console.error("Error al subir la imagen:", error.code, error.message);
            Toast.show({
                type: 'error',
                position: 'bottom',
                text1: 'Error al subir la imagen'
            })
        }
    };

    const updatePhotoURL = async (imagePath) => {
        const storage = getStorage();
        const imageRef = ref(storage, imagePath);

        const imageURL = await getDownloadURL(imageRef);

        const user = getAuth().currentUser;
        updateProfile(user, { photoURL: imageURL })

        setAvatar(imageURL);

        setLoading(false);
        setLoadingText("");
    };

    return (
        <View style={styles.content}>
            <Avatar
                size="large"
                rounded
                //icon={{ type: "material", name: "person" }}
                containerStyle={styles.avatar}
                source={photoURL ? { uri: avatar } : null}
                imageProps={{ resizeMode: "cover" }}
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

