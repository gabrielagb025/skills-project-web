import { useState, useEffect } from "react";
import UserCard from "../../../components/UserCard/UserCard";
import { getFilteredUsers } from "../../../services/UserService";
import './FilteredUsers.css'


const FilteredUsersList = () => {

    const [filteredUsers, setFilteredUsers] = useState([])

    useEffect(() => {
        getFilteredUsers()
            .then(userElem => {
                setFilteredUsers(userElem)
            })
            .catch((err) => {
                console.log(err)
            });
    }, [])

    return (
        <div className="users-filtered-margin">
            <div className="UsersList container">
                <div className="filtered-users-title mt-4">
                    <h1>Encuentra usuarios según tus intereses</h1>
                    <hr />
                </div>
                <div className="row">
                    {filteredUsers.map((user) => (
                        <div key={user.id} className="col-12 col-md-4 col-sm-6 my-3">
                            <UserCard  {...user} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default FilteredUsersList;