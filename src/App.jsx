import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './views/Home/Home'
import NavBar from './components/NavBar/NavBar'
/* Auth */
import Register from './views/Register/Register'
import Login from './views/Login/Login'

function App() {

  return (
    <div className="App">
      <NavBar/>
      
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="register" element={<Register/>}/>
        <Route path="login" element={<Login/>}/>
      </Routes>
    </div>
  )
}

export default App
