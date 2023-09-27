import { useState, useEffect } from "react";
import UserCard from "../../components/UserCard/UserCard";
import { getUsers } from "../../services/UserService";


const FilteredUsersList = () => {
    const [filteredUsers, setFilteredUsers] = useState([])

    useEffect(() => {
        getUsers()
            .then(userElem => {
                setFilteredUsers(userElem)
            })
            .catch((err) => {
                console.log(err)
            });
    }, [])

    return (
        <div className="UsersList container">
            <h1>Encuentra usuarios según tus intereses</h1>
            {filteredUsers.map((user) => (
                <UserCard key={user.id} {...user}/>
            ))}
        </div>
    )
}

export default FilteredUsersList;