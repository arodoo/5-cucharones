import React from 'react'
import { View, Text } from 'react-native'
import { Image } from 'react-native-elements'
import { styles } from './PrincipalImage.styles'

export function PrincipalImage(props) {

    const { formik } = props

    const PrincipalImage = formik.values.images[0]

    return (
        <View style={styles.content}>
            <Image
                source={
                    PrincipalImage
                        ? { uri: PrincipalImage }
                        : require('../../../../../assets/img/noImage.jpg')
                }
                style={styles.image}
            />
        </View>
    )
}