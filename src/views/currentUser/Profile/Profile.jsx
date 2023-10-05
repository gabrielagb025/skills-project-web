import './Profile.css'
import { useAuthContext } from "../../../contexts/AuthContext"
import { useState, useEffect } from 'react';

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
        {user.teachSkills.map((skill) => (
          <div key={skill.id}>
            <h5>{skill.name}</h5>
            <p>{skill.category}</p>
            <p>{skill.description}</p>
          </div>
        ))}
        <h4>Habilidades que quieres aprender:</h4>
        {user.learnSkills.map((skill) => (
          <div key={skill.id}>
            <h5>{skill.name}</h5>
            <p>{skill.category}</p>
            <p>{skill.description}</p>
          </div >
        ))}
      </div>
      <div className="profile-container">
        <h4>Tus publicaciones</h4>
        {user.posts.map((post) => (
          <div className="post-container" key={post.id}>
            <p>{post.message}</p>
            {post.multimedia.map((image) => (
              <img className="me-2" src={image} width={100}/>
            ))}
            <p>{post.date}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Profile;