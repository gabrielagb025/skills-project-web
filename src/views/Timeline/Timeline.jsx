import PostInput from "../../components/PostInput/PostInput";
import { useState, useEffect } from "react";
import { getTimelinePosts, deletePost } from "../../services/PostService";
import PostCard from "../../components/PostCard/PostCard";
import { useAuthContext } from "../../contexts/AuthContext";

const Timeline = () => {

    const { user: currentUser } = useAuthContext();
    const [postList, setPostList] = useState([]);

    useEffect(() => {
        getTimelinePosts()
            .then((posts) => {
                setPostList(posts)
            })
            .catch((err) => {
                console.log(err)
            })
    }, []);

    const handleDeletePost = (postId) => {
        deletePost(postId)
          .then(() => {
            console.log('post borrado')
            const filteredPosts = postList.filter((post) => post._id !== postId);
            setPostList(filteredPosts);
          })
          .catch(err => {
            console.log(err)
          })
    }

    return (
        <div className="Timeline container">
            <h1 className="mt-4">Timeline</h1>
            <PostInput />
            <div className="posts-list mt-4">
                {postList.map((post) => (
                    <PostCard key={post._id} post={post} onDeletePost={handleDeletePost}/>
                ))}
            </div>
        </div>
    )
}

export default Timeline;