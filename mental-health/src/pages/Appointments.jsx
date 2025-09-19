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
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center float-animation">
            <span className="text-white text-xl">📅</span>
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Book Appointment
          </h2>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Schedule a session with qualified mental health professionals to support your wellbeing journey.
        </p>
      </div>

      {/* Enhanced New Appointment Button */}
      <div className="flex justify-center">
        <button
          onClick={() => setShowBooking(true)}
          className="btn-primary flex items-center space-x-2 text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <span>➕</span>
          <span>New Appointment</span>
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
              <div className="space-y-4">
                <h4 className="text-lg font-medium">Step 1: Choose Psychiatrist</h4>
                <div className="grid gap-4">
                  {psychiatrists.map(psych => (
                    <div
                      key={psych.id}
                      className={`p-4 border rounded cursor-pointer transition-colors ${
                        selectedPsychiatrist?.id === psych.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedPsychiatrist(psych)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h5 className="font-semibold">{psych.name}</h5>
                          <p className="text-gray-600">{psych.specialty}</p>
                          <p className="text-sm text-gray-500">{psych.experience} experience</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center">
                            <span className="text-yellow-500">★</span>
                            <span className="ml-1">{psych.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setBookingStep(2)}
                  disabled={!selectedPsychiatrist}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
                >
                  Next: Select Date & Time
                </button>
              </div>
            )}

            {bookingStep === 2 && (
              <div className="space-y-4">
                <h4 className="text-lg font-medium">Step 2: Select Date & Time</h4>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Available Dates:</label>
                  <select
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full p-2 border rounded"
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
                  <label className="block text-sm font-medium mb-2">Available Times:</label>
                  <div className="grid grid-cols-4 gap-2">
                    {timeSlots.map(time => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`p-2 border rounded text-sm ${
                          selectedTime === time
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setBookingStep(1)}
                    className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleBooking}
                    disabled={!selectedDate || !selectedTime}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
                  >
                    Confirm Appointment
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Your Appointments</h3>
        {appointments.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No appointments scheduled
          </div>
        ) : (
          <div className="space-y-3">
            {appointments.map(appointment => (
              <div key={appointment.id} className="bg-white rounded shadow p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold">{appointment.psychiatrist.name}</h4>
                    <p className="text-gray-600">{appointment.psychiatrist.specialty}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 rounded text-xs ${
                      appointment.status === 'confirmed' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
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
