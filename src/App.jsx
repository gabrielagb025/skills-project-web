import './App.css';
import { Route, Routes } from 'react-router-dom';
import { useAuthContext } from './contexts/AuthContext';
import Home from './views/Auth/Home/Home';
import NavBar from './components/NavBar/NavBar';
import Register from './views/Auth/Register/register';
import Login from './views/Auth/Login/Login';
import Profile from './views/currentUser/Profile/Profile';
import Timeline from './views/Timeline/Timeline';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import EditProfile from './views/currentUser/EditProfile/EditProfile';
import UsersList from './views/Users/UsersList/UsersList';
import FilteredUsersList from './views/Users/FilteredUsersList/FilteredUsersList';
import UserDetail from './views/Users/UserDetail/UserDetail';


function App() {

  const { isAuthenticationFetched } = useAuthContext()
  const { user } = useAuthContext()

  return (
    <div className="App">

      {!isAuthenticationFetched ? (
          <p>Loading...</p>
      ):(
        <>
          {user ? <NavBar/> : null }

        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="register" element={<Register/>}/>
          <Route path="login" element={<Login/>}/>
          
          <Route path="/user" element={<ProtectedRoute/>}>
            <Route path="/user/timeline" element={<Timeline/>}/>
            <Route path="/user/users" element={<UsersList/>}/>
            <Route path="/user/users/filtered" element={<FilteredUsersList/>}/>
            <Route path="/user/users/detail/:id" element={<UserDetail/>}/>
            <Route path="/user/profile" element={<Profile/>}/>
            <Route path="/user/edit" element={<EditProfile/>}/>
          </Route>
        </Routes>
      </>
      )}
      
    </div>
  )
}

export default App
