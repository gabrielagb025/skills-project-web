import { getCurrentChat } from "../../../services/Chat.service";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuthContext } from "../../../contexts/AuthContext";
import { createMessage, updateMessages } from "../../../services/Message.Service";
import { NavLink } from "react-router-dom";
import { format } from "date-fns";
import './Conversation.css';

const initialValues = {
    text: ''
}

const Chat = () => {
    const [chat, setChat] = useState(null);
    const [message, setMessage] = useState(initialValues);
    const [chatMessages, setChatMessages] = useState([]);
    const [messageError, setMessageError] = useState('');
    const { id } = useParams();
    const { user: currentUser } = useAuthContext();

    useEffect(() => {
        getCurrentChat(id)
            .then((chat) => {
                setChat(chat);
                setChatMessages(chat.messages);
                markMessagesAsRead(chat.messages)
            })
            .catch(err => {
                console.log(err);
            })
    }, [id]);

    const markMessagesAsRead = (messages) => {
        messages.forEach((message) => {
            if (message.status === 'unread' && message.sender.id !== currentUser.id) {
                updateMessages(message.id, { status: 'read' })
                    .then((response) => {
                        console.log('Mensaje actualizado:', response.message);
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        });
    };

    const handleFocus = () => {
        setMessageError(""); // Ocultar el mensaje de error cuando el campo de entrada recibe foco
    };

    const handleBlur = () => {
        if (!message.text) {
            setMessageError("Debes escribir un mensaje"); // Mostrar el mensaje de error si el campo de entrada está vacío cuando el usuario deja el campo
        }
    };

    const handleMessageChange = (e) => {
        const key = e.target.name;
        const value = e.target.value;

        setMessage(prevMessage => ({
            ...prevMessage,
            [key]: value
        }))
    }

    const handleSubmitMessage = (e) => {
        e.preventDefault();
        createMessage(chat.id, message)
            .then((response) => {
                const newMessage = response.message;

                console.log('Mensaje creado:', newMessage);

                const newMessagePopulated = {
                    ...newMessage,
                    sender: {
                        id: currentUser.id,
                        name: currentUser.name,
                        avatar: currentUser.avatar
                    }
                }

                const updatedMessages = [...chatMessages, newMessagePopulated];
                setChatMessages(updatedMessages);

                const updatedChat = {
                    ...chat,
                    messages: updatedMessages
                };

                setChat(updatedChat);
            })
            .catch(err => {
                console.log(err)
            })
        setMessage(initialValues);
    }

    const otherUser = chat?.users.find((user) => user.id !== currentUser.id);

    return (
        chat ? (
            <div className="chat-margin">
                <div className="Chat container">
                    <NavLink style={{ textDecoration: 'none', color: '#3F423B' }} to={`/user/users/detail/${otherUser.id}`}>
                        <div className="chat-user-info d-flex align-items-center">
                            <img src={otherUser.avatar} alt="" width={100} />
                            <div className="chat-user-name d-flex flex-column align-items-center">
                                <h2 className="ms-4">{otherUser.name}</h2>
                                <button className="btn">Ver perfil</button>
                            </div>
                        </div>
                    </NavLink>
                    <hr />
                    <div className="chat-box">
                        {chatMessages.map((msg) => (
                            <div className={`message d-flex ${msg.sender.id === currentUser.id ? 'message-right' : 'message-left'}`} key={msg.id}>
                                <div className="chat-message-content ms-3 d-flex align-items-center justify-content-between">
                                    <div className="d-flex message-text align-items-center">
                                        <p>{msg.text}</p>
                                        {msg.sender.id === currentUser.id ? (<i className={`bi bi-check-all ${msg.status === 'unread' ? 'grey' : 'green'} ms-2`}></i>) : (null)}
                                    </div>
                                    <div className="d-flex align-items-center message-time mt-4">
                                        {<p className="ms-2">{format(new Date(msg.date), "HH:mm")}</p>}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <form onSubmit={handleSubmitMessage}>
                        <div className="form-group d-flex align-items-center">
                            <input onChange={handleMessageChange} type="text" name="text" className="form-control" placeholder="Escribe un mensaje..." value={message.text} onFocus={handleFocus} onBlur={handleBlur} />
                            <button type="submit" className="btn-circle ms-2"><i className="bi bi-send"></i></button>
                        </div>
                    </form>
                </div>
            </div>
        ) : (
            <p>Loading</p>
        )
    )
}

export default Chat;