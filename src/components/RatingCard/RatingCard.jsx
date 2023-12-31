import { useAuthContext } from '../../contexts/AuthContext';
import { format } from 'date-fns';
import Star from '../Star/Star';
import { NavLink } from 'react-router-dom';
import './RatingCard.css';

const RatingCard = ({ rating, handleDeleteRating }) => {

    const { user: currentUser } = useAuthContext();

    return (
        <div key={rating.id} className="rating-container mt-4">
            <div className="rating-user-info d-flex align-items-center">
                <NavLink to={rating.currentUser.id === currentUser.id ? '/user/profile' : `/user/users/detail/${rating.currentUser.id}`}><img src={rating.currentUser.avatar} className="me-4" alt="" width="100"/></NavLink>
                <NavLink style={{ textDecoration: 'none', color: "#3F423B" }} to={rating.currentUser.id === currentUser.id ? '/user/profile' : `/user/users/detail/${rating.currentUser.id}`}><h5>{rating.currentUser.name}</h5></NavLink>
            </div>
            <hr />
            <div className="rating-message-score">
                <div className="rating-message">
                <p>{rating.message}</p>
                </div>
                <div className="star-rating d-flex align-items-start">
                {[...Array(rating.score)].map((_, index) => (
                                <Star
                                    key={index}
                                    selected={true}
                                />
                            ))}
                </div>
            </div>
            <div className="mt-2 rating-date-deletebtn d-flex justify-content-between align-items-center">
                <p>{format(new Date(rating.date), "dd/MM/yyyy HH:mm")}</p>
                {rating.currentUser.id === currentUser.id ? (
                    <button className="btn btn-danger" onClick={() => handleDeleteRating(rating.id)}><i className="bi bi-trash fs-6 me-2"></i>Borrar</button>
                ) : (
                    null
                )}
            </div>
        </div>
    )
}

export default RatingCard;