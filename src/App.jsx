import React from 'react'
import './index.css'
import { Routes, Route, Link } from 'react-router-dom'
import Nav from './home/nav.jsx'
import Hero from './home/hero.jsx'
import Login from './home/login.jsx'
function App() {
  return (
    <>
    <Nav />

      <Routes>
         <Route path="/" element={<Hero />} />
        {/* <Route path="/trees" element={<Complaint />} />
        <Route path="/about" element={<About />} /> */}
        {/* <Route path="/contact" element={<Contact />} /> * */}
        <Route path="/login" element={<Login />} />
{/*         
        <Route path="/get-started" element={<SignUp />} /> */}
      </Routes>
      
    
    

      
    </>
  )
}

export default App
