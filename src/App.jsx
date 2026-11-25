import React from 'react'
import './index.css'
import { Routes, Route } from 'react-router-dom'
import Nav from './home/nav.jsx'
import Hero from './home/hero.jsx'
import Login from './home/login.jsx'
import About from './about/Mainabout.jsx'
import Complaint from './complaint/complaint.jsx'
import HowWork from './home/howwork.jsx'
import Footer from './home/footer.jsx'
import Profile from './profile.jsx'
import DashboardStaff from './dashboardstaff.jsx'

function App() {
  return (
    <>
      <Nav />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <HowWork />
              <Footer />
            </>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/complaint" element={<Complaint />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<DashboardStaff />}/>
      </Routes>
    </>
  )
}

export default App