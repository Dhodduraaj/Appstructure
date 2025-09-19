import { useEffect, useState } from 'react'
import { moodApi } from '../lib/api'

export default function TrackMood() {
  const [moods, setMoods] = useState([])
  const [mood, setMood] = useState(3)
  const [note, setNote] = useState('')
  const [error, setError] = useState('')

  const load = () => moodApi.list().then(setMoods).catch(() => setError('Login required'))
  useEffect(() => { load() }, [])

  async function addMood() {
    setError('')
    try {
      await moodApi.create({ mood: Number(mood), note })
      setNote('')
      await load()
    } catch (e) { setError('Could not save mood') }
  }

  async function removeMood(id) {
    try { await moodApi.remove(id); await load() } catch {}
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Track Mood</h2>
      {error && <div className="p-3 bg-red-100 text-red-800 rounded">{error}</div>}
      <div className="bg-white rounded shadow p-4 space-y-3">
        <div className="flex items-center gap-3">
          <label className="text-sm">Mood (1-5)</label>
          <input type="range" min="1" max="5" value={mood} onChange={(e)=>setMood(e.target.value)} />
          <span className="font-medium">{mood}</span>
        </div>
        <textarea className="w-full border rounded p-2" rows="3" placeholder="Add a note (optional)" value={note} onChange={(e)=>setNote(e.target.value)} />
        <button onClick={addMood} className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
      </div>
      <div className="bg-white rounded shadow">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b"><th className="p-2">Date</th><th className="p-2">Mood</th><th className="p-2">Note</th><th className="p-2"></th></tr>
          </thead>
          <tbody>
            {moods.map(m => (
              <tr key={m._id} className="border-b">
                <td className="p-2">{new Date(m.loggedAt).toLocaleString()}</td>
                <td className="p-2">{m.mood}</td>
                <td className="p-2">{m.note}</td>
                <td className="p-2 text-right">
                  <button onClick={()=>removeMood(m._id)} className="text-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}


