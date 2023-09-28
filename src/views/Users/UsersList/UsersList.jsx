import { useState, useEffect } from "react";
import UserCard from "../../../components/UserCard/UserCard";
import { getUsers } from "../../../services/UserService";
import { useAuthContext } from "../../../contexts/AuthContext";


const UsersList = () => {
    const [users, setUsers] = useState([])
    const { user } = useAuthContext();

    useEffect(() => {
        getUsers()
            .then(userArr => {
                const filteredArr = userArr.filter((userElem) => userElem.id !== user.id)
                setUsers(filteredArr)
            })
            .catch((err) => {
                console.log(err)
            });
    }, [])


    return (
        <div className="UsersList container">
            <h1>Encuentra usuarios</h1>
            {users.map((user) => (
                <UserCard key={user.id} {...user}/>
            ))}
        </div>
    )
}

export default UsersList;