import { useState, useEffect } from "react";
import { useFormik } from 'formik';
import { registerSchema } from '../../../utils/yup.schemas';
import { register } from '../../../services/AuthService';
import { getSkills } from "../../../services/SkillService";
import InputGroup from '../../../components/InputGroup/InputGroup'
import { useNavigate, Navigate } from "react-router-dom";
import { useAuthContext } from "../../../contexts/AuthContext";
import { NavLink } from "react-router-dom";
import './Register.css'


const initialValues = {
    name: "",
    email: "",
    password: "",
    'repeat-password': "",
    avatar: "",
    city: "",
    phone: ""
}


const Register = () => {
    const { user } = useAuthContext();
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
            formData.append('city', values.city);
            formData.append('phone', values.phone);

            if (values.avatar) {
                console.log('values.avatar: ', values.avatar);
                formData.append('avatar', values.avatar);
            }

            console.log(formData);

            register(formData)
                .then(() => {
                    console.log('registered');
                    navigate('/mail')
                })
                .catch((err) => {
                    console.log(err);
                    setFieldError('email', err.response.data.message);
                })
                .finally(() => {
                    setSubmitting(false);
                });
        },
    });

    return user ? (
        <Navigate to="/user/profile" />
    ) : (
        <div className="div-margin">
            <div className="register-container container">
                <div className="text-center mb-4">
                    <img className="" src="src\assets\logo skillsync letras.png" alt="" width={200} />
                </div>
                <h1>Registrarse</h1>

                <hr />

                <form className="form-container" onSubmit={handleSubmit} encType="multipart/form-data">
                    <InputGroup
                        label={
                            <>
                                <i className="bi bi-person-fill"></i> Nombre
                            </>
                        }
                        name="name"
                        type="text"
                        value={values.name}
                        error={touched.name && errors.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Harry Potter"
                    />
                    <InputGroup
                        label={
                            <>
                                <i className="bi bi-envelope-fill"></i> Correo electrónico
                            </>
                        }
                        name="email"
                        type="email"
                        value={values.email}
                        error={touched.email && errors.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="harry@hogwarts.es"
                    />
                    <InputGroup
                        label={
                            <>
                                <i className="bi bi-lock-fill"></i> Contraseña
                            </>
                        }
                        name="password"
                        type="password"
                        value={values.password}
                        error={touched.password && errors.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="**************"
                    />
                    <InputGroup
                        label={
                            <>
                                <i className="bi bi-lock-fill"></i> Repite la contraseña
                            </>
                        }
                        name="repeat-password"
                        type="password"
                        value={values['repeat-password']}
                        error={touched['repeat-password'] && errors['repeat-password']}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="**************"
                    />
                    <InputGroup
                        label={
                            <>
                                <i className="bi bi-card-image"></i> Imagen de perfil
                            </>
                        }
                        name="avatar"
                        type="file"
                        onChange={(event) => {
                            setFieldValue("avatar", event.target.files[0]);
                        }}
                        onBlur={handleBlur}
                        placeholder=""
                    />
                    <InputGroup
                        label={
                            <>
                                <i className="bi bi-telephone-fill"></i> Número de teléfono (Sólo tus contactos podrán ver el número de teléfono).
                            </>
                        }
                        name="phone"
                        type="text"
                        value={values.phone}
                        error={touched.phone && errors.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="999999999"
                    />
                    <InputGroup
                        label={
                            <>
                                <i className="bi bi-geo-alt-fill"></i> Ciudad
                            </>
                        }
                        name="city"
                        type="text"
                        value={values.city}
                        error={touched.city && errors.city}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Valencia"
                    />
                    <div className="submit-button mt-4 d-flex justify-content-center align-items-center">
                        <button type="submit" className={`submit-btn btn`}>
                            {isSubmitting ? "Cargando" : "Registrarse"}
                        </button>
                    </div>
                </form>

                <div>
                    <p className="mt-4 text-center">¿Tienes una cuenta? - <NavLink to="/login" style={{ textDecoration: 'none' }}><span>Iniciar sesión</span></NavLink></p>
                </div>
            </div>
        </div>
    )
}

export default Register;