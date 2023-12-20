import * as Yup from 'yup';

export function initialValues() {
  return {
    email: '',
    password: '',
    repeatPassword: '',
  };
}

export function validationSchema() {
  return Yup.object({
    email: Yup.string()
      .email('El email no es válido')
      .required('El email es requerido'),
    password: Yup.string()
      .required('La contraseña es requerida'),
    repeatPassword: Yup.string()
      .required('La contraseña es requerida')
      .oneOf([Yup.ref('password')], 'Las contraseñas no son iguales')
  });
}
