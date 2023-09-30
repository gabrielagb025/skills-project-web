import * as Yup from 'yup';

const baseUserSchema = {
    email: Yup
      .string('Correo inválido')
      .email('Correo inválido')
      .required('El correo es requerido'),
    password: Yup
      .string('Contraseña inválida')
      .min(8, 'La contraseña debe tener mínimo 8 caracteres')
      .required('La contraseña es requerida')
  };
  
  export const registerSchema = Yup.object({
    name: Yup
      .string('Nombre inválido')
      .min(2, 'El nombre debe tener mínimo 2 caracteres')
      .required('El nombre es requerido'),
    avatar: Yup
      .string('Imagen inválida'),
    description: Yup
      .string('Descripción inválida')
      .max(300, 'La descripción debe tener máximo 300 caracteres'),
    city: Yup
      .string('Ciudad inválida'),
    ...baseUserSchema,
  });
  
  export const loginSchema = Yup.object({
    ...baseUserSchema
  });