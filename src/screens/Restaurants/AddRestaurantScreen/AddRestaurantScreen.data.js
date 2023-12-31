import * as Yup from 'yup';

export function initialValues() {
  return {
    name: '',
    address: '',
    phone: '',
    email: '',
    description: '',
  };
}

export function validationSchema() {
  return Yup.object({
    name: Yup.string().required('El nombre es obligatorio'),
    address: Yup.string().required('La direccion es obligatoria'),
    phone: Yup.string().required('El telefono es obligatorio').matches(/^\+?[0-9]+$/, 'El telefono solo puede contener numeros y el signo +'),
    email: Yup.string().required('El correo es obligatorio').email('El email no es valido'),
    description: Yup.string().required('La descripcion es obligatoria'),
  });
}