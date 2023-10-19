import { useAuthContext } from '../../contexts/AuthContext';
import { format } from 'date-fns';
import Star from '../Star/Star';
import './RatingCard.css';

const RatingCard = ({ rating, handleDeleteRating }) => {

    const { user: currentUser } = useAuthContext();

    return (
        <div key={rating.id} className="rating-container mt-4">
            <div className="rating-user-info d-flex align-items-center">
                <img src={rating.currentUser.avatar} alt="" width="100" />
                <h5 className="ms-3">{rating.currentUser.name}</h5>
            </div>
            <div className="rating-message-score mt-3">
                <p>{rating.message}</p>
                <div className="star-rating">
                {[...Array(rating.score)].map((_, index) => (
                                <Star
                                    key={index}
                                    selected={true}
                                />
                            ))}
                </div>
            </div>
            <div className="rating-date-deletebtn d-flex justify-content-between align-items-center">
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