import { useAuthContext } from "../../contexts/AuthContext";
import { NavLink } from "react-router-dom";
import { logout } from "../../stores/AccessTokenStore";

const NavBar = () => {

    const { user } = useAuthContext();


    return (
        <nav className="Navbar">
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/">SkillsApp</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            {!user ? (
                                <>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/register">Registrarse</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/login">Iniciar sesión</NavLink>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/profile">Mi perfil</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <button className="nav-link" onClick={logout}>Cerrar sesión</button>
                                    </li>
                                </>
                            )
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </nav>
    )
}

export default NavBar;