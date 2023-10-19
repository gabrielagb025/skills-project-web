import './Profile.css'
import { useAuthContext } from "../../../contexts/AuthContext"
import { useState, useEffect } from 'react';
import { deletePost, getCurrentUserPosts, editPost } from '../../../services/PostService';
import PostInput from '../../../components/PostInput/PostInput';
import DescriptionInput from '../../../components/DescriptionInput/DescriptionInput';
import { currentUserDescription, editDescription } from '../../../services/DescriptionService';
import DescriptionModal from '../../../components/DescriptionModal/DescriptionModal';
import PostCard from '../../../components/PostCard/PostCard';
import { set } from 'date-fns';


const Profile = () => {
  const { user } = useAuthContext();
  const [userPostList, setUserPostList] = useState([]);
  const [postInput, setPostInput] = useState(false);
  const [userDescription, setUserDescription] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDescriptionModalOpen, setIsDescriptionModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("postList");

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

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

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

  const handleEditDescription = (descriptionId) => {
    setIsDescriptionModalOpen(true);
    setIsEditing(true);
  }

  const handleUpdateDescription = () => {
    currentUserDescription()
      .then((description) => {
        setUserDescription(description)
        setShowForm(false)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const handleShowDescriptionModal = () => {
    setIsDescriptionModalOpen(true);
  };

  const handleCloseDescriptionModal = () => {
    setIsDescriptionModalOpen(false);
  };


  return (
    <div className="profile-margin">
      <div className="Profile profile-container container mt-4">
        <div className="profile-header-container">
          <div className="user-content d-flex align-items-center">
            <div className="profile-info-img">
              <img src={user.avatar} alt="" width="300" />
            </div>
            <div className="profile-info-text">
              <h1>{user.name}</h1>
              <div className="d-flex align-items-center">
                <i className="bi bi-geo-alt-fill"></i><p>{user.city}</p>
              </div>
              <div className="d-flex align-items-center mt-2">
                <i className="bi bi-telephone-fill"></i><p>{user.phone}</p>
              </div>
            </div>
          </div>
          <div className="description-container">
            {!userDescription ? (
              <div className="no-description">
                <p className="text-center">Añade información detallada sobre tus conocimientos e intereses para poder conectar mejor con otros usuarios.</p>
                <div className="submit-button">
                  <button onClick={handleShowForm} className="btn btn-primary">Añadir</button>
                </div>
                {isDescriptionModalOpen && (
                  <DescriptionModal updateDescription={handleUpdateDescription} initialValues={isEditing ? userDescription : ''} />
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
                <button className="btn btn-success" onClick={handleEditForm}>Editar</button>
                {showForm && (
                  <DescriptionInput
                    handleSubmit={handleUpdateDescription}
                    initialValues={isEditing ? userDescription : ''}
                    show={handleShowDescriptionModal}
                    close={handleCloseDescriptionModal}
                    handleChange={handleChange}
                  />
                )}
              </div>)}
          </div>
        </div>
        <hr />
        <div className="user-profile-skills d-flex justify-content-around">
          <div className="skills-info-container d-flex flex-column mt-2">
            <h5><i class="bi bi-diamond-fill fs-6"></i>Puedes enseñar:</h5>
            {user.teachSkills.map((skill) => (
              <div key={skill.id}>
                <div className="skill-name d-flex align-items-center">
                  <p className="fw-bold me-2">{skill.name}</p>-<p className="ms-2">{skill.category}</p>
                </div>
                <p className="mt-2">{skill.description}</p>
              </div>
            ))}
          </div>
          <div className="skills-info-container d-flex flex-column mt-2">
            <h5><i class="bi bi-diamond-fill fs-6"></i>Quieres aprender:</h5>
            {user.learnSkills.map((skill) => (
              <div key={skill.id}>
                <div className="skill-name d-flex align-items-center">
                  <p className="fw-bold me-2">{skill.name}</p>-<p className="ms-2">{skill.category}</p>
                </div>
                <p className="mt-2">{skill.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* <h4>Tus publicaciones</h4>
        {userPostList
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .map((post) => (
            <div className="post-container" key={post.id}>
              <PostCard post={post} />
            </div>
          ))} */}

      </div>
    </div>
  )
}

export default Profile;