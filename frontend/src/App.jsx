import React from 'react'
import ProfileScreen from './pages/profileScreen.jsx'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/profile-screen" element={<ProfileScreen />} />
        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

export default App
