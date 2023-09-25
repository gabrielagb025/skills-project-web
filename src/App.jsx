import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './views/Home/Home'
/* Auth */
import Register from './views/Register/Register'
import Login from './views/Login/Login'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="register" element={<Register/>}/>
        <Route path="login" element={<Login/>}/>
      </Routes>
    </>
  )
}

export default App
