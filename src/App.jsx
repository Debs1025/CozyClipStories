import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Landing from './pages/Landing.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import ForgotPassword from './pages/Forgotpass.jsx'
import DashboardLayout from './pages/DashboardLayout.jsx'
import DashboardHome from './components/DashboardHome.jsx'
import QuizGame from './components/Quizgame.jsx'
import WordHelper from './components/Wordhelper.jsx'
import Sidebar from './components/Sidebar.jsx'
import Library from './pages/Library.jsx'
import Read from './pages/Read.jsx'
import Bookmarks from './components/Bookmarks.jsx'
import Quiz from './pages/Quiz.jsx'

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
        <Route path="bookmarks" element={<Bookmarks/>} />
      </Route>

       <Route path="library" element={<Library />} />
       <Route path="/read" element={<Read />} />
      <Route path="/quiz" element={<Quiz />} />
      
    </Routes>
  )
}

export default App