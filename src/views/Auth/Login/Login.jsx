import InputGroup from '../../../components/InputGroup/InputGroup';
import { useFormik } from 'formik';
import { loginSchema } from '../../../utils/yup.schemas';
import { login as loginRequest } from '../../../services/AuthService';
import { useNavigate, Navigate, NavLink } from 'react-router-dom';
import { useAuthContext } from '../../../contexts/AuthContext';
import './Login.css';

const initialValues = {
    email: "",
    password: ""
}

const Login = () => {

    const { login, user } = useAuthContext()
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
    } = useFormik({
        initialValues: initialValues,
        validateOnBlur: true,
        validateOnChange: false,
        validationSchema: loginSchema,
        onSubmit: (values) => {
            loginRequest(values)
                .then((res) => {
                    console.log(res);
                    login(res.accessToken, () => navigate('/user/profile'));
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
        <div className="Login login-container container my-5">
            <div className="text-center mb-4">
                <img src="src\assets\logo skillsync letras.png" alt="" width={200} />
            </div>
            <h1>Iniciar sesión</h1>

            <hr />

            <form className="form-container" onSubmit={handleSubmit}>
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
                    placeholder="************"
                />
                <div className="submit-button mt-4 d-flex justify-content-center align-items-center">
                    <button type="submit" className={`btn ${isSubmitting ? 'submitting' : ''}`}>
                        {isSubmitting ? "Cargando..." : "Iniciar sesión"}
                    </button>
                </div>
            </form>
            <div>
                <p className="mt-4">¿No tienes una cuenta? - <NavLink to="/register" style={{ textDecoration: 'none' }}><span>Registrarse</span></NavLink></p>
            </div>
        </div>
    )
}

export default Login