import { useState, useEffect } from "react";
import { getFriendRequests, respondToFriendRequest } from "../../../services/FriendRequestService";
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

    const handleRespondToFriendRequest = (id, action) => {
        respondToFriendRequest(id, action)
        .then((updatedRequest) => {
            console.log('Solicitud editada')
            const updatedRequests = friendRequestList.filter(request => request.id !== updatedRequest.id);
                setFriendRequestList(updatedRequests);
        })
        .catch((err) => {
            console.log(err)
        })
    }

    return(
        <div className="Notifications container mt-4">
            <h1>Notificaciones</h1>
            <div className="friend-request-container">
                <h3>Solicitudes de conexión</h3>

                {friendRequestList.length <= 0 ? 
                (<p>No tienes ninguna solicitud de conexión</p>) 
                : 
                (friendRequestList.map((friendRequest) => (
                    <div className="mt-3" key={friendRequest.id}>
                    <div>
                    <NavLink to={`/user/users/detail/${friendRequest.userSend.id}`}><img className="mb-3" src={friendRequest.userSend.avatar} alt="" width={100}/></NavLink>
                    <NavLink style={{ textDecoration: 'none', color: 'black'}} to={`/user/users/detail/${friendRequest.userSend.id}`}><h5>{friendRequest.userSend.name}</h5></NavLink>
                    <p>{friendRequest.message}</p>
                    </div>
                    <div className="friend-request-buttons d-flex">
                        <button className="btn btn-success me-3" onClick={() => handleRespondToFriendRequest(friendRequest.id, 'accepted')}>Aceptar</button>
                        <button className="btn btn-danger" onClick={() => handleRespondToFriendRequest(friendRequest.id, 'rejected')}>Rechazar</button>
                    </div>
                    <hr />
                    </div>
                )))}
            </div>
        </div>
    )
}

export default Notifications;