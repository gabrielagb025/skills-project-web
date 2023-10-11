import { getCurrentChat } from "../../../services/Chat.service";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuthContext } from "../../../contexts/AuthContext";
import { createMessage } from "../../../services/Message.Service";
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
            })
            .catch(err => {
                console.log(err);
            })
    }, [id]);

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
            .then((newMessage) => {

                const updatedMessages = [...chatMessages, newMessage];
                setChatMessages(updatedMessages);

                const updatedChat = {
                    ...chat,
                    messages: updatedMessages
                };
                setChat(updatedChat);
                console.log('mensaje creado');
            })
            .catch(err => {
                console.log(err)
            })
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
                        <div className="message" key={msg.id}>
                            <span className="user">{msg.sender.name}:</span> {msg.text}
                            <i className={`bi bi-check-all ${msg.status === 'unread' ? 'grey' : 'green'} ms-2`}></i>
                        </div>
                    ))}
                </div>

                <form onSubmit={handleSubmitMessage}>
                    <div className="form-group">
                        <input onChange={handleMessageChange} type="text" name="text" className="form-control" placeholder="Type your message" value={message.text} />
                    </div>
                    <button type="submit" className="btn btn-primary mt-2">Send</button>
                </form>
            </div>
        ) : (
            <p>Loading</p>
        )
    )
}

export default Chat;