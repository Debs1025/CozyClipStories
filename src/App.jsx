import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Landing from './pages/Landing.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import ForgotPassword from './pages/Forgotpass.jsx'
import DashboardLayout from './pages/DashboardLayout.jsx'
import DashboardHome from './components/DashboardHome.jsx'
import QuizGame from './components/QuizGame.jsx'
import WordHelper from './components/Wordhelper.jsx'
import Sidebar from './components/Sidebar.jsx'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      
      <Route path="/dashboardlayout" element={<DashboardLayout />}>
        <Route index element={<DashboardHome />} />
        <Route path="quiz-game" element={<QuizGame />} />
        <Route path="word-helper" element={<WordHelper />} />
      </Route>
      
      {/* <Route path="*" element={<Navigate to="/" />} /> */}
    </Routes>
  )
}

export default App