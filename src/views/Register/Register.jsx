import { useState, useEffect } from "react";
import { useFormik } from 'formik';
import { registerSchema } from "../../utils/yup.schemas";
import { register } from "../../services/AuthService";
import { getSkills } from "../../services/SkillService";
import InputGroup from '../../components/InputGroup/InputGroup'
import { useNavigate, Navigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";


const initialValues = {
    name: "",
    email: "",
    password: "",
    avatar: ""
}

const Register = () => {
    
    // Traer las skills
    const [skills, setSkills] = useState()
    useEffect(() => {
        // Obtener las habilidades cuando el componente se monta
        getSkills()
            .then(skillElem => {
                setSkills(skillElem)
            })
            .catch((err) => {
                console.log(err)
            });
    }, []);
    
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
                    setFieldError('email', err.response.data.message);
                })
                .finally(() => {
                    setSubmitting(false);
                });
        },
    });

    return user ? (
        <Navigate to="/user/profile"/>
    ) : (
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
                <InputGroup
                    label="Descripción"
                    name="description"
                    type="text"
                    value={values.description}
                    error={touched.description && errors.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Escribe una breve descripción acerca de tus conocimientos e intereses"
                />
                <InputGroup
                    label="Ciudad"
                    name="city"
                    type="text"
                    value={values.city}
                    error={touched.city && errors.city}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Escribe el nombre de tu ciudad"
                />
                <InputGroup
                    label="Habilidades que puedes enseñar"
                    name="teachSkills"
                    type="text"
                    value={values.teachSkills}
                    error={touched.teachSkills && errors.teachSkills}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Escribe las habilidades que puedes enseñar"
                />
                <InputGroup
                    label="Habilidades que quieres aprender"
                    name="learnSkills"
                    type="text"
                    value={values.learnSkills}
                    error={touched.learnSkills && errors.learnSkills}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Escribe las habilidades que quieres aprender"
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