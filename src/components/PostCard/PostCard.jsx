import { NavLink } from "react-router-dom";
import './PostCard.css';
import { useAuthContext } from "../../contexts/AuthContext";

const PostCard = (props) => {

    const { user: currentUser } = useAuthContext();
    const { post, onDeletePost } = props;

    return (
        <div className="PostCard post-container mt-4 d-flex">
            <div className="user-img me-3">
                <NavLink to={`/user/users/detail/${post.user._id}`}><img src={post.user.avatar} alt="" width={100} /></NavLink>
            </div>
            <div className="post-content">
                <NavLink style={{ textDecoration: 'none' }} to={`/user/users/detail/${post.user._id}`}><h5 id="post-user-name">{post.user.name}</h5></NavLink>
                <p>{post.message}</p>
                {post.multimedia.length > 0 ?
                    post.multimedia.map((image) => (
                        <img key={image} src={image} width={100} />
                    )) : (
                        null
                    )}
                <p>{post.date}</p>
            </div>
            <div className="delete-btn">
                {post.user._id === currentUser.id ? (
                    <button className="btn btn-danger" onClick={() => onDeletePost(post._id)}>Borrar</button>
                ) : (
                    null
                )}
            </div>
        </div>
    )
}

export default PostCard;