import React from 'react'
import { View } from 'react-native'
import { Image, Icon, Avatar, Text } from 'react-native-elements'
import * as ImagePicker from 'expo-image-picker'
import {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL
} from 'firebase/storage'
import { styles } from './UploadImagesForm.styles'

export function UploadImagesForm(props) {
    const { formik } = props

    const openGallery = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1

        })
        if (!result.canceled) {
            const asset  = result.assets[0]
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
            console.log(snapshot)
        })
    };

    return (
        <>
            <View style={styles.viewImage}>
                <Icon
                    type="material"
                    name="photo"
                    color="#7a7a7a"
                    containerStyle={styles.containerIcon}
                    onPress={openGallery}
                />
            </View>
        </>
    )
}