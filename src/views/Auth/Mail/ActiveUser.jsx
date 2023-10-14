import { useState, useEffect } from "react";
import { activateUser } from "../../../services/AuthService";
import { useParams, Navigate } from "react-router-dom";


const ActivateUser = () => {

    const { id } = useParams();
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        activateUser(id)
            .then(() => {
                setIsActive(true)
                console.log('Usuario activado')
            })
            .catch(err => {
                console.log(err)
            })
    }, [id])

    return (
        <>
            {isActive && <Navigate to="/login" />}
        </>
    )
}

export default ActivateUser;