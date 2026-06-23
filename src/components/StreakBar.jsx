import { useState, useEffect } from 'react'
import { getStreak } from '../utils/storage'

export default function StreakBar() {
  const [streak, setStreak] = useState(() => getStreak())

  useEffect(() => {
    const handler = () => setStreak(getStreak())
    window.addEventListener('sgs-streak-updated', handler)
    return () => window.removeEventListener('sgs-streak-updated', handler)
  }, [])

  if (streak === 0) {
    return (
      <div style={{ backgroundColor: '#111111', borderBottom: '1px solid #1a1a1a' }}
           className="w-full h-10 flex items-center justify-center px-4">
        <span className="font-display text-xs tracking-widest" style={{ color: '#737373', fontFamily: 'Space Grotesk, sans-serif' }}>
          NO ACTIVE STREAK — START TODAY
        </span>
      </div>
    )
  }

  return (
    <div className="w-full h-10 flex items-center justify-center px-4 streak-pulse"
         style={{ backgroundColor: '#ef4444' }}>
      <span style={{ fontFamily: 'Space Grotesk, sans-serif', color: '#fff', fontSize: '13px', fontWeight: 700, letterSpacing: '0.15em' }}>
        ⚡ {streak} DAY STREAK — KEEP GOING
      </span>
    </div>
  )
}
