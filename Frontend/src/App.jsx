import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import Home from '../pages/Home.jsx'

import { useAuthStore } from '../store/auth.js'

function ProtectedRoute({ children, role }) {
  const { isAuthenticated, user } = useAuthStore()
  if (!isAuthenticated) return <Navigate to="/signin" replace />
  if (role && user?.role !== role) return <Navigate to="/" replace />
  return children
}

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
       
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
