import { useState, useEffect } from "react";
import { getFriendRequests } from "../../../services/FriendRequestService";
import { NavLink } from "react-router-dom";

const Notifications = () => {
    const [ friendRequestList, setFriendRequestList ] = useState([])

    useEffect(() => {
        getFriendRequests()
        .then((friendRequests) => {
            setFriendRequestList(friendRequests)
        })
        .catch((err) => {
            console.log(err)
        })
    }, [])

    return(
        <div className="Notifications container mt-4">
            <h1>Notificaciones</h1>
            <div className="friend-request-container">
                <h3>Solicitudes de conexión</h3>
                {friendRequestList.map((friendRequest) => (
                    <div className="mt-3" key={friendRequest.id}>
                    <div>
                    <NavLink to={`/user/users/detail/${friendRequest.userSend.id}`}><img className="mb-3" src={friendRequest.userSend.avatar} alt="" width={100}/></NavLink>
                    <NavLink style={{ textDecoration: 'none', color: 'black'}} to={`/user/users/detail/${friendRequest.userSend.id}`}><h5>{friendRequest.userSend.name}</h5></NavLink>
                    <p>{friendRequest.message}</p>
                    </div>
                    <div className="friend-request-buttons d-flex">
                        <button className="btn btn-success me-3">Aceptar</button>
                        <button className="btn btn-danger">Rechazar</button>
                    </div>
                    <hr />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Notifications;