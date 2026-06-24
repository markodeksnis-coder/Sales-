import { useState, useEffect } from 'react'
import { getStreak } from '../utils/storage'

const NAV = [
  { id: 'today',     label: 'DASHBOARD',  icon: '⬡' },
  { id: 'calls',     label: 'INTEL FEED', icon: '◎' },
  { id: 'insights',  label: 'TRAINING',   icon: '◈' },
  { id: 'drills',    label: 'REPS',       icon: '▶' },
  { id: 'calllog',   label: 'CALL LOG',   icon: '◉' },
  { id: 'genesis',   label: 'GENESIS',    icon: '◇' },
  { id: 'knowledge', label: 'KNOWLEDGE',  icon: '✦' },
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
    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '16px', fontWeight: 700, color: '#00ccff', letterSpacing: '0.04em', textShadow: '0 0 20px #00ccff, 0 0 40px rgba(0,200,255,0.4)' }}>
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

      {/* SIDEBAR */}
      <aside style={{
        position: 'fixed', top: 0, left: 0, bottom: 0, width: '224px',
        backgroundColor: '#030c1a',
        borderRight: '1px solid rgba(0,150,220,0.3)',
        display: 'flex', flexDirection: 'column', zIndex: 100,
      }}>
        {/* subtle grid overlay */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
          backgroundImage: 'radial-gradient(rgba(0,180,255,0.08) 1px, transparent 1px)',
          backgroundSize: '22px 22px' }} />

        {/* BRAND */}
        <div style={{ padding: '28px 22px 22px', borderBottom: '1px solid rgba(0,150,220,0.2)', position: 'relative', zIndex: 1 }}>
          <div style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '20px', fontWeight: 900, letterSpacing: '0.25em', color: '#00ccff', textShadow: '0 0 24px #00ccff, 0 0 50px rgba(0,200,255,0.5), 0 0 80px rgba(0,200,255,0.2)' }}>APEX</div>
          <div style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '10px', fontWeight: 600, letterSpacing: '0.25em', color: 'rgba(0,190,255,0.6)', marginTop: '3px' }}>PROTOCOL</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '14px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#00e87a', boxShadow: '0 0 10px #00e87a, 0 0 22px rgba(0,232,122,0.6)', animation: 'apexPulse 2s ease-in-out infinite', flexShrink: 0 }} />
            <span style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '8px', fontWeight: 700, letterSpacing: '0.2em', color: '#00e87a', textShadow: '0 0 10px rgba(0,232,122,0.7)' }}>SYSTEM ONLINE</span>
          </div>
        </div>

        {/* NAV */}
        <nav style={{ flex: 1, padding: '12px 0', overflowY: 'auto', position: 'relative', zIndex: 1 }}>
          {NAV.map(item => {
            const active = page === item.id
            return (
              <button key={item.id} onClick={() => setPage(item.id)} style={{
                display: 'flex', alignItems: 'center', gap: '14px',
                width: '100%', padding: '13px 22px',
                background: active ? 'rgba(0,170,255,0.15)' : 'transparent',
                border: 'none',
                borderLeft: active ? '4px solid #00ccff' : '4px solid transparent',
                cursor: 'pointer', transition: 'all 0.15s', textAlign: 'left',
              }}>
                <span style={{
                  fontSize: '16px', flexShrink: 0,
                  color: active ? '#00ccff' : 'rgba(100,170,220,0.7)',
                  textShadow: active ? '0 0 12px #00ccff, 0 0 24px rgba(0,200,255,0.5)' : 'none',
                  transition: 'all 0.15s',
                }}>{item.icon}</span>
                <span style={{
                  fontFamily: 'Orbitron, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em',
                  color: active ? '#ffffff' : '#6aabcc',
                  textShadow: active ? '0 0 12px rgba(0,200,255,0.7)' : 'none',
                  transition: 'all 0.15s',
                }}>{item.label}</span>
              </button>
            )
          })}
        </nav>

        {/* BOTTOM */}
        <div style={{ padding: '16px 22px 20px', borderTop: '1px solid rgba(0,150,220,0.2)', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '14px' }}>
            <div>
              <div style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '8px', fontWeight: 600, letterSpacing: '0.18em', color: '#3a7899', marginBottom: '6px' }}>STREAK</div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '26px', fontWeight: 700, lineHeight: 1, color: '#00ccff', textShadow: '0 0 20px #00ccff, 0 0 40px rgba(0,200,255,0.4)' }}>
                {streak}<span style={{ fontSize: '13px', opacity: 0.55, marginLeft: '3px' }}>d</span>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '8px', fontWeight: 600, letterSpacing: '0.18em', color: '#3a7899', marginBottom: '6px' }}>TIME</div>
              <Clock />
            </div>
          </div>
          <button onClick={() => setPage('settings')} style={{
            display: 'flex', alignItems: 'center', gap: '10px', width: '100%',
            padding: '10px 14px',
            background: page === 'settings' ? 'rgba(0,180,255,0.18)' : 'rgba(0,130,200,0.08)',
            border: page === 'settings' ? '1px solid rgba(0,200,255,0.6)' : '1px solid rgba(0,130,200,0.25)',
            cursor: 'pointer', transition: 'all 0.15s',
          }}>
            <span style={{ fontSize: '14px', color: page === 'settings' ? '#00ccff' : '#4a88aa' }}>⚙</span>
            <span style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '10px', fontWeight: 700, letterSpacing: '0.14em', color: page === 'settings' ? '#ffffff' : '#5a98ba' }}>CONFIG</span>
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main style={{ marginLeft: '224px', flex: 1, padding: '32px 30px', boxSizing: 'border-box', minHeight: '100vh' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          {children}
        </div>
      </main>
    </div>
  )
}
