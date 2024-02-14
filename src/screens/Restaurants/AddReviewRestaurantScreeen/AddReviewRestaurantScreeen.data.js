import * as Yup from 'yup';

export function initialValues() {
  return {
    title: '',
    comment: '',
    rating: 1,
  };
}

export function validationSchema() {
  return Yup.object({
    title: Yup.string().required('El titulo es obligatorio'),
    comment: Yup.string().required('El comentario es obligatorio'),
    rating: Yup.number().required(true),
  });
}