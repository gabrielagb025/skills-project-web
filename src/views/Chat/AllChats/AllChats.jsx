import { getChats } from "../../../services/Chat.service";
import { useState, useEffect } from "react";
import { useAuthContext } from "../../../contexts/AuthContext";
import { NavLink } from "react-router-dom";
import './AllChats.css';

const Chats = () => {
    const [chats, setChats] = useState([]);
    const { user: currentUser } = useAuthContext();

    useEffect(() => {
        getChats()
            .then((chats) => {
                setChats(chats);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    return (
        <div className="Chats container">
            <h1>Tus conversaciones</h1>
            {chats.length > 0 ? (
                <>
                    {chats.map((chat) => {
                        const otherUser = chat?.users.find((user) => user.id !== currentUser.id);
                        return (
                            <NavLink style={{ textDecoration: 'none', color: 'black'}} to={`/user/chat/${chat.id}`} key={chat.id}>
                                <div className="d-flex chat-container">
                                    <img src={otherUser.avatar} alt="" width={100} />
                                    <div className="ms-4">
                                        <h5>{otherUser.name}</h5>
                                        {chat.messages.length > 0 ? (
                                            <p>{chat.messages[chat.messages.length - 1].text}</p>
                                        ) : (
                                            <p>No hay mensajes aún</p>
                                        )}
                                    </div>
                                </div>
                            </NavLink>
                        );
                    })}
                </>
            ) : (
                <p>Todavía no tienes ninguna conversación.</p>
            )}
        </div>
    );
    
}

export default Chats;