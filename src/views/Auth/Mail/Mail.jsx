import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from '../../../assets/logo-skillsync-letras.png';
import './Mail.css';

const Mail = () => {
    const navigate = useNavigate();
    const [isActive, setIsActive] = useState(false);

    return (
        <div className="mail-container d-flex flex-column align-items-center justify-content-center">
            <div class="gracias-container my-5">
                <img class="p-3" src={Logo} alt="Logo" width="250" />
                <h1 class="text-center" >¡Gracias por registrarte!</h1>

                <hr />

                <p class="text-center">Hemos enviado un correo electrónico al email con el que te has registrado. Revísalo para poder activar tu cuenta.</p>
            </div>
        </div>
    )
}

export default Mail;