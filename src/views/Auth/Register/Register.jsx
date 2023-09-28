import { useState, useEffect } from "react";
import { useFormik } from 'formik';
import { registerSchema } from '../../../utils/yup.schemas';
import { register } from '../../../services/AuthService';
import { getSkills } from "../../../services/SkillService";
import InputGroup from '../../../components/InputGroup/InputGroup'
import { useNavigate, Navigate } from "react-router-dom";
import { useAuthContext } from "../../../contexts/AuthContext";


const initialValues = {
    name: "",
    email: "",
    password: "",
    avatar: "",
    description: ""
}

const Register = () => {

    const [skills, setSkills] = useState([]);
    const [selectedTeachSkills, setSelectedTeachSkills] = useState([]);
    const [selectedLearnSkills, setSelectedLearnSkills] = useState([]);
    const { user } = useAuthContext();
    const navigate = useNavigate();

    // Traer las skills
    useEffect(() => {
        getSkills()
            .then(skillElem => {
                setSkills(skillElem)
            })
            .catch((err) => {
                console.log(err)
            });
    }, [])

    console.log(skills)

    const handleTeachSkillsChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions).map(
            (option) => option.value
        );
        setSelectedTeachSkills(selectedOptions);
    };

    const handleLearnSkillsChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions).map(
            (option) => option.value
        );
        setSelectedLearnSkills(selectedOptions);
    }

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
            formData.append('description', values.description);

            if (values.avatar) {
                console.log('values.avatar: ', values.avatar);
                formData.append('avatar', values.avatar);
            }

            register(formData)
                .then(() => {
                    console.log('registered');
                    navigate('/login')
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
                    placeholder="Harry Potter"
                />
                <InputGroup
                    label="Email"
                    name="email"
                    type="email"
                    value={values.email}
                    error={touched.email && errors.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="harry@hogwarts.es"
                />
                <InputGroup
                    label="Contraseña"
                    name="password"
                    type="password"
                    value={values.password}
                    error={touched.password && errors.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="**************"
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
                    placeholder="Soy profesor de pintura y me interesa la fotografía"
                />
                <InputGroup
                    label="Ciudad"
                    name="city"
                    type="text"
                    value={values.city}
                    error={touched.city && errors.city}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Valencia"
                />
                {/*<InputGroup
                    label="Selecciona una o dos habilidades que puedes enseñar"
                    name="teachSkills"
                    type="select"
                    multiple
                    value={values.selectedTeachSkills}
                    error={touched.teachSkills && errors.teachSkills}
                    onChange={handleTeachSkillsChange}
                    onBlur={handleBlur}
                    placeholder="">
                    {skills.map((skill) => (
                        <option key={skill} value={skill}>
                            {skill.name}
                        </option>
                    ))}
                </InputGroup>
                <InputGroup
                    label="Selecciona una o dos habilidades que quieres aprender"
                    name="learnSkills"
                    type="select"
                    multiple
                    value={values.selectedLearnSkills}
                    error={touched.learnSkills && errors.learnSkills}
                    onChange={handleLearnSkillsChange}
                    onBlur={handleBlur}
                    placeholder="">
                    {skills.map((skill) => (
                        <option key={skill} value={skill}>
                            {skill.name}
                        </option>
                    ))}
                    </InputGroup>*/}
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