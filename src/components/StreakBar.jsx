import { useState, useEffect } from 'react'
import { getStreak } from '../utils/storage'

export default function StreakBar() {
  const [streak, setStreak] = useState(() => getStreak())

  useEffect(() => {
    const h = () => setStreak(getStreak())
    window.addEventListener('sgs-streak-updated', h)
    return () => window.removeEventListener('sgs-streak-updated', h)
  }, [])

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '44px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '16px',
      overflow: 'hidden',
      backgroundColor: streak > 0 ? 'rgba(239,68,68,0.1)' : 'rgba(255,255,255,0.02)',
      borderBottom: `1px solid ${streak > 0 ? 'rgba(239,68,68,0.3)' : 'rgba(255,255,255,0.05)'}`,
    }} className={streak > 0 ? 'streak-pulse' : ''}>

      {/* Animated gradient line at bottom */}
      {streak > 0 && (
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px',
          background: 'linear-gradient(90deg, transparent 0%, #ef4444 30%, #f97316 50%, #ef4444 70%, transparent 100%)',
        }} />
      )}

      {streak > 0 ? (
        <>
          <span style={{ fontSize: '16px', lineHeight: 1 }}>⚡</span>
          <span style={{
            fontFamily: 'Space Grotesk, sans-serif', fontSize: '13px', fontWeight: 800,
            letterSpacing: '0.22em',
            background: 'linear-gradient(90deg, #ef4444, #f97316, #ef4444)',
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            animation: 'shimmer 3s linear infinite',
          }}>{streak} DAY STREAK</span>
          <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '10px', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.3)' }}>KEEP GOING</span>
        </>
      ) : (
        <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '10px', letterSpacing: '0.22em', color: 'rgba(255,255,255,0.2)' }}>
          NO ACTIVE STREAK — START TODAY
        </span>
      )}
    </div>
  )
}
