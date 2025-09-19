import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import MoodQuestionnaire from '../components/MoodQuestionnaire'
import FaceEmotionDetector from '../components/FaceEmotionDetector'
import { isLoggedIn } from '../lib/auth'

export default function Homepage() {
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [showQuestionnaire, setShowQuestionnaire] = useState(false)
  const [activeTab, setActiveTab] = useState('emotion')
  const [emotionReport, setEmotionReport] = useState(null)

  // Dynamic stats functions
  const getDaysTracked = () => {
    const moodData = JSON.parse(localStorage.getItem('moodData') || '[]')
    const uniqueDays = new Set(moodData.map(entry => new Date(entry.date).toDateString())).size
    return uniqueDays
  }

  const getMoodEntries = () => {
    const moodData = JSON.parse(localStorage.getItem('moodData') || '[]')
    return moodData.length
  }

  const getTherapySessions = () => {
    const therapyData = JSON.parse(localStorage.getItem('therapyData') || '[]')
    return therapyData.length
  }

  const getActivitiesCompleted = () => {
    const activityData = JSON.parse(localStorage.getItem('activityData') || '[]')
    return activityData.length
  }

  // Authentication check
  useEffect(() => {
    const checkAuth = () => {
      const loggedIn = isLoggedIn()
      setIsAuthenticated(loggedIn)
      setLoading(false)
      
      if (!loggedIn) {
        navigate('/auth')
      }
    }

    checkAuth()
    
    // Listen for auth changes
    const handleAuthChange = () => {
      checkAuth()
    }
    
    window.addEventListener('auth-changed', handleAuthChange)
    
    return () => {
      window.removeEventListener('auth-changed', handleAuthChange)
    }
  }, [navigate])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null // Will redirect to auth
  }

  const handleEmotionDetected = (emotion) => {
    const activities = {
      happy: ['Share your joy with others', 'Try a new hobby', 'Help someone else', 'Practice gratitude'],
      sad: ['Take a warm bath', 'Listen to uplifting music', 'Call a friend', 'Go for a walk'],
      angry: ['Practice deep breathing', 'Try physical exercise', 'Write in a journal', 'Take a break'],
      neutral: ['Try something new', 'Read a book', 'Practice mindfulness', 'Connect with nature'],
      stressed: ['Do breathing exercises', 'Take a short walk', 'Listen to calming music', 'Practice meditation']
    }

    const professionalHelp = ['sad', 'angry', 'stressed'].includes(emotion)

    setEmotionReport({
      emotion,
      activities: activities[emotion] || activities.neutral,
      professionalHelp
    })
  }

  return (
    <div className="space-y-12">
      {/* Enhanced Hero Section with animations */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 opacity-10"></div>
        <div className="relative text-center py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <div className="inline-block p-4 bg-white/20 backdrop-blur-sm rounded-full mb-6 float-animation">
                <span className="text-4xl">🧠</span>
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Welcome to Mindful
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Your personal mental health companion for tracking, understanding, and improving your wellbeing
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
              <button
                onClick={() => setShowQuestionnaire(true)}
                className="btn-primary flex items-center justify-center space-x-2 text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <span>📋</span>
                <span>Take Mood Assessment</span>
              </button>
              <button
                onClick={() => setActiveTab('emotion')}
                className={`flex items-center justify-center space-x-2 text-lg px-8 py-4 rounded-xl font-medium transition-all duration-300 ${
                  activeTab === 'emotion'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50'
                }`}
              >
                <span>📷</span>
                <span>Face Emotion Detection</span>
              </button>
            </div>
            
            {/* Floating elements */}
            <div className="absolute top-10 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 float-animation" style={{animationDelay: '0s'}}></div>
            <div className="absolute top-20 right-20 w-16 h-16 bg-purple-200 rounded-full opacity-20 float-animation" style={{animationDelay: '1s'}}></div>
            <div className="absolute bottom-20 left-20 w-12 h-12 bg-pink-200 rounded-full opacity-20 float-animation" style={{animationDelay: '2s'}}></div>
          </div>
        </div>
      </div>

      {/* Enhanced Questionnaire Modal */}
      {showQuestionnaire && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl transform animate-slideUp">
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Mood Assessment
                  </h2>
                  <p className="text-gray-600 mt-2">Take a moment to reflect on your current state</p>
                </div>
                <button
                  onClick={() => setShowQuestionnaire(false)}
                  className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-700 transition-all duration-300"
                >
                  <span className="text-xl">×</span>
                </button>
              </div>
              <MoodQuestionnaire 
                onSubmit={(report) => {
                  console.log('Mood report:', report)
                  setShowQuestionnaire(false)
                }} 
              />
            </div>
          </div>
        </div>
      )}

      {activeTab === 'emotion' && (
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="card p-6">
            <FaceEmotionDetector onEmotionDetected={handleEmotionDetected} />
          </div>
          
          {emotionReport && (
            <div className="card p-8 animate-slideIn">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xl">📊</span>
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Emotion Analysis Report
                </h3>
              </div>
              
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl">
                  <h4 className="font-semibold text-gray-700 mb-2">Detected Emotion:</h4>
                  <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent capitalize">
                    {emotionReport.emotion}
                  </p>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl">
                  <h4 className="font-semibold text-gray-700 mb-4 flex items-center space-x-2">
                    <span>💡</span>
                    <span>Suggested Activities:</span>
                  </h4>
                  <ul className="space-y-3">
                    {emotionReport.activities.map((activity, index) => (
                      <li key={index} className="flex items-center space-x-3 text-gray-700">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>{activity}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {emotionReport.professionalHelp && (
                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-400 p-6 rounded-xl">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-2xl">⚠️</span>
                      <h4 className="font-semibold text-yellow-800">Consider Professional Help</h4>
                    </div>
                    <p className="text-yellow-700">
                      Based on your emotional state, you might benefit from speaking with a mental health professional.
                    </p>
                  </div>
                )}

                <button
                  onClick={() => setEmotionReport(null)}
                  className="w-full btn-secondary flex items-center justify-center space-x-2"
                >
                  <span>🗑️</span>
                  <span>Clear Report</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Enhanced Features Overview */}
      <div className="grid md:grid-cols-3 gap-8">
        <div className="card p-8 text-center interactive-hover group">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
            <span className="text-2xl">📊</span>
          </div>
          <h3 className="text-xl font-bold mb-4 text-gray-800">Track Your Mood</h3>
          <p className="text-gray-600 leading-relaxed">
            Log your daily emotions and see trends over time with beautiful visualizations and insights.
          </p>
        </div>
        
        <div className="card p-8 text-center interactive-hover group">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
            <span className="text-2xl">🤖</span>
          </div>
          <h3 className="text-xl font-bold mb-4 text-gray-800">AI Therapy Assistant</h3>
          <p className="text-gray-600 leading-relaxed">
            Get instant support with our AI-powered therapy chatbot for CBT-style conversations.
          </p>
        </div>
        
        <div className="card p-8 text-center interactive-hover group">
          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
            <span className="text-2xl">🏥</span>
          </div>
          <h3 className="text-xl font-bold mb-4 text-gray-800">Book Appointments</h3>
          <p className="text-gray-600 leading-relaxed">
            Schedule sessions with qualified mental health professionals in your area.
          </p>
        </div>
      </div>

      {/* Enhanced Quick Stats */}
      <div className="card p-8">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
            <span className="text-white text-xl">📈</span>
          </div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Your Mental Health Journey
          </h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
            <div className="text-3xl font-bold text-blue-600 mb-2">{getDaysTracked()}</div>
            <div className="text-sm text-blue-700 font-medium">Days Tracked</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
            <div className="text-3xl font-bold text-green-600 mb-2">{getMoodEntries()}</div>
            <div className="text-sm text-green-700 font-medium">Mood Entries</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
            <div className="text-3xl font-bold text-purple-600 mb-2">{getTherapySessions()}</div>
            <div className="text-sm text-purple-700 font-medium">Therapy Sessions</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl">
            <div className="text-3xl font-bold text-orange-600 mb-2">{getActivitiesCompleted()}</div>
            <div className="text-sm text-orange-700 font-medium">Activities Completed</div>
          </div>
        </div>
      </div>
    </div>
  )
}
