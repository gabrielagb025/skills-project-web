import { useState, useEffect } from "react";
import { getFriendRequests, respondToFriendRequest } from "../../../services/FriendRequestService";
import { NavLink } from "react-router-dom";
import './Notifications.css';

const Notifications = () => {
    const [friendRequestList, setFriendRequestList] = useState([])

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

    return (
        <div className="Notifications container mt-4">
            <div className="notifications-title mt-4">
                <h1>Solicitudes de conexión</h1>
            </div>
            <hr />
            <div className="row">
                {friendRequestList.length <= 0 ?
                    (
                        <div className="no-notifications-container mt-4">
                            <h3>No tienes ninguna solicitud de conexión.</h3>
                            <p>Pulsa aquí para encontrar usuarios con intereses similares a los tuyos y conectar con ellos.</p>
                            <div className="submit-button">
                                <NavLink to="/user/users/filtered"><button className="btn btn-primary">Encontrar usuarios</button></NavLink>
                            </div>
                        </div>
                    )
                    :
                    (friendRequestList.map((friendRequest) => (
                        <div className="mt-3 col-12 col-sm-6 col-md-4" key={friendRequest.id}>
                            <div className="friend-request-container">
                                <div className="d-flex align-items-center justify-content-start">
                                    <NavLink to={`/user/users/detail/${friendRequest.userSend.id}`}><img className="mb-3 me-3 img-fluid" src={friendRequest.userSend.avatar} alt="" width={100} /></NavLink>
                                    <NavLink style={{ textDecoration: 'none', color: 'black' }} to={`/user/users/detail/${friendRequest.userSend.id}`}><h5>{friendRequest.userSend.name}</h5></NavLink>
                                </div>
                                <p>{friendRequest.message}</p>
                                <div className="friend-request-buttons d-flex justify-content-center mt-1">
                                    <button className="btn btn-accept me-3" onClick={() => handleRespondToFriendRequest(friendRequest.id, 'accepted')}>Aceptar</button>
                                    <button className="btn btn-reject" onClick={() => handleRespondToFriendRequest(friendRequest.id, 'rejected')}>Rechazar</button>
                                </div>
                            </div>
                        </div>
                    )))}
            </div>
        </div>
    )
}

export default Notifications;