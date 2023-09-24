import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './views/Home/Home'
import Register from './views/Register/Register'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="register" element={<Register/>}/>
      </Routes>
    </>
  )
}

export default App
