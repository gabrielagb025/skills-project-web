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
    description: "",
    teachSkills: [],
    learnSkills: []
}


const Register = () => {

    const [skills, setSkills] = useState([]);
    const { user } = useAuthContext();
    const navigate = useNavigate();
    const [selectedTeachSkills, setSelectedTeachSkills] = useState([]);
    const [selectedLearnSkills, setSelectedLearnSkills] = useState([]);

    useEffect(() => {
        getSkills()
            .then((skillList) => {
                setSkills(skillList)
            })
            .catch((err) => {
                console.log(err)
            })
    }, []);

    skills.sort((a, b) => {
        if (a.category < b.category) {
            return -1;
        }
        if (a.category > b.category) {
            return 1;
        }
        return 0;
    });


    const handleSkillChange = (e, skillType) => {
        const skillId = e.target.value;

        // Verificar si el usuario está seleccionando o deseleccionando la habilidad.
        if (e.target.checked) {
            // Agregar la habilidad seleccionada al estado local.
            setSelectedTeachSkills((prevSelectedSkills) => [
                ...prevSelectedSkills,
                skillId,
            ]);
        } else {
            // Quitar la habilidad deseleccionada del estado local.
            setSelectedTeachSkills((prevSelectedSkills) =>
                prevSelectedSkills.filter((id) => id !== skillId)
            );
        }
    };

    const handleSaveSkills = () => {


        const selectedSkills = {
            teachSkills: selectedTeachSkills,
            learnSkills: selectedLearnSkills,
        };

        updateCurrentUser(user._id, selectedSkills)
            .then((response) => {

            })
            .catch((error) => {

            });
    };


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
                <div className="teachSkills">
                    <h1>Elige una o dos habilidades que puedes enseñar</h1>
                    {skills.map((skill) => (
                        <label>
                            <input
                                type="checkbox"
                                value={skill.id}
                                onChange={(e) => handleSkillChange(e, 'teach')}
                                checked={selectedTeachSkills.includes(skill.id)}
                            />
                            {skill.name}

                        </label>
                    ))}
                </div>
                <div className="learnSkills">
                    <h1>Elige una o dos habilidades que quieres aprender</h1>
                    {skills.map((skill) => (
                        <label>
                            <input
                                type="checkbox"
                                value={skill.id}
                                onChange={(e) => handleSkillChange(e, 'learn')}
                                checked={selectedTeachSkills.includes(skill.id)}
                            />
                            {skill.name}
                        </label>
                    ))}
                </div>
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