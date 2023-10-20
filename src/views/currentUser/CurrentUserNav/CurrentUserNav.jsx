import './CurrentUserNav.css';
import { NavLink } from 'react-router-dom';
import { logout } from '../../../stores/AccessTokenStore';

const CurrentUserNav = () => {
    return (
        <div className="current-user-nav-margin">
            <div className="current-user-nav">
                <ul className="">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/user/friends">Amigos</NavLink>
                    </li>
                    <hr/>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/user/calendar">Calendario</NavLink>
                    </li>
                    <hr/>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/user/users">Usuarios</NavLink>
                    </li>
                    <hr/>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/user/edit">Editar perfil</NavLink>
                    </li>
                    <hr/>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/user/skills">Editar habilidades</NavLink>
                    </li>
                    <hr/>
                    <li className="nav-item">
                        <button className="nav-link" onClick={logout}>Cerrar sesión</button>
                    </li>
                    <hr/>
                </ul>
            </div>
        </div>
    )
}

export default CurrentUserNav;