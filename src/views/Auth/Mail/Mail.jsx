import { useState } from "react";
import { useNavigate} from "react-router-dom";
import './Mail.css';

const Mail = () => {
    const navigate = useNavigate();
    const [isActive, setIsActive] = useState(false);

    return (
    <div class="gracias-container my-5">
          <img class="p-3"src="src\assets\logo skillsync letras.png" alt="Logo" width="250" />
        <h1 class="p-3" >¡Gracias por registrate!</h1>
        <p class="p-3">Hemos enviado un correo electrónico al email con el que te has registrado. Revísalo para poder activar tu cuenta.</p>
    </div>

    )
}

export default Mail;