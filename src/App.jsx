import React from 'react'
import './index.css'
import { Routes, Route, Link } from 'react-router-dom'
import Nav from './home/nav.jsx'
import Hero from './home/hero.jsx'
import Login from './home/login.jsx'
import About from './about/Mainabout.jsx'
function App() {
  return (
    <>
    <Nav />

      <Routes>
         <Route path="/" element={<Hero />} />
          <Route path="/about" element={< About />} />
        
        <Route path="/login" element={<Login />} />
        
     
      </Routes>
      
    
    

      
    </>
  )
}

export default App
