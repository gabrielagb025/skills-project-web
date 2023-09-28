import { useAuthContext } from '../../../contexts/AuthContext';
import './Home.css'
import { NavLink, Navigate } from "react-router-dom";

const Home = () => {

    const { user } = useAuthContext();

    return (
        user ? (
            <Navigate to="/user/profile" />
        ) : (
            <div className="Home home-container container">
                <h1 className="mt-4">Welcome to SkillsApp</h1>

                <div className="home-buttons mt-4">
                    <NavLink className="" to="/login"><button className="btn btn-primary">Iniciar sesión</button></NavLink>
                    <NavLink className="mt-2" to="/register"><button className="btn btn-primary">Registrarse</button></NavLink>
                </div>
            </div>
        )

    )
}

export default Home;