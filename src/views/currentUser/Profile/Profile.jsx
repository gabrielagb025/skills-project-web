import './Profile.css'
import { useAuthContext } from "../../../contexts/AuthContext"
import { useState, useEffect } from 'react';
import { deletePost, getCurrentUserPosts } from '../../../services/PostService';
import { currentUserDescription, editDescription, createDescription } from '../../../services/DescriptionService';
import DescriptionModal from '../../../components/DescriptionModal/DescriptionModal';
import { getCurrentUserRating } from '../../../services/RatingService';
import PostCard from '../../../components/PostCard/PostCard';
import RatingCard from '../../../components/RatingCard/RatingCard';
import { NavLink } from 'react-router-dom';
import { set } from 'date-fns';

const initialValues = {
  description: "",
  urls: []
}


const Profile = () => {
  const { user } = useAuthContext();
  const [userPostList, setUserPostList] = useState([]);
  const [postInput, setPostInput] = useState(false);
  const [userDescription, setUserDescription] = useState(initialValues);
  const [isCurrentUserDescription, setIsCurrentUserDescription] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isDescriptionModalOpen, setIsDescriptionModalOpen] = useState(false);
  const [userRatings, setUserRatings] = useState([]);
  const [activeTab, setActiveTab] = useState("postList");


  useEffect(() => {
    Promise.all([getCurrentUserPosts(), getCurrentUserRating(), currentUserDescription()])
      .then(([posts, ratings, description]) => {
        setUserPostList(posts);
        setUserRatings(ratings);
        setIsCurrentUserDescription(description);
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

  
  const handleChangeDescription = (ev) => {

    console.log('handle change description llamado')

    const key = ev.target.name;
    const value = ev.target.value;

    setUserDescription(prevDesc => ({
        ...prevDesc,
        [key]: value
    }))
}

  // const handleEditDescription = (descriptionId) => {
  //   setIsDescriptionModalOpen(true);
  //   setIsEditing(true);
  // }

  const handleCreateDescription = (ev) => {
    ev.preventDefault();

    createDescription(userDescription)
      .then((description) => {
        setUserDescription(description)
        setIsDescriptionModalOpen(false);
        console.log('descripción creada')
      })
      .catch(err => {
        console.log(err)
      })
  }

  // const handleUpdateDescription = () => {
  //   currentUserDescription()
  //     .then((description) => {
  //       setUserDescription(description)
  //       setShowForm(false)
  //     })
  //     .catch(err => {
  //       console.log(err)
  //     })
  // }

  const handleShowDescriptionModal = () => {
    setIsDescriptionModalOpen(true);
  };

  const handleCloseDescriptionModal = () => {
    setIsDescriptionModalOpen(false);
  };


  return (
    <div className="profile-margin">
      <div className="top-div-header"></div>
      <div className="settings-button-container">
        <NavLink style={{color: " #3F423B"}} to="/user/nav"><i class="bi bi-gear fs-3"></i></NavLink>
      </div>
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
            {isCurrentUserDescription === null ? (
              <div className="no-description">
                <p className="text-center">Añade información detallada sobre tus conocimientos e intereses para poder conectar mejor con otros usuarios.</p>
                <div className="submit-button">
                  <button onClick={handleShowDescriptionModal} className="btn btn-primary">Añadir</button>
                </div>
                {isDescriptionModalOpen && (
                  <DescriptionModal 
                  handleSubmit={handleCreateDescription} 
                  initialValues={userDescription}
                  show={handleShowDescriptionModal}
                  handleClose={handleCloseDescriptionModal}
                  handleChange={handleChangeDescription}
                  description={userDescription} />
                )}
              </div>
            ) : (
              <div className="user-description">
                <h4>Descripción</h4>
                <p>{userDescription.description}</p>
                <p>URLs</p>
                {/* <button className="btn btn-success" onClick={handleEditDescription}>Editar</button>
                {isDescriptionModalOpen && (
                  <DescriptionModal 
                  updateDescription={handleUpdateDescription} 
                  initialValues={isEditing ? userDescription : ''}
                  show={handleShowDescriptionModal}
                  handleClose={handleCloseDescriptionModal} />
                )}  */}
              </div>)}
          </div>
        </div>
        <hr />
        <div className="user-profile-skills d-flex justify-content-around">
          <div className="skills-info-container d-flex flex-column mt-2">
            <h5><i className="bi bi-diamond-fill fs-6"></i>Puedes enseñar:</h5>
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
            <h5><i className="bi bi-diamond-fill fs-6"></i>Quieres aprender:</h5>
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

        <div className="card-body posts-ratings-container p-4 text-black mt-3">
          <ul className="nav nav-tabs d-flex align-items-center justify-content-center posts-ratings-buttons border-0" id="myTab">
            <li className="nav-item">
              <a
                className={`me-3 nav-link text-uppercase ${activeTab === "postList" ? "active green-background" : ""}`}
                onClick={() => handleTabClick("postList")}
                id="post-list-tab"
                data-bs-toggle="tab"
                href="#postList"
                role="tab"
                aria-controls="postList"
                aria-selected={activeTab === "postList"}
              >
                Publicaciones
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link text-uppercase ${activeTab === "ratings" ? "active green-background" : ""}`}
                onClick={() => handleTabClick("ratings")}
                id="ratings-tab"
                data-bs-toggle="tab"
                href="#ratings"
                role="tab"
                aria-controls="ratings"
                aria-selected={activeTab === "ratings"}
              >
                Reseñas
              </a>
            </li>
          </ul>
          <div className="tab-content user-detail-posts-container mb-5 mt-3" id="myTabContent">
            <div className={`tab-pane fade ${activeTab === "postList" ? "active show" : ""}`} id="postList" role="tabpanel" aria-labelledby="postList-tab">
              <div className="detail-posts-title">
                <h4>Publicaciones</h4>
                <hr className="border-bottom-title" />
              </div>
              <div className="posts-container">
                {userPostList.length > 0 ? (
                  <div className="row">
                    {userPostList.map((post) => (
                      <div key={post.id} className="detail-posts-container">
                        <PostCard post={post} onDeletePost={() => handleDeletePost(post.id)}/>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="mt-4">Todavía no has hecho ninguna publicación.</p>
                )}
              </div>
            </div>

            <div className={`tab-pane fade ${activeTab === "ratings" ? "active show" : ""}`} id="ratings" role="tabpanel" aria-labelledby="ratings-tab">
              <div className="detail-ratings-title">
                <h4>Reseñas de usuarios</h4>
                <hr className="border-bottom-title" />
              </div>
              {userRatings.length > 0 ? (
                <div className="row">
                  {userRatings.map((rating) => (
                    <div key={rating.id} className="col-12 col-md-6 col-lg-4">
                      <div className="ratings-container">
                        <RatingCard rating={rating} className="" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-4">Todavía no tienes reseñas.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile;