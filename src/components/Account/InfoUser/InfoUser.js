import { View } from 'react-native'
import React from 'react'
import { Avatar, Text } from '@rneui/base'
import { getAuth } from 'firebase/auth'
import { styles } from './InfoUser.styles'

export function InfoUser() {

    const { uid, photoURL, displayName, email } = getAuth().currentUser

    const changeAvatar = () => {
        console.log('changeAvatar')
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
}