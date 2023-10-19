import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUser } from "../../../services/UserService";
import { getUserPosts } from "../../../services/PostService";
import { createRating, getRatings, deleteRating } from "../../../services/RatingService";
import { getChats, createChat, deleteChat } from "../../../services/Chat.service";
import { useAuthContext } from "../../../contexts/AuthContext";
import { sendFriendRequest, getFriends, getPendingFriendRequests, cancelFriendRequest, getAcceptedFriendRequest } from "../../../services/FriendRequestService";
import { NavLink, useNavigate } from "react-router-dom";
import { getUserDescription } from "../../../services/DescriptionService";
import FriendRequestModal from "../../../components/FriendRequestModal/FriendRequestModal";
import RatingModal from "../../../components/RatingModal/RatingModal";
import RatingCard from "../../../components/RatingCard/RatingCard";
import PostCard from "../../../components/PostCard/PostCard";
import './UserDetail.css';



const ratingInitialValues = {
  message: "",
  score: "1"
}

const friendRequestIntialValues = {
  message: ""
}

const UserDetail = () => {
  const [user, setUser] = useState(null);
  const [newRating, setNewRating] = useState(ratingInitialValues);
  const [friendRequest, setFriendRequest] = useState(friendRequestIntialValues);
  const [ratingList, setRatingList] = useState([]);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [requestSent, setRequestSent] = useState(false);
  const [isFriend, setIsFriend] = useState(false);
  const [madeRequest, setMadeRequest] = useState(false);
  const [haveRequest, setHaveRequest] = useState(false);
  const [acceptedFriendRequest, setAcceptedFriendRequest] = useState(null);
  const [userDescription, setUserDescription] = useState(null);
  const [chatList, setChatList] = useState([]);
  const [showFriendModal, setShowFriendModal] = useState(false);
  const [userPosts , setUserPosts] = useState([]);
  const { id } = useParams();
  const { user: currentUser } = useAuthContext();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("postList");


  useEffect(() => {
    Promise.all([getUser(id), getRatings(id), getFriends(), getPendingFriendRequests(), getAcceptedFriendRequest(id), getChats(), getUserDescription(id), getUserPosts(id)])
      .then(([user, ratings, friends, pendingFriendRequests, acceptedFriendReq, chats, description, userPostList]) => {
        setUser(user);
        setRatingList(ratings);
        setIsFriend(friends.some(f => f.id === user.id));
        setAcceptedFriendRequest(acceptedFriendReq);
        setChatList(chats)
        setUserDescription(description)
        setUserPosts(userPostList)

        const receivedRequest = pendingFriendRequests.find(request => request.userSend === user.id);
        const sentRequest = pendingFriendRequests.find(request => request.userReceive === user.id);

        if (sentRequest) {
          setMadeRequest(true);
        } else if (receivedRequest) {
          setHaveRequest(true);
        }
      })
      .catch(err => {
        console.error(err);
      });
  }, [id]);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  }
  /* RATINGS */

  const handleShowRatingModal = () => {
    setShowRatingModal(true);
  };

  const handleCloseRatingModal = () => {
    setShowRatingModal(false);
  };

  const handleChangeRating = (ev) => {
    const key = ev.target.name;
    const value = ev.target.value;

    setNewRating(prevRating => ({
      ...prevRating,
      [key]: value
    }))
  }

  const handleSubmitRating = (event) => {
    event.preventDefault()
    createRating(id, newRating)
      .then(() => {
        console.log('rating creado')
        setNewRating(ratingInitialValues)
        setShowRatingModal(false)
        getRatings(id)
          .then(ratings => {
            setRatingList(ratings)
          })
      })
      .catch(err => console.error(err))
  }

  const handleDeleteRating = (ratingId) => {
    deleteRating(ratingId)
      .then(() => {
        console.log('rating borrado')
        const filteredRatings = ratingList.filter((rating) => rating.id !== ratingId);
        setRatingList(filteredRatings);
      })
      .catch(err => {
        console.log(err)
      })
  }

  /* FRIEND REQUESTS */

  const handleShowFriendModal = () => {
    setShowFriendModal(true);
  };

  const handleCloseFriendModal = () => {
    setShowFriendModal(false);
  };

  /*const handleShowInput = () => {
    setShowInput(true)
  }*/

  const handleChangeFriendRequest = (ev) => {
    const key = ev.target.name;
    const value = ev.target.value;

    setFriendRequest(prevFriendRequest => ({
      ...prevFriendRequest,
      [key]: value
    }))
  }

  const handleSubmitFriendRequest = (event) => {
    event.preventDefault()

    const userMessage = friendRequest.message;

    if (!userMessage) {
      friendRequest.message = `¡Hola! Me gustaría conectar contigo.`
    }

    sendFriendRequest(id, friendRequest)
      .then(() => {
        console.log('friend request enviado')
        setFriendRequest(friendRequestIntialValues)
        setShowFriendModal(false)
        setRequestSent(true)
        setMadeRequest(true)
      })
      .catch(err => console.error(err))
  }

  const handleCancelFriendRequest = (requestId) => {
    cancelFriendRequest(requestId)
      .then(() => {
        const chat = chatList.find((chat) => {
          return chat.users.some(userObj => userObj.id === user.id);
        });
        if (chat) {
          deleteChat(chat.id)
            .then(() => {
              console.log('chat borrado')
            })
            .catch(err => {
              console.log(err)
            })
        }
        setIsFriend(false);
      })
      .catch(err => {
        console.log(err)
      })
  }

  /* CHAT */

  const handleChatClick = () => {

    const chat = chatList.find((chat) => {
      return chat.users.some(userObj => userObj.id === user.id);
    });

    if (chat) {
      navigate(`/user/chat/${chat.id}`);
    } else {
      createChat(user.id)
        .then((chat) => {
          navigate(`/user/chat/${chat.id}`);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  const handleEventNavigate = () => {
    navigate(`/user/event/${user.id}`);
  }

  return (
    <div className="user-detail-margin">
      <div className="UserDetail">
        {!user ? (
          <p>Loading...</p>
        ) : (
          <>
            {/* INFORMACIÓN DEL USUARIO */}
            <div className="UserDetail detail-container container mt-4">
              <div className="user-detail-header">
                <div className="user-detail-info">
                  <div className="user-detail-img">
                    <img src={user.avatar} alt="" width="300" />
                  </div>
                  <div className="user-detail-text">
                    <h1>{user.name}</h1>
                    <div className="d-flex align-items-center">
                      <i className="bi bi-geo-alt-fill"></i><p>{user.city}</p>
                    </div>
                    {isFriend ? <div className="d-flex align-items-center mt-2"><i className="bi bi-telephone-fill"></i><p>{user.phone}</p></div> : null}
                  </div>
                </div>
                <div className="friend-buttons">
                  {isFriend ? (
                    <>
                      <button className="btn btn-chat mt-4" onClick={handleChatClick}>Chatear</button>
                      <button className="btn btn-noconnect mt-4 ms-3 me-3" onClick={() => handleCancelFriendRequest(acceptedFriendRequest.id)}>Dejar de conectar</button>
                      <button className="btn btn-event mt-4" onClick={handleEventNavigate}>Agendar cita de estudio</button>
                    </>
                  ) : (
                    <>
                      <div className="mt-4">
                        {madeRequest ? (
                          <p>Has enviado una solicitud de amistad a {user.name}.</p>
                        ) : haveRequest ? (
                          <div className="d-flex flex-column align-items-center">
                            <p>Tienes una solicitud de amistad pendiente de {user.name}.</p>
                            <NavLink to="/user/notifications"><button className="btn btn-notifications">Ver solicitudes</button></NavLink>
                          </div>
                        ) : (
                          !madeRequest && (
                            <button className="btn btn-connect" onClick={handleShowFriendModal}>Conectar con {user.name}</button>
                          )
                        )}
                      </div>
                      {showFriendModal &&
                        <div className="friend-request-modal">
                          <FriendRequestModal
                            show={showFriendModal}
                            handleClose={handleCloseFriendModal}
                            handleSubmit={handleSubmitFriendRequest}
                            handleChange={(e) => setFriendRequest({ ...friendRequest, [e.target.name]: e.target.value })}
                            message={friendRequest.message}
                          />
                        </div>}
                    </>
                  )}
                  <div className="rating-form mt-4">
                    <button className="btn btn-rating" onClick={handleShowRatingModal}>
                      Escribir una reseña
                    </button>
                  </div>
                  {/* ... otros elementos */}
                  <RatingModal
                    show={showRatingModal}
                    handleClose={handleCloseRatingModal}
                    handleSubmit={handleSubmitRating}
                    handleChange={(e) =>
                      setNewRating({ ...newRating, [e.target.name]: e.target.value })
                    }
                    newRating={newRating}
                  />
                </div>
              </div>
              <hr />
              <div className="mt-4 profile-info-container">
                {userDescription ? (
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
                  </div>
                ) : (null)}
                <div className="user-detail-skills d-flex justify-content-around">
                  <div className="skills-info-container d-flex flex-column mt-2">
                    <h5><i class="bi bi-diamond-fill"></i>{user.name} puede enseñar:</h5>
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
                    <h5><i class="bi bi-diamond-fill"></i>{user.name} quiere aprender:</h5>
                    {user.learnSkills.map((skill) => (
                      <div key={skill.id}>
                        <div className="skill-name d-flex align-items-center">
                          <p className="fw-bold me-2">{skill.name}</p>-<p className="ms-2">{skill.category}</p>
                        </div>
                        <p className="mt-2">{skill.description}</p>
                      </div >
                    ))}
                  </div>
                </div>
              </div>
              <hr />
            </div>
            <div className="card-body posts-ratings-container p-4 text-black mt-3">
              <ul className="nav nav-tabs posts-ratings-buttons border-0" id="myTab">
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
                  <h4>Publicaciones de {user.name}</h4>
                  <div className="posts-container">
                    {userPosts?.length > 0 ? (
                      <>
                        {userPosts.map((post) => (
                          <PostCard post={post} key={post.id} />
                        ))}
                      </>
                    ) : (
                      <p>{user.name} todavía no ha hecho ninguna publicación.</p>
                    )}
                  </div>
                  <hr />
                </div>

                <div className={`tab-pane fade ${activeTab === "ratings" ? "active show" : ""}`} id="ratings" role="tabpanel" aria-labelledby="ratings-tab">
                  <h4>Reseñas acerca de {user.name}</h4>
                  {ratingList.length > 0 ? (
                    <>
                      {ratingList.map((rating) => (
                        <div className="ratings-container" key={rating.id} >
                          <RatingCard rating={rating} handleDeleteRating={handleDeleteRating} />
                        </div>
                      ))}
                    </>
                  ) : (
                    <p>{user.name} todavía no tiene reseñas.</p>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div >
  )
}

export default UserDetail;


{/* PUBLICACIONES
              <h4>Publicaciones de {user.name}</h4>
              <div className="posts-container">
                {user.posts?.length > 0 ? (
                  <>
                    {user.posts.map((post) => (
                      <div className="post-container" key={post.id}>
                        <p>{post.message}</p>
                      </div>
                    ))}
                  </>
                ) : (
                  <p>{user.name} todavía no ha hecho ninguna publicación.</p>
                )}
              </div>
              <hr />
            </div>
            LISTA DE RESEÑAS
            <div className="rating-list container mt-4">
              <h4>Reseñas acerca de {user.name}</h4>
              {ratingList.length > 0 ? (
                <>
                  {ratingList.map((rating) => (
                    <div className="ratings-container" key={rating.id} >
                      <RatingCard rating={rating} handleDeleteRating={handleDeleteRating} />
                    </div>
                  ))}
                </>
              ) : (
                <p>{user.name} todavía no tiene reseñas.</p>
              )}
            </div> */}