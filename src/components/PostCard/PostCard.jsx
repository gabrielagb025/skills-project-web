import { NavLink } from "react-router-dom";
import './PostCard.css';
import { useAuthContext } from "../../contexts/AuthContext";
import { format } from "date-fns";
import ImageModal from "./ImageModal";
import { useState } from "react";

const PostCard = (props) => {

    const { user: currentUser } = useAuthContext();
    const { post, onDeletePost } = props;

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');

    const openModal = (imageUrl) => {
        setSelectedImage(imageUrl);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setSelectedImage('');
        setModalIsOpen(false);
    };

    return (
        <div className="PostCard post-container mt-4 d-flex">
            <div className="post-user-info me-3">
                <NavLink to={post.user.id === currentUser.id ? '/user/profile' : `/user/users/detail/${post.user.id}`}><img src={post.user.avatar} alt="" width={80} /></NavLink>
                <NavLink style={{ textDecoration: 'none' }} to={post.user.id === currentUser.id ? '/user/profile' : `/user/users/detail/${post.user.id}`}><h5 className="ms-3" id="post-user-name">{post.user.name}</h5></NavLink>
            </div>
            <div className="post-content row mt-4">
                <p>{post.message}</p>
                <div className="post-images-container">
                    {post.images.map((img, index) => (
                        <div className="post-img m-2" key={index} onClick={() => openModal(img)}>
                            <img src={img} width={200} />
                        </div>
                    ))}
                    <ImageModal isOpen={modalIsOpen} onRequestClose={closeModal} imageUrl={selectedImage} />
                </div>
                <div className="post-urls-container mt-3">
                    {post.urls.map((url, index) => (
                        <div key={index}>
                        <i className="bi bi-link-45deg me-2"></i><a href={url}>{url}</a>
                        </div>
                    ))}
                </div>
                <div className="delete-btn d-flex justify-content-between mt-4">
                    <p id="post-date">{format(new Date(post.date), "dd/MM/yyyy HH:mm")}</p>
                    {post.user.id === currentUser.id ? (
                        <button className="btn" onClick={() => onDeletePost(post._id)}><i className="bi bi-trash fs-6 me-2"></i>Borrar</button>
                    ) : (
                        null
                    )}
                </div>
            </div>
        </div>
    )
}

export default PostCard;