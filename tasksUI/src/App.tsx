import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './Parts/Login'
import Register from './Parts/Register'
import Home from './Parts/Home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <span className='Header'>Task Manager</span>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path='/' element={<Home />} />
      </Routes>
    </>
  )
}

export default App
