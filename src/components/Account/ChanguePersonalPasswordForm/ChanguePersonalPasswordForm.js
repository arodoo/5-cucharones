import React, { useState } from 'react'
import { View } from 'react-native'
import { Button, Input } from 'react-native-elements'
import { useFormik } from 'formik'
import {
    getAuth,
    updatePassword,
    EmailAuthProvider,
    reauthenticateWithCredential
} from 'firebase/auth'
import Toast from 'react-native-toast-message'
import { initialValues, validationSchema } from './ChanguePersonalPasswordForm.data'
import { styles } from './ChanguePersonalPasswordForm.styles'

export function ChanguePersonalPasswordForm(props) {

    const { onClose } = props

    const [showPassword, setShowPassword] = useState(false)

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formData) => {
            try {
                const currentUser = getAuth().currentUser

                const credentials = EmailAuthProvider.credential(
                    currentUser.email,
                    formData.currentPassword)

                await reauthenticateWithCredential(currentUser, credentials)
                await updatePassword(currentUser, formData.newPassword)
                onClose(false)
                Toast.show({
                    type: "success",
                    position: "bottom",
                    text1: "Contraseña actualizada"
                })
            } catch (error) {
                Toast.show({
                    type: "error",
                    text1: "Error al actualizar contraseña",
                    text2: "Intente más tarde"
                })
                onClose(false)
            }
        }
    })

    return (
        <View style={styles.content}>
            <Input
                placeholder="Contraseña actual"
                containerStyle={styles.input}
                secureTextEntry={!showPassword}
                rightIcon={{
                    type: "material",
                    name: showPassword ? "visibility-off" : "visibility",
                    color: "#c2c2c2",
                    onPress: handleShowPassword
                }}
                onChangeText={(text) => formik.setFieldValue("currentPassword", text)}
                errorMessage={formik.errors.currentPassword}
            />
            <Input
                placeholder="Nueva contraseña"
                containerStyle={styles.input}
                secureTextEntry={!showPassword}
                rightIcon={{
                    type: "material",
                    name: showPassword ? "visibility-off" : "visibility",
                    color: "#c2c2c2",
                    onPress: handleShowPassword
                }}
                onChangeText={(text) => formik.setFieldValue("newPassword", text)}
                errorMessage={formik.errors.newPassword}
            />
            <Input
                placeholder="Repetir nueva contraseña"
                containerStyle={styles.input}
                secureTextEntry={!showPassword}
                rightIcon={{
                    type: "material",
                    name: showPassword ? "visibility-off" : "visibility",
                    color: "#c2c2c2",
                    onPress: handleShowPassword
                }}
                onChangeText={(text) => formik.setFieldValue("repeatNewPassword", text)}
                errorMessage={formik.errors.repeatNewPassword}
            />

            <Button
                title="Cambiar contraseña"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={formik.handleSubmit}
                loading={formik.isSubmitting}
            />
        </View>
    )
}