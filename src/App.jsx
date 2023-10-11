import './App.css';
import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useAuthContext } from './contexts/AuthContext';
import Home from './views/Auth/Home/Home';
import NavBar from './components/NavBar/NavBar';
import Register from './views/Auth/Register/Register';
import Login from './views/Auth/Login/Login';
import Profile from './views/currentUser/Profile/Profile';
import Timeline from './views/Timeline/Timeline';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import EditProfile from './views/currentUser/EditProfile/EditProfile';
import UsersList from './views/Users/UsersList/UsersList';
import FilteredUsersList from './views/Users/FilteredUsersList/FilteredUsersList';
import UserDetail from './views/Users/UserDetail/UserDetail';
import ChooseSkills from './views/currentUser/ChooseSkills/ChooseSkills';
import Notifications from './views/currentUser/Notificacions/Notifications';
import Friends from './views/Users/Friends/Friends';
import ChatsView from './views/Chat/AllChats/AllChats';
import Conversation from './views/Chat/Conversation/Conversation';


function App() {

  const { isAuthenticationFetched, user } = useAuthContext();
  const userHasSkills = user && user.teachSkills.length > 0 && user.learnSkills.length > 0;
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticationFetched) {
      if (user) {
        if (!userHasSkills) {
          navigate("/user/skills");
        }
      }
    }
  }, [isAuthenticationFetched, user, userHasSkills, navigate]);
  

  return (
    <div className="App">

      {!isAuthenticationFetched ? (
        <p>Loading...</p>
      ) : (
        <>
          {user ? <NavBar /> : null}

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />

            <Route path="/user" element={<ProtectedRoute />}>
              <Route path="/user/timeline" element={<Timeline />} />
              <Route path="/user/users" element={<UsersList />} />
              <Route path="/user/users/filtered" element={<FilteredUsersList />} />
              <Route path="/user/users/detail/:id" element={<UserDetail />} />
              <Route path="/user/notifications" element={<Notifications />} />
              <Route path="/user/friends" element={<Friends />} />
              <Route path="/user/chats" element={<ChatsView />} />
              <Route path="/user/chat/:id" element={<Conversation />} />
              <Route path="/user/profile" element={<Profile />} />
              <Route path="/user/skills" element={<ChooseSkills />} />
              <Route path="/user/edit" element={<EditProfile />} />
            </Route>
          </Routes>
        </>
      )}

    </div>
  )
}

export default App
