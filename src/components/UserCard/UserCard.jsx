import './UserCard.css'

const UserCard = (user) => {
    return (
        <div className="card mt-4" style={{ width: '100%' }}>
            <div className="row no-gutters">
                <div className="col-md-4 d-flex align-items-center">
                    <div className="card-img-container">
                        <img src={user.avatar} className="card-img user-img" alt="..."/>
                    </div>
                    <div className="ms-3">
                        <h3 className="card-title">{user.name}</h3>
                        <p className="card-text">{user.city}</p>
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-text">{user.name} puede enseñar:</h5>
                        {user.teachSkills.map((skill) => (
                            <p key={skill.id}>{skill.name}</p>
                        ))}
                        <h5 className="card-text">{user.name} quiere aprender:</h5>
                        {user.learnSkills.map((skill) => (
                            <p key={skill.id}>{skill.name}</p>
                        ))}
                        <a href="#" className="btn btn-primary">Ver más</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserCard;