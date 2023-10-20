import './CurrentUserNav.css';
import { NavLink } from 'react-router-dom';
import { logout } from '../../../stores/AccessTokenStore';

const CurrentUserNav = () => {
    return (
        <div className="current-user-nav-margin">
            <div className="current-user-nav">
                <ul className="">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/user/friends"><i class="bi bi-people-fill fs-2"></i>Conexiones</NavLink>
                    </li>
                    <hr/>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/user/calendar"><i class="bi bi-calendar-event fs-2"></i>Calendario</NavLink>
                    </li>
                    <hr/>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/user/users"><i class="bi bi-person-fill fs-2"></i>Otros usuarios</NavLink>
                    </li>
                    <hr/>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/user/edit"><i class="bi bi-person-fill-gear fs-2"></i>Editar perfil</NavLink>
                    </li>
                    <hr/>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/user/skills"><i class="bi bi-pen-fill"></i>Editar habilidades</NavLink>
                    </li>
                    <hr/>
                    <li className="nav-item close-session">
                        <button className="nav-link" onClick={logout}>Cerrar sesión</button>
                    </li>
                    <hr/>
                </ul>
            </div>
        </div>
    )
}

export default CurrentUserNav;