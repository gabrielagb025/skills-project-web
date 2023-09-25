import InputGroup from '../../components/InputGroup/InputGroup';
import { useFormik } from 'formik';
import { loginSchema } from '../../utils/yup.schemas';
import { login as loginRequest } from '../../services/AuthService';
import { useNavigate, Navigate} from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';

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
                    login(res.accessToken, () => navigate('/'));
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

    return (
        <div className="Login container mt-5">
            <h1>Iniciar sesión</h1>
            <form onSubmit={handleSubmit}>
                <InputGroup
                    label="Correo electrónico"
                    name="email"
                    type="email"
                    value={values.email}
                    error={touched.email && errors.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Introduce tu correo electrónico"
                />
                <InputGroup
                    label="Contraseña"
                    name="password"
                    type="password"
                    value={values.password}
                    error={touched.password && errors.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Introduce tu contraseña"
                />
                <div className="submitButton mt-4 d-flex justify-content-center align-items-center">
                    <button type="submit" className={`btn btn-${isSubmitting ? 'secondary' : 'primary'}`}>
                        {isSubmitting ? "Cargando..." : "Iniciar sesión"}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Login