import { useAuthContext } from "../../contexts/AuthContext";
import { NavLink } from "react-router-dom";
import { logout } from "../../stores/AccessTokenStore";
import React, { useState } from 'react';
import Logo from '../../assets/logo-skillsync-letras.png';
import { Dropdown } from "react-bootstrap";
import { useFriendRequestContext } from "../../contexts/FriendRequestContext";
import './NavBar.css';

const NavBar = () => {

    const { user } = useAuthContext();
    const { friendRequests } = useFriendRequestContext();
    const [selectedIcon, setSelectedIcon] = useState('profile');
    const [selectedIconDesktop, setSelectedIconDesktop] = useState('timeline');



    return (
        <nav>
            <div className="navbar-container">
                <nav className="mobile-navbar navbar navbar-expand-lg bg-body-tertiary">
                    <div className="container-fluid">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/user/timeline" onClick={() => setSelectedIcon('bi-house')}>
                                    <i className={`bi ${selectedIcon === 'bi-house' ? 'bi-house-fill' : 'bi-house'} fs-1`}></i>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/user/friends" onClick={() => setSelectedIcon('bi-people')}>
                                    <i className={`bi ${selectedIcon === 'bi-people' ? 'bi-people-fill' : 'bi-people'} fs-1`}></i>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/user/chats" onClick={() => setSelectedIcon('bi-chat')}>
                                    <i className={`bi ${selectedIcon === 'bi-chat' ? 'bi-chat-fill' : 'bi-chat'} fs-1`}></i>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/user/notifications" onClick={() => setSelectedIcon('bi-bell')}>
                                    {friendRequests.length > 0 && (
                                        <div className="notification-badge">{friendRequests.length}</div>
                                    )}
                                    <i className={`bi ${selectedIcon === 'bi-bell' ? 'bi-bell-fill' : 'bi-bell'} fs-1`}></i>
                                </NavLink>
                            </li>
                            <li className="nav-item nav-mobile-image">
                                <NavLink className="nav-link" to="/user/profile" onClick={() => setSelectedIcon('profile')}>
                                    <img src={user.avatar} alt="" width={40} className={selectedIcon === 'profile' ? 'profile-border' : ''} />
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>

            <nav className="desktop-navbar navbar navbar-expand-lg bg-body-tertiary">
                <div className="ms-3 container-fluid">
                    <NavLink className="navbar-brand" to="/user/timeline"><img src={Logo} alt="" width={120} /></NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav navbar-menu">
                            <div className="navbar-menu-profile">
                                <li className="nav-item">
                                    <NavLink className={`nav-link ${selectedIconDesktop === 'timeline' ? 'selected-icon' : ''}`} to="/user/timeline" onClick={() => setSelectedIconDesktop('timeline')}>Publicaciones</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className={`nav-link ${selectedIconDesktop === 'users-foryou' ? 'selected-icon' : ''}`} to="/user/users/filtered" onClick={() => setSelectedIconDesktop('users-foryou')}>Usuarios para ti</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className={`nav-link ${selectedIconDesktop === 'other-users' ? 'selected-icon' : ''}`} to="/user/users" onClick={() => setSelectedIconDesktop('other-users')}>Otros usuarios</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className={`nav-link ${selectedIconDesktop === 'friends' ? 'selected-icon' : ''}`} to="/user/friends" onClick={() => setSelectedIconDesktop('friends')}>Amigos</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className={`nav-link ${selectedIconDesktop === 'bells' ? 'selected-icon' : ''}`} to="/user/notifications" onClick={() => setSelectedIconDesktop('bells')}>Notificaciones</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className={`nav-link ${selectedIconDesktop === 'chats' ? 'selected-icon' : ''}`} to="/user/chats" onClick={() => setSelectedIconDesktop('chats')}>Conversaciones</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className={`nav-link ${selectedIconDesktop === 'calendar' ? 'selected-icon' : ''}`} to="/user/calendar" onClick={() => setSelectedIconDesktop('calendar')}>Calendario</NavLink>
                                </li>
                            </div>
                            <div className="navbar-menu-profile-dropdown">
                                <Dropdown as={NavLink}>
                                    <Dropdown.Toggle variant="link" className="custom-dropdown" id="dropdown-basic">
                                        <img src={user.avatar} alt="" width={50} />
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item className="custom-dropdown-item" as={NavLink} to="/user/profile">Mi perfil</Dropdown.Item>
                                        <Dropdown.Item className="custom-dropdown-item" as={NavLink} to="/user/edit">Editar perfil</Dropdown.Item>
                                        <Dropdown.Item className="custom-dropdown-item" as={NavLink} to="/user/skills">Editar habilidades</Dropdown.Item>
                                        <Dropdown.Item className="custom-dropdown-item" onClick={logout}>Cerrar sesión</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </ul>
                    </div>
                </div>
            </nav>
        </nav>
    )
}

export default NavBar;