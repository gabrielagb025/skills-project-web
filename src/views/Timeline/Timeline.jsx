import PostInput from "../../components/PostInput/PostInput";
import { useState, useEffect } from "react";
import { getPostsForYou, deletePost, getPostsFriends } from "../../services/PostService";
import PostCard from "../../components/PostCard/PostCard";
import { useAuthContext } from "../../contexts/AuthContext";
import './Timeline.css';

const Timeline = () => {

    const { user: currentUser } = useAuthContext();
    const [postListForYou, setPostListForYou] = useState([]);
    const [postListFriends, setPostListFriends] = useState([]);
    const [currentPosts, setCurrentPosts] = useState(postListForYou);
    const [forYou, setForYou] = useState(true);

    useEffect(() => {
        Promise.all([getPostsForYou(), getPostsFriends()])
        .then(([postsForYou, postsFriends]) => {
            setPostListForYou(postsForYou);
            setPostListFriends(postsFriends);
        })
        .catch(err => {
            console.log(err)
        })
    }, []);

    const handleDeletePost = (postId) => {
        deletePost(postId)
          .then(() => {
            console.log('post borrado')
            const updatedForYouPosts = postListForYou.filter((post) => post.id !== postId);
            const updatedFriendsPosts = postListFriends.filter((post) => post.id !== postId);
            setPostListForYou(updatedForYouPosts);
            setPostListFriends(updatedFriendsPosts);

            if (forYou) {
                setCurrentPosts(updatedForYouPosts);
            } else {
                setCurrentPosts(updatedFriendsPosts);
            }
          })
          .catch(err => {
            console.log(err)
          })
    }

    const handleUpdatePostList = () => {
        Promise.all([getPostsForYou(), getPostsFriends()])
        .then(([postsForYou, postsFriends]) => {
            setPostListForYou(postsForYou);
            setPostListFriends(postsFriends);

            if (forYou) {
                setCurrentPosts(postListForYou);
            } else {
                setCurrentPosts(postListFriends);
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    const handleForYouPosts = () => {
        setForYou(true)
        setCurrentPosts(postListForYou)
    }

    const handleFriendsPosts = () => {
        setForYou(false)
        setCurrentPosts(postListFriends)
    }

    return (
        <div className="Timeline container">
            <h1 className="mt-4">Timeline</h1>
            <PostInput updatePost={handleUpdatePostList}/>
            <hr />
            <div className="posts-list mt-4">
                <div className="timeline-btns">
                    <button className="btn btn-primary" onClick={handleForYouPosts}>Para ti</button>
                    <button className="btn btn-primary" onClick={handleFriendsPosts}>Amigos</button>
                </div>
                {currentPosts
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .map((post) => (
                    <PostCard key={post.id} post={post} onDeletePost={() => handleDeletePost(post.id)}/>
                ))}
            </div>
        </div>
    )
}

export default Timeline;