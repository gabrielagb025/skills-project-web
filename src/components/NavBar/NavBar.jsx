import { useAuthContext } from "../../contexts/AuthContext";
import { NavLink } from "react-router-dom";
import { logout } from "../../stores/AccessTokenStore";
import './NavBar.css';

const NavBar = () => {

    const { user } = useAuthContext();


    return (
        <nav className="Navbar">
            <nav className="mobile-navbar navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/user/timeline">SkillsApp</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/user/timeline">Inicio</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/user/users/filtered">Usuarios para ti</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/user/notifications">Notificaciones</NavLink>
                            </li>
                            
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/user/chats">Conversaciones</NavLink>
                            </li>
                            
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/user/profile">Mi perfil</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <nav className="desktop-navbar navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/user/timeline">Holaaaaaa</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/user/timeline">Inicio</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/user/users">Usuarios</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/user/users/filtered">Usuarios para ti</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/user/notifications">Notificaciones</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/user/friends">Amigos</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/user/chats">Conversaciones</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/user/calendar">Calendario</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/user/profile">Mi perfil</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/user/edit">Editar perfil</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/user/skills">Editar habilidades</NavLink>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link" onClick={logout}>Cerrar sesión</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </nav>
    )
}

export default NavBar;