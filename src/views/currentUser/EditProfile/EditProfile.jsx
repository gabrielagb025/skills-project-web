import { useState, useEffect } from "react";
import { editUser } from "../../../services/UserService";
import InputGroup from "../../../components/InputGroup/InputGroup";
import { useAuthContext } from "../../../contexts/AuthContext";
import { useFormik } from "formik";
import { editProfileSchema } from "../../../utils/yup.schemas";
import { useNavigate } from "react-router-dom";
import './EditProfile.css';

const EditProfile = () => {
    const { user, getUser } = useAuthContext();
    const [userData, setUserData] = useState({
        name: user.name,
        // avatar: user.avatar,
        city: user.city,
        phone: user.phone
    });

    const navigate = useNavigate();

    const initialValues = {
        name: user.name,
        avatar: user.avatar,
        city: user.city,
        phone: user.phone
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
            formData.append('city', values.city);
            formData.append('phone', values.phone);

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
        <div className="edit-profile-margin">
            <div className="EditProfile edit-profile d-flex flex-column align-items-center container mt-4">
                <div className="edit-profile-title">
                    <h1>Editar perfil</h1>
                    <hr />
                </div>
                <form className="edit-profile-form" onSubmit={handleSubmit} >
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
                        <button type="submit" className={`btn ${isSubmitting ? 'submitting' : ''}`}>
                            {isSubmitting ? "Cargando" : "Editar perfil"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditProfile;