import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUser } from "../../services/UserService";

const UserDetail = () => {
    const [ user, setUser ] = useState(null);
    const { id } = useParams();

    console.log(id);

    useEffect(() => {
        console.log('se ejecuta useEffect')
        getUser(id)
            .then(user => {
                console.log(user)
                setUser(user)
            })
            .catch(err => {
                console.log(err)
            })
    }, [id])


    return(
        <div className="UserDetail">
            {!user ? (
                <p>Loading...</p>
            ) : (
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
              </div>  
            )}
            
        </div>
    )
}

export default UserDetail;