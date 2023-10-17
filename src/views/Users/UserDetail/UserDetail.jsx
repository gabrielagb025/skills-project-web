import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUser } from "../../../services/UserService";
import { createRating, getRatings, deleteRating } from "../../../services/RatingService";
import { getChats, createChat, deleteChat } from "../../../services/Chat.service";
import { useAuthContext } from "../../../contexts/AuthContext";
import InputGroup from "../../../components/InputGroup/InputGroup";
import { sendFriendRequest, getFriends, getPendingFriendRequests, cancelFriendRequest, getAcceptedFriendRequest } from "../../../services/FriendRequestService";
import { NavLink, useNavigate } from "react-router-dom";
import { getUserDescription } from "../../../services/DescriptionService";



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
  const [showInput, setShowInput] = useState(false);
  const [requestSent, setRequestSent] = useState(false);
  const [isFriend, setIsFriend] = useState(false);
  const [madeRequest, setMadeRequest] = useState(false);
  const [haveRequest, setHaveRequest] = useState(false);
  const [acceptedFriendRequest, setAcceptedFriendRequest] = useState(null);
  const [userDescription, setUserDescription] = useState(null);
  const [chatList, setChatList] = useState([]);
  const { id } = useParams();
  const { user: currentUser } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([getUser(id), getRatings(id), getFriends(), getPendingFriendRequests(), getAcceptedFriendRequest(id), getChats(), getUserDescription(id)])
      .then(([user, ratings, friends, pendingFriendRequests, acceptedFriendReq, chats, description]) => {
        setUser(user);
        setRatingList(ratings);
        setIsFriend(friends.some(f => f.id === user.id));
        setAcceptedFriendRequest(acceptedFriendReq);
        setChatList(chats)
        setUserDescription(description)

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


  /* RATINGS */

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

  const handleShowInput = () => {
    setShowInput(true)
  }

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

    if(!userMessage) {
      friendRequest.message = `¡Hola! Me gustaría conectar contigo.`
    }

    sendFriendRequest(id, friendRequest)
      .then(() => {
        console.log('friend request enviado')
        setFriendRequest(friendRequestIntialValues)
        setShowInput(false)
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
    <div className="UserDetail">
      {!user ? (
        <p>Loading...</p>
      ) : (
        <>
          {/* INFORMACIÓN DEL USUARIO */}
          <div className="UserDetail detail-container container">
            <div className="mt-5">
              <img src={user.avatar} alt="" width="300" />
            </div>
            {isFriend ? (
              <>
                <button className="btn btn-secondary mt-4" onClick={handleChatClick}>Chatear con {user.name}</button>
                <button className="btn btn-danger mt-4 ms-3" onClick={() => handleCancelFriendRequest(acceptedFriendRequest.id)}>Dejar de conectar con {user.name}</button>
                <button className="btn btn-success mt-4" onClick={handleEventNavigate}>Agendar cita de estudio con {user.name}</button>
              </>
            ) : (
              <>
                <div className="mt-4">
                  {madeRequest ? (
                    <p>Has enviado una solicitud de amistad a {user.name}.</p>
                  ) : haveRequest ? (
                    <>
                      <p>Tienes una solicitud de amistad pendiente de {user.name}.</p>
                      <NavLink to="/user/notifications"><button className="btn btn-primary">Ver solicitudes</button></NavLink>
                    </>
                  ) : (
                    !madeRequest && (
                      <button className="btn btn-success" onClick={handleShowInput}>Conectar con {user.name}</button>
                    )
                  )}
                </div>
                {showInput &&
                  <div>
                    <form onSubmit={handleSubmitFriendRequest}>
                      <InputGroup
                        label={`Envía un mensaje a ${user.name}`}
                        type="text"
                        id="message"
                        name="message"
                        placeholder="!Hola! Me gustaría conectar contigo."
                        value={friendRequest.message}
                        onChange={handleChangeFriendRequest} />
                      <button type="submit" className="btn btn-primary">Enviar petición</button>
                    </form>
                  </div>}
              </>
            )}
            <div className="mt-4 profile-info-container">
              <h1>{user.name}</h1>
              <p>{user.city}</p>
              {isFriend ? <p>{user.phone}</p> : null}
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
              <h4>Habilidades que {user.name} puede enseñar:</h4>
              {user.teachSkills.map((skill) => (
                <div key={skill.id}>
                  <h5>{skill.name}</h5>
                  <p>{skill.category}</p>
                  <p>{skill.description}</p>
                </div>
              ))}
              <h4>Habilidades que {user.name} quiere aprender:</h4>
              {user.learnSkills.map((skill) => (
                <div key={skill.id}>
                  <h5>{skill.name}</h5>
                  <p>{skill.description}</p>
                </div >
              ))}
            </div>
            {/* PUBLICACIONES */}
            <div className="posts-container">
              {user.posts?.length > 0 ? (
                <>
                  <h4>Publicaciones de {user.name}</h4>
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
            {/* FORMULARIO DE RESEÑAS */}
            <div className="rating-form">
              <form onSubmit={handleSubmitRating}>
                <h4>Deja una reseña sobre {user.name}</h4>
                <div className="mb-3">
                  <label id="rating-message" className="form-label">Comentario</label>
                  <input onChange={handleChangeRating} id="rating-message" type="text" name="message" className="form-control" value={newRating.message} placeholder="Comentario" />
                </div>
                <div className="mb-3">
                  <label id="rating-score" className="form-label">Valoración</label>
                  <input onChange={handleChangeRating} id="rating-score" type="number" name="score" className="form-control" value={newRating.score} />
                </div>
                <button type="submit" className="btn btn-primary">Enviar</button>
              </form>
            </div>
          </div>
          {/* LISTA DE RESEÑAS */}
          <div className="rating-list container mt-4">
            {ratingList.length > 0 ? (
              <>
                <h4>Reseñas acerca de {user.name}</h4>
                {ratingList.map((rating) => (
                  <div key={rating.id} className="rating-container mt-4">
                    <img src={rating.currentUser.avatar} alt="" width="100" />
                    <p>{rating.currentUser.name}</p>
                    <p>{rating.message}</p>
                    <p>{rating.score}</p>
                    <p>{rating.date}</p>
                    {rating.currentUser.id === currentUser.id ? (
                      <button className="btn btn-danger" onClick={() => handleDeleteRating(rating.id)}>Borrar</button>
                    ) : (
                      null
                    )}
                  </div>
                ))}
              </>
            ) : (
              <p>{user.name} todavía no tiene reseñas.</p>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default UserDetail;