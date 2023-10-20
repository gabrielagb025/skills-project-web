import { useAuthContext } from "../../contexts/AuthContext";
import { NavLink } from "react-router-dom";
import { logout } from "../../stores/AccessTokenStore";
import React, { useState } from 'react';
import './NavBar.css';

const NavBar = () => {

    const { user } = useAuthContext();
    const [selectedIcon, setSelectedIcon] = useState('bi-house');



    return (
        <nav>
            <div class="navbar-container">
                <nav class="mobile-navbar navbar navbar-expand-lg bg-body-tertiary">
                    <div class="container-fluid">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <NavLink class="nav-link" to="/user/timeline" onClick={() => setSelectedIcon('bi-house')}>
                                    <i class={`bi ${selectedIcon === 'bi-house' ? 'bi-house-fill' : 'bi-house'} fs-1`}></i>
                                </NavLink>
                            </li>
                            <li class="nav-item">
                                <NavLink class="nav-link" to="/user/users/filtered" onClick={() => setSelectedIcon('bi-people')}>
                                    <i class={`bi ${selectedIcon === 'bi-people' ? 'bi-people-fill' : 'bi-people'} fs-1`}></i>
                                    </NavLink>
                            </li>
                            <li class="nav-item">
                                <NavLink class="nav-link" to="/user/chats" onClick={() => setSelectedIcon('bi-chat')}>
                                    <i class={`bi ${selectedIcon === 'bi-chat' ? 'bi-chat-fill' : 'bi-chat'} fs-1`}></i>
                                </NavLink>
                            </li>
                            <li class="nav-item">
                                <NavLink class="nav-link" to="/user/notifications" onClick={() => setSelectedIcon('bi-bell')}>
                                    <i class={`bi ${selectedIcon === 'bi-bell' ? 'bi-bell-fill' : 'bi-bell'} fs-1`}></i>
                                </NavLink>
                            </li>
                            <li class="nav-item nav-mobile-image">
                                <NavLink class="nav-link" to="/user/profile" onClick={() => setSelectedIcon('profile')}>
                                    <img src={user.avatar} alt="" width={40} className={selectedIcon === 'profile' ? 'profile-border' : ''}/>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>

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