import { useState, useEffect } from "react";
import { getUsers } from "../../services/UserService";


const UsersList = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        getUsers()
            .then(userElem => {
                setUsers(userElem)
            })
            .catch((err) => {
                console.log(err)
            });
    }, [])

    return (
        <div className="UsersList container">
            <h1>Encuentra usuarios</h1>
            {users.map((user) => (
                <p key={user.id}>{user.name}</p>
            ))}
        </div>
    )
}

export default UsersList;