import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/homepage'
import GamePage from './pages/gamepage'
import './app.css'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-purple-800">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/game" element={<GamePage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App