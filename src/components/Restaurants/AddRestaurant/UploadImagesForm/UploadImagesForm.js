import React, { useState } from 'react'
import { View, ScrollView, Alert } from 'react-native'
import { Image, Icon, Avatar, Text } from 'react-native-elements'
import * as ImagePicker from 'expo-image-picker'
import { map } from 'lodash';
import {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL
} from 'firebase/storage'
import { LoadingModal } from '../../../Shared'
import { styles } from './UploadImagesForm.styles'

export function UploadImagesForm(props) {
    const { formik } = props
    const [isLoading, setIsLoading] = useState(false)

    const openGallery = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1

        })
        if (!result.canceled) {
            setIsLoading(true)
            const asset = result.assets[0]
            const uri = asset.uri
            uploadImage(uri)
        }
    }

    const uploadImage = async (uri) => {
        const response = await fetch(uri)
        const blob = await response.blob()

        const storage = getStorage()
        const imageRef = ref(storage, `restaurants/${formik.values.name}-${Date.now()}`)

        uploadBytes(imageRef, blob).then(async (snapshot) => {
            updatePhotosRestaurant(snapshot.metadata.fullPath)
        })
        setIsLoading(false)
    };



    const updatePhotosRestaurant = async (imagePath) => {
        const storage = getStorage()
        const imageRef = ref(storage, imagePath)
        await getDownloadURL(imageRef).then((url) => {
            formik.setFieldValue('images', [...formik.values.images, url])
        })
    }

    const removeImage = (image) => {
        Alert.alert(
            "Eliminar imagen",
            "¿Estás seguro de que quieres eliminar la imagen?",
            [
                {
                    text: "No",
                    style: "cancel"
                },
                {
                    text: "Sí",
                    onPress: () => {
                        formik.setFieldValue(
                            "images",
                            formik.values.images.filter(
                                (imageUrl) => imageUrl !== image
                            )
                        )
                    }
                }
            ],
            { cancelable: false }
        )
    }

    return (
        <>
            <ScrollView style={styles.viewImage} horizontal>
                <Icon
                    type="material"
                    name="photo"
                    color="#7a7a7a"
                    containerStyle={styles.containerIcon}
                    onPress={openGallery}
                />
                {map(formik.values.images, (imageRestaurant, index) => (
                    <Avatar
                        key={index}
                        source={{ uri: imageRestaurant }}
                        style={styles.imageStyle}
                        onPress={() => removeImage(imageRestaurant)}
                    />
                ))}
                <Text style={styles.textImage}>Añade fotos del restaurante</Text>
            </ScrollView>
            <Text style={styles.error}>{formik.errors.images}</Text>
            <LoadingModal show={isLoading} text="Subiendo imagen" />
        </>
    )
}