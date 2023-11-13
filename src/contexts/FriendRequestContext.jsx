import { createContext, useContext, useState, useEffect } from 'react';

const FriendRequestContext = createContext();

export const useFriendRequestContext = () => useContext(FriendRequestContext);
import { getFriendRequests } from "../services/FriendRequestService";

export const FriendRequestContextProvider = ({ children }) => {
    const [friendRequests, setFriendRequests] = useState([]);

    useEffect(() => {
        getFriendRequests()
            .then((friendRequests) => {
                setFriendRequests(friendRequests)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    const value = {
        friendRequests,
        setFriendRequests
    }

    return (
        <FriendRequestContext.Provider value={value}>
            {children}
        </FriendRequestContext.Provider>
    )
}

