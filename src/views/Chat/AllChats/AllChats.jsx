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
        <div className="chats-margin">
            <div className="Chats container">
                <div className="chat-title mt-4">
                    <h1>Tus conversaciones</h1>
                </div>
                <hr />
                {chats.length > 0 ? (
                    <>
                        {chats.map((chat) => {
                            const otherUser = chat?.users.find((user) => user.id !== currentUser.id);
                            return (
                                <div className="chat-list-container my-3">
                                    <NavLink style={{ textDecoration: 'none', color: 'black' }} to={`/user/chat/${chat.id}`} key={chat.id}>
                                        <div className="d-flex align-items-center chat-container">
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
                                </div>
                            );
                        })}
                    </>
                ) : (
                    <div className="no-conversations-container">
                        <h3>Aún no has iniciado ninguna conversación.</h3>
                        <p>¡No esperes más e inicia conversaciones con tus conexiones!</p>
                        <div className="submit-button">
                            <NavLink to="/user/friends"><button className="btn btn-primary">Ver conexiones</button></NavLink>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );

}

export default Chats;