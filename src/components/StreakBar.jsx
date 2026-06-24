import { useState, useEffect } from 'react'
import { getStreak } from '../utils/storage'

export default function StreakBar() {
  const [streak, setStreak] = useState(() => getStreak())
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const onUpdate = () => setStreak(getStreak())
    window.addEventListener('sgs-streak-updated', onUpdate)
    return () => window.removeEventListener('sgs-streak-updated', onUpdate)
  }, [])

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div style={{ position: 'relative', width: '100%', height: '42px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', backgroundColor: 'rgba(2, 8, 22, 0.96)', borderBottom: '1px solid rgba(14,165,233,0.14)', backdropFilter: 'blur(12px)', zIndex: 50, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent 0%, rgba(14,165,233,0.4) 30%, rgba(34,211,238,0.4) 50%, rgba(14,165,233,0.4) 70%, transparent 100%)' }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '13px', fontWeight: 900, letterSpacing: '0.1em', color: '#0ea5e9', textShadow: '0 0 20px rgba(14,165,233,0.6)' }}>APEX<span style={{ color: 'rgba(14,165,233,0.35)', fontWeight: 400 }}>:</span>PROTOCOL</div>
        <div style={{ width: '1px', height: '16px', background: 'rgba(14,165,233,0.15)' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#22c55e', boxShadow: '0 0 6px #22c55e', animation: 'apexPulse 2s ease-in-out infinite' }} />
          <span style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '7px', fontWeight: 700, letterSpacing: '0.2em', color: '#22c55e' }}>SYSTEM ONLINE</span>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '7px', letterSpacing: '0.2em', color: 'rgba(14,165,233,0.35)' }}>STREAK</span>
          <span style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '15px', fontWeight: 900, color: streak > 0 ? '#22d3ee' : 'rgba(14,165,233,0.25)', textShadow: streak > 0 ? '0 0 14px rgba(34,211,238,0.6)' : 'none' }}>{streak}</span>
          <span style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '7px', letterSpacing: '0.15em', color: 'rgba(14,165,233,0.35)' }}>DAYS</span>
        </div>
        <div style={{ width: '1px', height: '16px', background: 'rgba(14,165,233,0.1)' }} />
        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', fontWeight: 700, color: 'rgba(14,165,233,0.45)', letterSpacing: '0.05em' }}>{time.toLocaleTimeString('en-US', { hour12: false })}</div>
      </div>
    </div>
  )
}
