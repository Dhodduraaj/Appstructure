import { useEffect, useState } from 'react'
import { authApi } from '../lib/api'
import { setToken, isLoggedIn } from '../lib/auth'

export default function Auth() {
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [error, setError] = useState('')
  const [logged, setLogged] = useState(isLoggedIn())

  useEffect(() => {
    const handler = () => setLogged(isLoggedIn())
    window.addEventListener('auth-changed', handler)
    return () => window.removeEventListener('auth-changed', handler)
  }, [])

  async function submit() {
    setError('')
    try {
      const payload = { email, password, ...(mode==='register' ? { displayName } : {}) }
      const fn = mode === 'register' ? authApi.register : authApi.login
      const { token } = await fn(payload)
      setToken(token)
    } catch (e) {
      setError('Authentication failed')
    }
  }

  if (logged) return <div className="p-4 bg-green-100 text-green-800 rounded">You are logged in.</div>

  return (
    <div className="max-w-sm mx-auto space-y-4">
      <h2 className="text-2xl font-semibold">{mode === 'login' ? 'Login' : 'Register'}</h2>
      {error && <div className="p-3 bg-red-100 text-red-800 rounded">{error}</div>}
      <div className="bg-white rounded shadow p-4 space-y-3">
        {mode === 'register' && (
          <input className="w-full border rounded px-3 py-2" placeholder="Display name" value={displayName} onChange={(e)=>setDisplayName(e.target.value)} />
        )}
        <input className="w-full border rounded px-3 py-2" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
        <input type="password" className="w-full border rounded px-3 py-2" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
        <button onClick={submit} className="w-full px-4 py-2 bg-blue-600 text-white rounded">{mode === 'login' ? 'Login' : 'Create account'}</button>
        <button onClick={()=>setMode(mode==='login'?'register':'login')} className="w-full text-sm text-blue-700 underline">
          {mode === 'login' ? 'Need an account? Register' : 'Have an account? Login'}
        </button>
      </div>
    </div>
  )
}


