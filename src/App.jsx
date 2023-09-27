import './App.css';
import { Route, Routes } from 'react-router-dom';
import { useAuthContext } from './contexts/AuthContext';
import Home from './views/Home/Home';
import NavBar from './components/NavBar/NavBar';
import Register from './views/Register/Register';
import Login from './views/Login/Login';
import Profile from './views/Profile/Profile';
import Timeline from './views/Timeline/Timeline';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import EditProfile from './views/EditProfile/EditProfile';
import UsersList from './views/UsersList/UsersList';
import FilteredUsersList from './views/FilteredUsersList/FilteredUsersList';


function App() {

  const { user } = useAuthContext()

  return (
    <div className="App">
      
      {user ? <NavBar/> : null }

      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="register" element={<Register/>}/>
        <Route path="login" element={<Login/>}/>
        
          <Route path="/user/timeline" element={<Timeline/>}/>
          <Route path="/user/users" element={<UsersList/>}/>
          <Route path="/user/users/filtered" element={<FilteredUsersList/>}/>
          <Route path="/user/profile" element={<Profile/>}/>
          <Route path="/user/edit" element={<EditProfile/>}/>
      </Routes>
    </div>
  )
}

export default App
