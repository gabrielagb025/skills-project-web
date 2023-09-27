import './Profile.css'
import { useAuthContext } from "../../contexts/AuthContext"

const Profile = () => {
  const { user } = useAuthContext();

  return (
    <div className="Profile profile-container container">
      <div className="mt-5">
        <img src={user.avatar} alt="" width="300" />
      </div>
      <div className="mt-4 profile-info-container">
        <h1>{user.name}</h1>
        <p>{user.description}</p>
        <p>{user.city}</p>
        <h4>Habilidades que puedes enseñar:</h4>
        {console.log(user.teachSkills)}
        {user.teachSkills.map((skill) => (
          <>
            <h5 key={skill.id}>{skill.name}</h5>
            <p>{skill.category}</p>
            <p>{skill.description}</p>
          </>
        ))}
        <h4>Habilidades que quieres aprender:</h4>
        {user.learnSkills.map((skill) => (
          <>
            <h5 key={skill.id}>{skill.name}</h5>
            <p>{skill.description}</p>
          </>
        ))}
      </div>
    </div>
  )
}

export default Profile;