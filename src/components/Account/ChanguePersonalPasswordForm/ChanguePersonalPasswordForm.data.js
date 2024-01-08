import * as Yup from 'yup';

export function initialValues() {
    return {
        currentPassword: '',
        newPassword: '',
        repeatNewPassword: ''
    }
}

export function validationSchema() {
    return Yup.object({
        currentPassword: Yup
            .string()
            .required('La contraseña es obligatoria'),
        newPassword: Yup.
            string()
            .required('La contraseña es obligatoria')
            .matches(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/, 'La contraseña debe tener al menos 6 caracteres y un número'),
        repeatNewPassword: Yup.
            string()
            .required('La contraseña es obligatoria')
            .oneOf([Yup.ref('newPassword')], 'Las contraseñas no coinciden')
    })
}