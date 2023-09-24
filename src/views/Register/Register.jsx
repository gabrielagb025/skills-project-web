import { useState, useEffect } from "react";
import { useFormik } from 'formik';
import { registerSchema } from "../../utils/yup.schemas";
import { register } from "../../services/AuthService";
import InputGroup from '../../components/InputGroup/InputGroup'
import { useNavigate } from "react-router-dom";


const initialValues = {
    name: "",
    email: "",
    password: "",
    avatar: ""
}

const Register = () => {

    const navigate = useNavigate();

    const {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        isSubmitting,
        handleSubmit,
        setSubmitting,
        setFieldError,
        setFieldValue,
    } = useFormik({
        initialValues: initialValues,
        validateOnBlur: true,
        validateOnChange: false,
        validationSchema: registerSchema,
        onSubmit: (values) => {
            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('email', values.email);
            formData.append('password', values.password);

            if (values.avatar) {
                console.log('values.avatar: ', values.avatar);
                formData.append('avatar', values.avatar);
            }

            register(formData)
                .then(() => {
                    console.log('registered');
                    navigate('/')
                })
                .catch((err) => {
                    console.log(err);
                    setFieldError('email', err.response.message);
                })
                .finally(() => {
                    setSubmitting(false);
                });
        },
    });

    return (
        <div className="register container mt-5">
            <h1>Registrarse</h1>

            <form onSubmit={handleSubmit}>
                <InputGroup
                    label="Nombre"
                    name="name"
                    type="text"
                    value={values.name}
                    error={touched.name && errors.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Introduce un nombre"
                />
                <InputGroup
                    label="Email"
                    name="email"
                    type="email"
                    value={values.email}
                    error={touched.email && errors.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Introduce un correo"
                />
                <InputGroup
                    label="Contraseña"
                    name="password"
                    type="password"
                    value={values.password}
                    error={touched.password && errors.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Introduce una contraseña"
                />
                <InputGroup
                    label="Imagen de perfil"
                    name="avatar"
                    type="file"
                    value={values.avatar}
                    error={touched.avatar && errors.avatar}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder=""
                />
                <div className="submitButton mt-4 d-flex justify-content-center align-items-center">
                    <button type="submit" className={`btn btn-${isSubmitting ? 'secondary' : 'primary'}`}>
                        {isSubmitting ? "Cargando" : "Registrarse"}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Register;