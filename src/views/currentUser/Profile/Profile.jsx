import './Profile.css'
import { useAuthContext } from "../../../contexts/AuthContext"
import { useState, useEffect } from 'react';
import { deletePost, getCurrentUserPosts, editPost } from '../../../services/PostService';
import PostInput from '../../../components/PostInput/PostInput';

const Profile = () => {
  const { user } = useAuthContext();
  const [ userPostList, setUserPostList ] = useState([]);
  const [ postInput, setPostInput ] = useState(false)

  useEffect(() => {
    getCurrentUserPosts()
    .then((posts) => {
      setUserPostList(posts)
    })
    .catch(err => {
      console.error(err)
    })
  }, []);


  const handleDeletePost = (postId) => {
    deletePost(postId)
      .then(() => {
        console.log('post borrado')
        const filteredPosts = userPostList.filter((post) => post.id !== postId);
        setUserPostList(filteredPosts);
      })
      .catch(err => {
        console.log(err)
      })
  }

  const handleEditPost = (postId) => {
    setPostInput(true)
    editPost(postId, postData)
      .then(() => {
        console.log('post editado')
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <div className="Profile profile-container container">
      <div className="mt-5">
        <img src={user.avatar} alt="" width="300" />
      </div>
      <div className="mt-4 profile-info-container">
        <h1>{user.name}</h1>
        <p>{user.description}</p>
        <p>{user.city}</p>
        <h4>Habilidades que puedes enseñar:</h4>
        {user.teachSkills.map((skill) => (
          <div key={skill.id}>
            <h5>{skill.name}</h5>
            <p>{skill.category}</p>
            <p>{skill.description}</p>
          </div>
        ))}
        <h4>Habilidades que quieres aprender:</h4>
        {user.learnSkills.map((skill) => (
          <div key={skill.id}>
            <h5>{skill.name}</h5>
            <p>{skill.category}</p>
            <p>{skill.description}</p>
          </div >
        ))}
        <h4>Tus publicaciones</h4>
        {userPostList.map((post) => (
          <div className="post-container" key={post.id}>
            <div className="post info">
            <p>{post.message}</p>
            {post.multimedia.map((image) => (
              <img className="me-2" src={image} width={100} key={image}/>
            ))}
            <p>{post.date}</p>
            </div>
            {postInput && <PostInput/>}
            <div className="post-buttons d-flex">
              <button className="btn btn-success me-4" onClick={() => handleEditPost(post.id)}>Editar</button>
              <button className="btn btn-danger" onClick={() => handleDeletePost(post.id)}>Borrar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Profile;