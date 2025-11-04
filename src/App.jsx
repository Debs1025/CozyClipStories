import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Landing from './pages/Landing.jsx'



const App = () => {
  return (
    <div>

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="*" element={<Navigate to="/" replace />} />
   
        
      </Routes>
    </div>
  )
}

export default App