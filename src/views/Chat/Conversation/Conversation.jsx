import { getCurrentChat } from "../../../services/Chat.service";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuthContext } from "../../../contexts/AuthContext";
import { createMessage, updateMessages } from "../../../services/Message.Service";
import './Conversation.css';

const initialValues = {
    text: ''
}

const Chat = () => {
    const [chat, setChat] = useState(null);
    const [message, setMessage] = useState(initialValues);
    const [chatMessages, setChatMessages] = useState([]);
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
            <div className="Chat container mt-4">
                <div className="user-info d-flex">
                    <img src={otherUser.avatar} alt="" width={100} />
                    <h2 className="ms-4">{otherUser.name}</h2>
                </div>
                <hr />
                <div className="chat-box">
                    {chatMessages.map((msg) => (
                        <div className={`message d-flex ${msg.sender.id === currentUser.id ? 'message-right' : 'message-left'}`} key={msg.id}>
                            <div>
                            {msg.sender && <img src={msg.sender.avatar} width={40}/>}
                            </div>
                            <div className={`ms-3`}>
                            {msg.text}
                            {msg.sender.id === currentUser.id ? (<i className={`bi bi-check-all ${msg.status === 'unread' ? 'grey' : 'green'} ms-2`}></i>) : (null)}
                            </div>
                        </div>
                    ))}
                </div>

                <form onSubmit={handleSubmitMessage}>
                    <div className="form-group">
                        <input onChange={handleMessageChange} type="text" name="text" className="form-control" placeholder="Escribe un mensaje..." value={message.text} />
                    </div>
                    <button type="submit" className="btn btn-primary mt-2">Enviar</button>
                </form>
            </div>
        ) : (
            <p>Loading</p>
        )
    )
}

export default Chat;