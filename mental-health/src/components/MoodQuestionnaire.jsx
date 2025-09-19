import { useState } from 'react'
import FaceEmotionDetector from './FaceEmotionDetector'

const questions = [
  {
    id: 1,
    text: "How would you rate your overall mood today?",
    type: "likert",
    options: ["Very Poor", "Poor", "Fair", "Good", "Excellent"]
  },
  {
    id: 2,
    text: "How well did you sleep last night?",
    type: "likert",
    options: ["Very Poor", "Poor", "Fair", "Good", "Excellent"]
  },
  {
    id: 3,
    text: "How stressed do you feel right now?",
    type: "likert",
    options: ["Not at all", "Slightly", "Moderately", "Very", "Extremely"]
  },
  {
    id: 4,
    text: "How energetic do you feel?",
    type: "likert",
    options: ["Very Low", "Low", "Moderate", "High", "Very High"]
  },
  {
    id: 5,
    text: "How satisfied are you with your current life situation?",
    type: "likert",
    options: ["Very Dissatisfied", "Dissatisfied", "Neutral", "Satisfied", "Very Satisfied"]
  },
  {
    id: 6,
    text: "How anxious do you feel?",
    type: "likert",
    options: ["Not at all", "Slightly", "Moderately", "Very", "Extremely"]
  },
  {
    id: 7,
    text: "How connected do you feel to others?",
    type: "likert",
    options: ["Very Isolated", "Isolated", "Neutral", "Connected", "Very Connected"]
  },
  {
    id: 8,
    text: "How motivated are you to complete daily tasks?",
    type: "likert",
    options: ["Not at all", "Slightly", "Moderately", "Very", "Extremely"]
  },
  {
    id: 9,
    text: "How hopeful do you feel about the future?",
    type: "likert",
    options: ["Very Hopeless", "Hopeless", "Neutral", "Hopeful", "Very Hopeful"]
  },
  {
    id: 10,
    text: "How would you describe your current emotional state?",
    type: "multiple",
    options: ["Happy", "Sad", "Angry", "Anxious", "Calm", "Excited", "Depressed", "Content"]
  }
]

