import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import Resources from './pages/Resources'
import Therapy from './pages/Therapy'
import Activities from './pages/Activities'
import Auth from './pages/Auth'
import Homepage from './pages/Homepage'
import Appointments from './pages/Appointments'
import { useEffect, useState } from 'react'
import { isLoggedIn, setToken } from './lib/auth'

function Layout({ children }) {
  const [logged, setLogged] = useState(isLoggedIn())
  const [isScrolled, setIsScrolled] = useState(false)
  
  useEffect(() => {
    const handler = () => setLogged(isLoggedIn())
    window.addEventListener('auth-changed', handler)
    return () => window.removeEventListener('auth-changed', handler)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 text-gray-800">
      {/* Enhanced Header with smooth animations */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200' 
          : 'bg-white/70 backdrop-blur-sm'
      }`}>
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo with animation */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center float-animation">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Mindful
            </h1>
          </div>
          
          {/* Enhanced Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <NavLink 
              to="/" 
              end 
              className={({isActive}) => 
                `px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  isActive 
                    ? 'bg-blue-100 text-blue-700 shadow-sm' 
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`
              }
            >
              🏠 Home
            </NavLink>
            <NavLink 
              to="/appointments" 
              className={({isActive}) => 
                `px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  isActive 
                    ? 'bg-blue-100 text-blue-700 shadow-sm' 
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`
              }
            >
              📅 Appointments
            </NavLink>
            <NavLink 
              to="/resources" 
              className={({isActive}) => 
                `px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  isActive 
                    ? 'bg-blue-100 text-blue-700 shadow-sm' 
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`
              }
            >
              📚 Resources
            </NavLink>
            <NavLink 
              to="/therapy" 
              className={({isActive}) => 
                `px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  isActive 
                    ? 'bg-blue-100 text-blue-700 shadow-sm' 
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`
              }
            >
              💬 Therapy
            </NavLink>
            <NavLink 
              to="/activities" 
              className={({isActive}) => 
                `px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  isActive 
                    ? 'bg-blue-100 text-blue-700 shadow-sm' 
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`
              }
            >
              🎮 Activities
            </NavLink>
          </nav>

          {/* Auth Button */}
          <div className="flex items-center space-x-3">
            {!logged ? (
              <NavLink 
                to="/auth" 
                className="btn-primary flex items-center space-x-2"
              >
                <span>🔐</span>
                <span>Login</span>
              </NavLink>
            ) : (
              <button 
                onClick={() => setToken('')} 
                className="btn-secondary flex items-center space-x-2"
              >
                <span>👋</span>
                <span>Logout</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main content with smooth transitions */}
      <main className="pt-20 min-h-screen">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="page-enter-active">
            {children}
          </div>
        </div>
      </main>

      {/* Floating Action Button for mobile */}
      <div className="fixed bottom-6 right-6 md:hidden">
        <button className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-lg flex items-center justify-center text-white text-2xl hover:scale-110 transition-transform duration-300">
          ☰
        </button>
      </div>
    </div>
  )
}

 

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Homepage/>} />
          <Route path="/appointments" element={<Appointments/>} />
          <Route path="/resources" element={<Resources/>} />
          <Route path="/therapy" element={<Therapy/>} />
          <Route path="/activities" element={<Activities/>} />
          <Route path="/auth" element={<Auth/>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
