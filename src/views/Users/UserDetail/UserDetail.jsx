import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUser } from "../../../services/UserService";
import { createRating, getRatings, deleteRating } from "../../../services/RatingService";
import { useAuthContext } from "../../../contexts/AuthContext";


const initialValues = {
  message: "",
  score: "1"
}

const UserDetail = () => {
  const [user, setUser] = useState(null);
  const [newRating, setNewRating] = useState(initialValues);
  const [ratingList, setRatingList] = useState([]);
  const { id } = useParams();
  const { user: currentUser } = useAuthContext();

  useEffect(() => {
    console.log('se ejecuta useEffect');

    Promise.all([getUser(id), getRatings(id)])
      .then(([user, ratings]) => {
        console.log(user);
        setUser(user);
        setRatingList(ratings);
      })
      .catch(err => {
        console.error(err);
      });
  }, [id]);


  const handleChange = (ev) => {
    const key = ev.target.name;
    const value = ev.target.value;

    setNewRating(prevRating => ({
      ...prevRating,
      [key]: value
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    createRating(id, newRating)
      .then(() => {
        console.log('rating creado')
        setNewRating(initialValues)
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

  return (
    <div className="UserDetail">
      {!user ? (
        <p>Loading...</p>
      ) : (
        /* INFORMACIÓN DEL USUARIO */
        <div className="UserDetail detail-container container">
          <div className="mt-5">
            <img src={user.avatar} alt="" width="300" />
          </div>
          <div className="mt-4 profile-info-container">
            <h1>{user.name}</h1>
            <p>{user.description}</p>
            <p>{user.city}</p>
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
          {/* FORMULARIO DE RESEÑAS */}
          <div className="rating-form">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label id="rating-message" className="form-label">Deja un comentario sobre {user.name}</label>
                <input onChange={handleChange} id="rating-message" type="text" name="message" className="form-control" value={newRating.message} placeholder="Comentario..."/>
              </div>
              <div className="mb-3">
                <label id="rating-score" className="form-label">Valoración</label>
                <input onChange={handleChange} id="rating-score" type="number" name="score" className="form-control" value={newRating.score}/>
              </div>
              <button type="submit" className="btn btn-primary">Enviar</button>
            </form>
          </div>
        </div>
      )}
      {/* LISTA DE RESEÑAS */}
      <div className="rating-list container mt-4">
        {ratingList.length > 0 ? (
          <>
            <h1>Reseñas de {user.name}</h1>
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
          <p>Este usuario todavía no tiene reseñas.</p>
        )}
      </div>
    </div>
  )
}

export default UserDetail;