export default function MoodQuestionnaire({ onSubmit }) {
  const [answers, setAnswers] = useState({})
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const [showFaceTracking, setShowFaceTracking] = useState(false)
  const [faceEmotion, setFaceEmotion] = useState(null)

  const handleAnswer = (questionId, answer) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }))
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    } else {
      // After 10 questions, show face tracking
      setShowFaceTracking(true)
    }
  }

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1)
    }
  }

  const generateReport = () => {
    // Calculate scores properly - handle both numeric and array answers
    const scores = Object.values(answers).map(answer => {
      if (Array.isArray(answer)) {
        // For multiple choice questions, use length as score
        return answer.length
      }
      return typeof answer === 'number' ? answer : 3 // Default to neutral if not a number
    })
    
    const averageScore = scores.length > 0 ? scores.reduce((sum, score) => sum + score, 0) / scores.length : 3
    
    let moodLevel = 'neutral'
    let recommendations = []
    let professionalHelp = false

    if (averageScore <= 2) {
      moodLevel = 'low'
      recommendations = [
        'Try deep breathing exercises',
        'Take a short walk outside',
        'Listen to calming music',
        'Consider talking to a friend'
      ]
      professionalHelp = true
    } else if (averageScore >= 4) {
      moodLevel = 'high'
      recommendations = [
        'Share your positive energy with others',
        'Try a new hobby or activity',
        'Practice gratitude journaling',
        'Help someone else today'
      ]
    } else {
      moodLevel = 'moderate'
      recommendations = [
        'Maintain your current routine',
        'Try some light exercise',
        'Connect with friends or family',
        'Practice mindfulness'
      ]
    }

    const report = {
      moodLevel,
      averageScore: Math.round(averageScore * 10) / 10, // Round to 1 decimal
      recommendations,
      professionalHelp,
      answers,
      faceEmotion
    }

    setShowResults(true)
    if (onSubmit) onSubmit(report)
  }

  const handleFaceEmotionDetected = (emotion, history) => {
    setFaceEmotion(emotion)
    // Auto-generate report after face detection
    setTimeout(() => {
      generateReport()
    }, 1000)
  }

  if (showResults) {
    // Use the properly calculated report from generateReport
    const scores = Object.values(answers).map(answer => {
      if (Array.isArray(answer)) {
        return answer.length
      }
      return typeof answer === 'number' ? answer : 3
    })
    const averageScore = scores.length > 0 ? scores.reduce((sum, score) => sum + score, 0) / scores.length : 3
    
    const report = {
      moodLevel: averageScore <= 2 ? 'low' : averageScore >= 4 ? 'high' : 'moderate',
      averageScore: Math.round(averageScore * 10) / 10,
      recommendations: averageScore <= 2 ? [
        'Try deep breathing exercises',
        'Take a short walk outside',
        'Listen to calming music'
      ] : [
        'Maintain your current routine',
        'Try some light exercise',
        'Connect with friends or family'
      ],
      professionalHelp: averageScore <= 2,
      faceEmotion
    }

    return (
      <div className="space-y-4">
        <h3 className="text-2xl font-semibold">Your Mood Analysis Report</h3>
        <div className="bg-white rounded shadow p-6 space-y-4">
          <div className="text-center">
            <div className={`text-4xl font-bold ${
              report.moodLevel === 'low' ? 'text-red-600' :
              report.moodLevel === 'high' ? 'text-green-600' : 'text-blue-600'
            }`}>
              {report.moodLevel.toUpperCase()}
            </div>
            <p className="text-gray-600">Average Score: {report.averageScore.toFixed(1)}/5</p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Recommended Activities:</h4>
            <ul className="list-disc pl-5 space-y-1">
              {report.recommendations.map((rec, i) => (
                <li key={i}>{rec}</li>
              ))}
            </ul>
          </div>

          {report.faceEmotion && (
            <div>
              <h4 className="font-semibold mb-2">Face Emotion Analysis:</h4>
              <p className="text-gray-600">Detected emotion: <strong className="capitalize">{report.faceEmotion}</strong></p>
            </div>
          )}

          {report.professionalHelp && (
            <div className="p-4 bg-yellow-100 border border-yellow-400 rounded">
              <h4 className="font-semibold text-yellow-800">Consider Professional Help</h4>
              <p className="text-yellow-700">
                Your responses suggest you might benefit from speaking with a mental health professional.
                Consider reaching out to a therapist or counselor.
              </p>
            </div>
          )}

          <button
            onClick={() => {
              setShowResults(false)
              setCurrentQuestion(0)
              setAnswers({})
              setShowFaceTracking(false)
              setFaceEmotion(null)
            }}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded"
          >
            Take Questionnaire Again
          </button>
        </div>
      </div>
    )
  }

  // Show face tracking step after 10 questions
  if (showFaceTracking) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-2xl font-semibold">Face Emotion Detection</h3>
          <p className="text-gray-600">Please allow camera access and look at the camera for emotion analysis</p>
        </div>
        
        <div className="bg-white rounded shadow p-6">
          <FaceEmotionDetector 
            onStopDetection={handleFaceEmotionDetected}
          />
        </div>
      </div>
    )
  }

  const question = questions[currentQuestion]
  const currentAnswer = answers[question.id]

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-semibold">Mood Assessment</h3>
        <p className="text-gray-600">Question {currentQuestion + 1} of {questions.length}</p>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="bg-white rounded shadow p-6">
        <h4 className="text-lg font-medium mb-4">{question.text}</h4>
        
        {question.type === 'likert' ? (
          <div className="space-y-2">
            {question.options.map((option, index) => (
              <label key={index} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={index + 1}
                  checked={currentAnswer === index + 1}
                  onChange={() => handleAnswer(question.id, index + 1)}
                  className="text-blue-600"
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            {question.options.map((option, index) => (
              <label key={index} className="flex items-center space-x-2 cursor-pointer p-2 border rounded hover:bg-gray-50">
                <input
                  type="checkbox"
                  checked={currentAnswer?.includes(option)}
                  onChange={(e) => {
                    const current = currentAnswer || []
                    if (e.target.checked) {
                      handleAnswer(question.id, [...current, option])
                    } else {
                      handleAnswer(question.id, current.filter(item => item !== option))
                    }
                  }}
                  className="text-blue-600"
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        )}

        <div className="flex justify-between mt-6">
          <button
            onClick={prevQuestion}
            disabled={currentQuestion === 0}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={nextQuestion}
            disabled={!currentAnswer}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
          >
            {currentQuestion === questions.length - 1 ? 'Generate Report' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  )
}
