import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext"

const ProtectedRoute = () => {
    const { user } = useAuthContext();

    if (!user) {
        return <Navigate to="/"/>
    }

    return(
        <Outlet />
    )
}

export default ProtectedRoute;