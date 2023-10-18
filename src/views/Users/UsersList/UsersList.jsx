import { useState, useEffect } from "react";
import UserCard from "../../../components/UserCard/UserCard";
import { getUsers } from "../../../services/UserService";
import { useAuthContext } from "../../../contexts/AuthContext";
import './UsersList.css'


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
        <div className="users-list-margin">
            <div className="UsersList container">
                <div className="users-title mt-4">
                    <h1>Encuentra usuarios</h1>
                    <hr />
                </div>
                <div className="row">
                    {users.map((user) => (
                        <div className="col-12 col-md-4 col-sm-6 my-3" key={user.id}>
                            <UserCard {...user} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default UsersList;