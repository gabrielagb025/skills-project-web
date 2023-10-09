import { useAuthContext } from '../../../contexts/AuthContext';
import './Home.css'
import { NavLink, Navigate } from "react-router-dom";

const Home = () => {

    const { user } = useAuthContext();

    return (
        user ? (
            <Navigate to="/user/profile" />
        ) : (
            <div className="Home home-container container mt-5">
                <h1 className="mt-5">Bienvenido a <br/><span className="fw-bold">SkillSync.</span></h1>
                <p className="mt-3 text-center">Conecta con otros usuarios, <br/> comparte tus conocimientos <br/> y adquiere nuevas perspectivas.</p>

                <div className="home-buttons mt-4">
                    <NavLink className="" to="/register"><button className="mt-3 btn register-btn">Registrarse</button></NavLink>
                    <p className="mt-4">¿Ya tienes una cuenta? - <NavLink to="/login" style={{ textDecoration: 'none' }}><span>Iniciar sesión</span></NavLink></p>
                </div>
            </div>
        )

    )
}

export default Home;