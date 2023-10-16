import './UserCard.css';
import { Link } from 'react-router-dom';

const UserCard = (user) => {
    return (
        <div className="card card-user mt-4" style={{ width: '100%' }}>
            <div className="info-user-card row no-gutters">
                <div className="photo-name-container">
                    <div className="card-img-container">
                        <img src={user.avatar} className="user-img" alt="..."/>
                    </div>
                    <div className="ms-3">
                        <h3 className="card-title">{user.name}</h3>
                        <p className="card-text"><i className="bi bi-geo-alt-fill"></i>{user.city}</p>
                    </div>
                </div>
                <div className="col-md-8 d-flex flex-column align-items-center">
                    <div className="mt-2 skills-user-card card-body">
                        <h5 className="card-text"><i className="bi bi-pen-fill"></i>{user.name}<br /> puede enseñar:</h5>
                        {user.teachSkills.map((skill) => (
                            <p key={skill.id}>- {skill.name}</p>
                        ))}
                        <h5 className="card-text mt-4"><i className="bi bi-pen-fill"></i>{user.name}<br />  quiere aprender:</h5>
                        {user.learnSkills.map((skill) => (
                            <p key={skill.id}>- {skill.name}</p>
                        ))}
                        <div className="mt-4 submit-button">
                        <Link to={`/user/users/detail/${user.id}`}><button className="btn">Ver perfil</button></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserCard;