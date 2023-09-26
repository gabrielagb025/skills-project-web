import { useAuthContext } from "../../contexts/AuthContext"

const Profile = () => {
  const { user } = useAuthContext();

  return(
    <div className="Profile">
        <h1>{user.name}</h1>
    </div>
  )
}

export default Profile;