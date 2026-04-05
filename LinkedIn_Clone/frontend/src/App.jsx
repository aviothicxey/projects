// File: frontend/src/App.jsx
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'

const App = () => {
  return (
    
    <Routes>
      <Route path='/signup' element={<SignUp/>} />
      <Route path='/' element={<Home/>} />
      <Route path='/login' element={<Login/>} />
      
    </Routes>
  )
}

export default App