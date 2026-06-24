import { useState, useEffect } from 'react'
import { getStreak } from '../utils/storage'

const NAV = [
  { id: 'today',     label: 'Dashboard',   icon: '⬡' },
  { id: 'calls',     label: 'Intel Feed',  icon: '◎' },
  { id: 'insights',  label: 'Training',    icon: '◈' },
  { id: 'drills',    label: 'Reps',        icon: '▶' },
  { id: 'calllog',   label: 'Call Log',    icon: '◉' },
  { id: 'genesis',   label: 'Genesis',     icon: '◇' },
  { id: 'knowledge', label: 'Knowledge',   icon: '✦' },
]

function Clock() {
  const [time, setTime] = useState(new Date())
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  const hh = String(time.getHours()).padStart(2,'0')
  const mm = String(time.getMinutes()).padStart(2,'0')
  const ss = String(time.getSeconds()).padStart(2,'0')
  return (
    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '15px', fontWeight: 600, color: '#00aaff', letterSpacing: '0.02em' }}>
      {hh}:{mm}:{ss}
    </span>
  )
}

export default function Layout({ page, setPage, children }) {
  const [streak, setStreak] = useState(getStreak)

  useEffect(() => {
    const handler = () => setStreak(getStreak())
    window.addEventListener('sgs-streak-updated', handler)
    return () => window.removeEventListener('sgs-streak-updated', handler)
  }, [])

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>

      <aside style={{
        position: 'fixed', top: 0, left: 0, bottom: 0, width: '220px',
        backgroundColor: '#060e1a',
        borderRight: '1px solid rgba(255,255,255,0.07)',
        display: 'flex', flexDirection: 'column', zIndex: 100,
      }}>

        {/* BRAND */}
        <div style={{ padding: '28px 20px 24px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <div style={{ width: '28px', height: '28px', border: '2px solid #0af', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 0 16px rgba(0,170,255,0.4)' }}>
              <span style={{ color: '#0af', fontSize: '12px', fontWeight: 900, fontFamily: 'Orbitron, sans-serif' }}>A</span>
            </div>
            <div>
              <div style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '13px', fontWeight: 900, letterSpacing: '0.2em', color: '#ffffff' }}>APEX</div>
              <div style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '8px', fontWeight: 600, letterSpacing: '0.2em', color: 'rgba(0,170,255,0.6)', marginTop: '1px' }}>PROTOCOL</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
            <div style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#00e87a', flexShrink: 0, animation: 'apexPulse 2.5s ease-in-out infinite' }} />
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: 500, color: 'rgba(0,220,110,0.85)' }}>System Online</span>
          </div>
        </div>

        {/* NAV */}
        <nav style={{ flex: 1, padding: '12px 10px', overflowY: 'auto' }}>
          {NAV.map(item => {
            const active = page === item.id
            return (
              <button key={item.id} onClick={() => setPage(item.id)} style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                width: '100%', padding: '10px 12px', marginBottom: '2px',
                background: active ? 'rgba(255,255,255,0.07)' : 'transparent',
                border: 'none', borderRadius: '6px',
                cursor: 'pointer', transition: 'all 0.12s', textAlign: 'left',
              }}>
                <span style={{ fontSize: '14px', flexShrink: 0, color: active ? '#0af' : 'rgba(255,255,255,0.35)', transition: 'color 0.12s' }}>{item.icon}</span>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: active ? 600 : 400, color: active ? '#ffffff' : 'rgba(255,255,255,0.55)', transition: 'all 0.12s', letterSpacing: '0.01em' }}>{item.label}</span>
              </button>
            )
          })}
        </nav>

        {/* BOTTOM */}
        <div style={{ padding: '16px 20px 20px', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '12px' }}>
            <div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: 500, color: 'rgba(255,255,255,0.3)', marginBottom: '4px', letterSpacing: '0.05em' }}>STREAK</div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '26px', fontWeight: 700, lineHeight: 1, color: '#0af' }}>
                {streak}<span style={{ fontSize: '13px', opacity: 0.5, marginLeft: '2px' }}>d</span>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: 500, color: 'rgba(255,255,255,0.3)', marginBottom: '4px', letterSpacing: '0.05em' }}>TIME</div>
              <Clock />
            </div>
          </div>
          <button onClick={() => setPage('settings')} style={{
            display: 'flex', alignItems: 'center', gap: '10px', width: '100%',
            padding: '9px 12px', borderRadius: '6px',
            background: page === 'settings' ? 'rgba(255,255,255,0.07)' : 'transparent',
            border: '1px solid rgba(255,255,255,0.07)',
            cursor: 'pointer', transition: 'all 0.12s',
          }}>
            <span style={{ fontSize: '14px', color: page === 'settings' ? '#0af' : 'rgba(255,255,255,0.35)' }}>⚙</span>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: page === 'settings' ? 600 : 400, color: page === 'settings' ? '#ffffff' : 'rgba(255,255,255,0.55)' }}>Settings</span>
          </button>
        </div>
      </aside>

      <main style={{ marginLeft: '220px', flex: 1, padding: '36px 32px', boxSizing: 'border-box', minHeight: '100vh' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          {children}
        </div>
      </main>
    </div>
  )
}
