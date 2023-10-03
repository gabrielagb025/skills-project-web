import { useState, useEffect } from "react";
import { editUser } from "../../../services/UserService";
import InputGroup from "../../../components/InputGroup/InputGroup";
import { useAuthContext } from "../../../contexts/AuthContext";
import { useFormik } from "formik";
import { editProfileSchema } from "../../../utils/yup.schemas";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
    const { user, getUser } = useAuthContext();
    const [ userData, setUserData ] = useState({
        name: user.name,
        // avatar: user.avatar,
        description: user.description,
        city: user.city
    });

    const navigate = useNavigate();

    const initialValues = {
        name: user.name,
        avatar: user.avatar,
        description: user.description,
        city: user.city
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
        validationSchema: editProfileSchema,
        onSubmit: (values) => {
            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('description', values.description);
            formData.append('city', values.city);

            if (values.avatar) {
                formData.append('avatar', values.avatar);
            }

            editUser(formData)
                .then(() => {
                    console.log('edited');
                    console.log(`userData ---> ${userData}`);
                    console.log(`user ---> ${user}`);
                    getUser(() => (navigate('/user/profile')));
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    setSubmitting(false);
                });
        },
    });

    return (
        <div className="EditProfile edit-profile container mt-5">
            <h1>Editar perfil</h1>

            <form onSubmit={handleSubmit} >
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
                    label="Imagen de perfil"
                    name="avatar"
                    type="file"
                    onChange={(event) => {
                        setFieldValue("avatar", event.target.files[0]);
                    }}
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
                <div className="submitButton mt-4 d-flex justify-content-center align-items-center">
                    <button type="submit" className={`btn btn-${isSubmitting ? 'secondary' : 'primary'}`}>
                        {isSubmitting ? "Cargando" : "Editar perfil"}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default EditProfile;