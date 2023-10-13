import * as Yup from 'yup';

export const registerSchema = Yup.object({
  name: Yup
    .string('Nombre inválido')
    .min(2, 'El nombre debe tener mínimo 2 caracteres')
    .required('El nombre es requerido'),
  email: Yup
    .string('Correo inválido')
    .email('Correo inválido')
    .required('El correo es requerido'),
  password: Yup
    .string('Contraseña inválida')
    .min(8, 'La contraseña debe tener mínimo 8 caracteres')
    .required('La contraseña es requerida'),
  'repeat-password': Yup.string()
    .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir')
    .required('Por favor, repite la contraseña'),
  avatar: Yup
    .mixed(),
  city: Yup
    .string('Ciudad inválida'),
  phone: Yup
    .string('Teléfono inválido')
    .required('El teléfono es requerido'),
});

export const loginSchema = Yup.object({
  email: Yup
    .string('Correo inválido')
    .email('Correo inválido')
    .required('El correo es requerido'),
  password: Yup
    .string('Contraseña inválida')
    .min(8, 'La contraseña debe tener mínimo 8 caracteres')
    .required('La contraseña es requerida')
});

export const editProfileSchema = Yup.object({
  name: Yup
    .string('Nombre inválido')
    .min(2, 'El nombre debe tener mínimo 2 caracteres')
    .required('El nombre es requerido'),
  avatar: Yup
    .string('Imagen inválida'),
  city: Yup
    .string('Ciudad inválida'),
  phone: Yup
    .string('Teléfono inválido')
    .required('El teléfono es requerido'),
});

