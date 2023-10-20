import './LogoHeader.css';
import { NavLink } from 'react-router-dom';
import Logo from '../../assets/logo-skillsync-letras.png';

const Header = () => {
    return (
        <div className="header">
            <img src={Logo} alt="Logo de tu empresa" className="logo" />
        </div>
    )
}

export default Header;
