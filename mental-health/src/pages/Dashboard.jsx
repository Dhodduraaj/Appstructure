import { useEffect, useMemo, useState } from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js'
import { moodApi } from '../lib/api'

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend)

export default function Dashboard() {
  const [moods, setMoods] = useState([])
  const [error, setError] = useState('')
  useEffect(() => {
    moodApi
      .list()
      .then(setMoods)
      .catch(() => setError('Please login to view your trends.'))
  }, [])

  const data = useMemo(() => {
    const sorted = [...moods].sort(
      (a, b) => new Date(a.loggedAt).getTime() - new Date(b.loggedAt).getTime()
    )
    return {
      labels: sorted.map((m) => new Date(m.loggedAt).toLocaleDateString()),
      datasets: [
        {
          label: 'Mood (1-5)',
          data: sorted.map((m) => m.mood),
          borderColor: '#4f46e5',
          backgroundColor: 'rgba(79,70,229,0.2)',
          tension: 0.3,
        },
      ],
    }
  }, [moods])

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Dashboard</h2>
      {error && <div className="p-3 bg-yellow-100 text-yellow-800 rounded">{error}</div>}
      <div className="bg-white rounded shadow p-4">
        <Line data={data} options={{ scales: { y: { min: 1, max: 5, ticks: { stepSize: 1 } } } }} />
      </div>
    </div>
  )
}


