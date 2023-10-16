import { useState, useEffect } from "react";
import { getFriends } from "../../../services/FriendRequestService";
import { NavLink } from "react-router-dom";
import UserCard from "../../../components/UserCard/UserCard";
import './Friends.css';

const Friends = () => {
    const [friendList, setFriendList] = useState([]);

    useEffect(() => {
        getFriends()
            .then((friends) => {
                setFriendList(friends)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <div className="Friends container">
            <div className="friends-title mt-4">
                <h1>Usuarios con los que has conectado</h1>
            </div>
            <hr />
            <div className="row">
                {friendList.length <= 0 ? (
                    <div className="no-friends-container mt-4">
                        <h3>Todavía no has conectado con ningún usuario.</h3>
                        <p>Pulsa aquí para encontrar usuarios con intereses similares a los tuyos</p>
                        <div className="submit-button">
                            <NavLink to="/user/users/filtered"><button className="btn btn-primary">Encontrar usuarios</button></NavLink>
                        </div>
                    </div>
                ) : (
                    friendList.map((friend) => (
                        <div key={friend.id} className="col-12 col-md-4 col-sm-6">
                            <UserCard {...friend} />
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default Friends;