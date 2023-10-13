import { useState } from "react";
import { useNavigate} from "react-router-dom";

const Mail = () => {
    const navigate = useNavigate();
    const [isActive, setIsActive] = useState(false);

    return (
        <>
            <h1>Te hemos enviado un correo para activar tu cuenta.</h1>
        </>
    )
}

export default Mail;