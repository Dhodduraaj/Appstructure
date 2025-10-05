import { useState, useEffect } from 'react'
import { moodApi } from '../lib/api'

const psychiatrists = [
  { id: 1, name: 'Dr. Sarah Johnson', specialty: 'Anxiety & Depression', rating: 4.8, experience: '8 years' },
  { id: 2, name: 'Dr. Michael Chen', specialty: 'Trauma & PTSD', rating: 4.9, experience: '12 years' },
  { id: 3, name: 'Dr. Emily Rodriguez', specialty: 'Bipolar Disorder', rating: 4.7, experience: '6 years' },
  { id: 4, name: 'Dr. James Wilson', specialty: 'Addiction & Recovery', rating: 4.6, experience: '10 years' },
  { id: 5, name: 'Dr. Lisa Thompson', specialty: 'Child & Adolescent', rating: 4.9, experience: '15 years' }
]

const timeSlots = [
  '9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
]

export default function Appointments() {
  const [selectedPsychiatrist, setSelectedPsychiatrist] = useState(null)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [appointments, setAppointments] = useState([])
  const [showBooking, setShowBooking] = useState(false)
  const [bookingStep, setBookingStep] = useState(1)

  useEffect(() => {
    // Load existing appointments from localStorage
    const saved = localStorage.getItem('appointments')
    if (saved) {
      setAppointments(JSON.parse(saved))
    }
  }, [])

  const saveAppointment = (appointment) => {
    const newAppointments = [...appointments, appointment]
    setAppointments(newAppointments)
    localStorage.setItem('appointments', JSON.stringify(newAppointments))
  }

  const handleBooking = () => {
    if (!selectedPsychiatrist || !selectedDate || !selectedTime) return

    const appointment = {
      id: Date.now(),
      psychiatrist: selectedPsychiatrist,
      date: selectedDate,
      time: selectedTime,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    }

    saveAppointment(appointment)
    setShowBooking(false)
    setBookingStep(1)
    setSelectedPsychiatrist(null)
    setSelectedDate('')
    setSelectedTime('')
  }

  const getAvailableDates = () => {
    const dates = []
    const today = new Date()
    for (let i = 1; i <= 30; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      if (date.getDay() !== 0 && date.getDay() !== 6) { // Exclude weekends
        dates.push(date.toISOString().split('T')[0])
      }
    }
    return dates
  }

  return (
    <div className="space-y-8">
      {/* Enhanced Header */}
      <div className="text-center">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl flex items-center justify-center float-animation shadow-lg">
            <span className="text-white text-2xl">📅</span>
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Doctor Appointments
          </h2>
        </div>
        <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
          Connect with experienced mental health professionals who are here to support your journey towards better mental wellbeing. 
          Choose from our carefully selected team of psychiatrists and therapists.
        </p>
      </div>

      {/* Enhanced New Appointment Button */}
      <div className="flex justify-center">
        <button
          onClick={() => setShowBooking(true)}
          className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold flex items-center space-x-3 text-lg px-10 py-4 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
        >
          <span className="text-xl">➕</span>
          <span>Book New Appointment</span>
        </button>
      </div>

      {showBooking && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl transform animate-slideUp">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                  <span className="text-white text-lg">📅</span>
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Book New Appointment
                </h3>
              </div>
              <button
                onClick={() => setShowBooking(false)}
                className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-700 transition-all duration-300"
              >
                <span className="text-xl">×</span>
              </button>
            </div>

            {bookingStep === 1 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h4 className="text-2xl font-bold text-gray-800 mb-2">Step 1: Choose Your Doctor</h4>
                  <p className="text-gray-600">Select from our team of experienced mental health professionals</p>
                </div>
                <div className="grid gap-4">
                  {psychiatrists.map(psych => (
                    <div
                      key={psych.id}
                      className={`p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                        selectedPsychiatrist?.id === psych.id
                          ? 'border-emerald-500 bg-gradient-to-r from-emerald-50 to-teal-50 shadow-lg'
                          : 'border-gray-200 hover:border-emerald-300 hover:shadow-md bg-white'
                      }`}
                      onClick={() => setSelectedPsychiatrist(psych)}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                              <span className="text-white font-bold text-lg">👩‍⚕️</span>
                            </div>
                            <div>
                              <h5 className="font-bold text-lg text-gray-800">{psych.name}</h5>
                              <p className="text-emerald-600 font-medium">{psych.specialty}</p>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 ml-12">{psych.experience} of experience</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center justify-center space-x-1 mb-2">
                            <span className="text-yellow-500 text-xl">★</span>
                            <span className="font-bold text-lg">{psych.rating}</span>
                          </div>
                          <div className="text-xs text-gray-500">Rating</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setBookingStep(2)}
                  disabled={!selectedPsychiatrist}
                  className="w-full px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:transform-none disabled:hover:shadow-lg"
                >
                  Next: Select Date & Time →
                </button>
              </div>
            )}

            {bookingStep === 2 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h4 className="text-2xl font-bold text-gray-800 mb-2">Step 2: Select Date & Time</h4>
                  <p className="text-gray-600">Choose your preferred appointment slot</p>
                </div>
                
                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-3">📅 Available Dates:</label>
                  <select
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl text-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-300"
                  >
                    <option value="">Select a date</option>
                    {getAvailableDates().map(date => (
                      <option key={date} value={date}>
                        {new Date(date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-3">🕐 Available Times:</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {timeSlots.map(time => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`p-4 border-2 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                          selectedTime === time
                            ? 'border-emerald-500 bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 shadow-lg'
                            : 'border-gray-200 hover:border-emerald-300 hover:shadow-md bg-white'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setBookingStep(1)}
                    className="flex-1 px-6 py-4 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-xl transition-all duration-300 transform hover:scale-105"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={handleBooking}
                    disabled={!selectedDate || !selectedTime}
                    className="flex-1 px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:transform-none disabled:hover:shadow-lg"
                  >
                    ✓ Confirm Appointment
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Your Appointments Section */}
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">📋 Your Appointments</h3>
          <p className="text-gray-600">Manage your scheduled appointments</p>
        </div>
        
        {appointments.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl text-gray-400">📅</span>
            </div>
            <h4 className="text-xl font-semibold text-gray-600 mb-2">No appointments scheduled</h4>
            <p className="text-gray-500">Book your first appointment to get started with professional mental health support.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {appointments.map(appointment => (
              <div key={appointment.id} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-lg">👩‍⚕️</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-lg text-gray-800">{appointment.psychiatrist.name}</h4>
                        <p className="text-emerald-600 font-medium">{appointment.psychiatrist.specialty}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 text-gray-600">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">📅</span>
                        <span className="font-medium">{new Date(appointment.date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">🕐</span>
                        <span className="font-medium">{appointment.time}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                      appointment.status === 'confirmed' 
                        ? 'bg-green-100 text-green-800 border border-green-200'
                        : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                    }`}>
                      {appointment.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
