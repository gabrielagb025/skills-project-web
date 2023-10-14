import './Profile.css'
import { useAuthContext } from "../../../contexts/AuthContext"
import { useState, useEffect } from 'react';
import { deletePost, getCurrentUserPosts, editPost } from '../../../services/PostService';
import PostInput from '../../../components/PostInput/PostInput';
import DescriptionInput from '../../../components/DescriptionInput/DescriptionInput';
import { currentUserDescription, editDescription } from '../../../services/DescriptionService';

const Profile = () => {
  const { user } = useAuthContext();
  const [userPostList, setUserPostList] = useState([]);
  const [postInput, setPostInput] = useState(false);
  const [userDescription, setUserDescription] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    Promise.all([getCurrentUserPosts(), currentUserDescription()])
      .then(([posts, description]) => {
        setUserPostList(posts);
        setUserDescription(description);
      })
      .catch(err => {
        console.error(err);
      });
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

  const handleEditDescription = (descriptionId) => {
    editDescription(descriptionId, descriptionData)
      .then(() => {
        console.log('description editada')
      })
      .catch(err => {
        console.log(err)
      })
  }

  const handleShowEditForm = () => {
    setShowForm(true)
  }

  const handleShowForm = () => {
    setShowForm(true)
  }

  const handleUpdateDescription = () => {
    currentUserDescription()
      .then((description) => {
        setUserDescription(description)
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
        <p>{user.phone}</p>
        <p>{user.city}</p>
        {!userDescription ? (
          <div>
            <p>Añade información detallada sobre tus conocimientos en intereses para poder conectar mejor con otros usuarios.</p>
            <button onClick={handleShowForm} className="btn btn-primary">Añadir</button>
            {showForm && (
              <DescriptionInput updateDescription={handleUpdateDescription} />
            )}
          </div>
        ) : (
          <div className="user-description">
            <h4>Descripción</h4>
            <p>{userDescription.description}</p>
            {userDescription.images.map((image, index) => (
              <img key={index} src={image} width={100} />
            ))}
            <p>URLs</p>
            {userDescription.urls.map((url, index) => (
              <a className="me-4" key={index} href={url}>{url}</a>
            ))}
            <button className="btn btn-success" onClick={handleShowForm}>Editar</button>
            {showForm && (
              <DescriptionInput
                updateDescription={handleUpdateDescription}
                initialValues={userDescription} // Pasa los valores iniciales al formulario de edición
              />
            )}
          </div>)}
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
        {userPostList
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .map((post) => (
          <div className="post-container" key={post.id}>
            <div className="post info">
              <p>{post.message}</p>
              {post.images.map((image) => (
                <img className="me-2" src={image} width={100} key={image} />
              ))}
              {post.urls.map((url, index) => (
                <a key={index} href={url}>{url}</a>
              ))}
              <p>{post.date}</p>
            </div>
            {postInput && <PostInput />}
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