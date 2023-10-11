import { NavLink } from "react-router-dom";
import './PostCard.css';
import { useAuthContext } from "../../contexts/AuthContext";

const PostCard = (props) => {

    const { user: currentUser } = useAuthContext();
    const { post, onDeletePost } = props;

    return (
        <div className="PostCard post-container mt-4 d-flex">
            <div className="user-img me-3">
                <NavLink to={post.user._id === currentUser.id ? '/user/profile' : `/user/users/detail/${post.user._id}`}><img src={post.user.avatar} alt="" width={100} /></NavLink>
            </div>
            <div className="post-content">
                <NavLink style={{ textDecoration: 'none' }} to={post.user._id === currentUser.id ? '/user/profile' : `/user/users/detail/${post.user._id}`}><h5 id="post-user-name">{post.user.name}</h5></NavLink>
                <p>{post.message}</p>
                {post.type === 'image' ? (
                    post.multimedia.map((img, index) => (
                        <img key={index} src={img} width={100} />
                    ))
                ) : (null)}
                {post.type === 'document' ? (
                    post.multimedia.map((doc, index) => (
                        <embed key={index} type="application/pdf" src={doc} width={500} />
                    ))
                ) : (null)}
                {post.type === 'video' ? (
                    post.multimedia.map((vid, index) => (
                        <video key={index} width={400} controls>
                            <source src={vid} type="video/mp4" />
                            Tu navegador no soporta el elemento de video.
                        </video>
                    ))
                ) : (null)}
                <p>{post.date}</p>
            </div>
            <div className="delete-btn">
                {post.user.id === currentUser.id ? (
                    <button className="btn btn-danger" onClick={() => onDeletePost(post._id)}>Borrar</button>
                ) : (
                    null
                )}
            </div>
        </div>
    )
}

export default PostCard;