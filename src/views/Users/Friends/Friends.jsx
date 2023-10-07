import { useState, useEffect } from "react";
import { getFriends } from "../../../services/FriendRequestService";
import { NavLink } from "react-router-dom";
import UserCard from "../../../components/UserCard/UserCard";

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
            <h1>Usuarios con los que has conectado</h1>
            {friendList.length <= 0 ? (
                <>
                    <h3>Todavía no has conectado con ningún usuario.</h3>
                    <p>Pulsa aquí para encontrar usuarios con intereses similares a los tuyos</p>
                    <NavLink to="/user/users/filtered"><button className="btn btn-primary">Encontrar usuarios</button></NavLink>
                </>
            ) : (
                friendList.map((friend) => (
                    <UserCard key={friend.id} {...friend}/>
                ))
            )}
        </div>
    )
}

export default Friends;