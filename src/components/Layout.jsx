import { useState, useEffect } from 'react'
import { getStreak } from '../utils/storage'

const NAV = [
  { id: 'today',     label: 'Dashboard',  icon: '⬡' },
  { id: 'calls',     label: 'Intel Feed', icon: '◎' },
  { id: 'insights',  label: 'Training',   icon: '◈' },
  { id: 'drills',    label: 'Reps',       icon: '▶' },
  { id: 'calllog',   label: 'Call Log',   icon: '◉' },
  { id: 'genesis',   label: 'Genesis',    icon: '◇' },
  { id: 'knowledge', label: 'Knowledge',  icon: '✦' },
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
    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '15px', fontWeight: 700, background: 'linear-gradient(135deg, #a78bfa, #22d3ee)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
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
        position: 'fixed', top: 0, left: 0, bottom: 0, width: '224px',
        background: 'linear-gradient(180deg, #06030f 0%, #050816 100%)',
        borderRight: '1px solid rgba(139,92,246,0.2)',
        display: 'flex', flexDirection: 'column', zIndex: 100,
      }}>
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
          backgroundImage: 'radial-gradient(rgba(139,92,246,0.09) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
        }} />

        {/* BRAND */}
        <div style={{ padding: '28px 22px 22px', borderBottom: '1px solid rgba(139,92,246,0.15)', position: 'relative', zIndex: 1 }}>
          <div style={{
            fontFamily: 'Orbitron, sans-serif', fontSize: '24px', fontWeight: 900, letterSpacing: '0.22em',
            background: 'linear-gradient(135deg, #c4b5fd 0%, #22d3ee 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>APEX</div>
          <div style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '9px', fontWeight: 600, letterSpacing: '0.22em', color: 'rgba(167,139,250,0.55)', marginTop: '2px' }}>PROTOCOL</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '14px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981', boxShadow: '0 0 10px #10b981, 0 0 20px rgba(16,185,129,0.5)', animation: 'apexPulse 2s ease-in-out infinite', flexShrink: 0 }} />
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: 500, color: 'rgba(52,211,153,0.85)' }}>System Online</span>
          </div>
        </div>

        {/* NAV */}
        <nav style={{ flex: 1, padding: '14px 12px', overflowY: 'auto', position: 'relative', zIndex: 1 }}>
          {NAV.map(item => {
            const active = page === item.id
            return (
              <button key={item.id} onClick={() => setPage(item.id)} style={{
                display: 'flex', alignItems: 'center', gap: '13px',
                width: '100%', padding: '11px 12px', marginBottom: '3px',
                background: active
                  ? 'linear-gradient(90deg, rgba(139,92,246,0.2) 0%, rgba(139,92,246,0.06) 100%)'
                  : 'transparent',
                border: 'none',
                borderLeft: active ? '3px solid #8b5cf6' : '3px solid transparent',
                borderRadius: active ? '0 8px 8px 0' : '8px',
                cursor: 'pointer', transition: 'all 0.15s', textAlign: 'left',
              }}>
                <span style={{
                  fontSize: '15px', flexShrink: 0, transition: 'color 0.15s',
                  color: active ? '#a78bfa' : 'rgba(255,255,255,0.28)',
                }}>{item.icon}</span>
                {active ? (
                  <span style={{
                    fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 600,
                    background: 'linear-gradient(135deg, #c4b5fd, #67e8f9)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                  }}>{item.label}</span>
                ) : (
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 400, color: 'rgba(255,255,255,0.45)' }}>{item.label}</span>
                )}
              </button>
            )
          })}
        </nav>

        {/* BOTTOM */}
        <div style={{ padding: '16px 22px 22px', borderTop: '1px solid rgba(139,92,246,0.15)', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '14px' }}>
            <div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', fontWeight: 500, letterSpacing: '0.08em', color: 'rgba(167,139,250,0.5)', marginBottom: '5px', textTransform: 'uppercase' }}>Streak</div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '28px', fontWeight: 800, lineHeight: 1, background: 'linear-gradient(135deg, #a78bfa, #22d3ee)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                {streak}<span style={{ fontSize: '13px', opacity: 0.6, marginLeft: '3px' }}>d</span>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', fontWeight: 500, letterSpacing: '0.08em', color: 'rgba(167,139,250,0.5)', marginBottom: '5px', textTransform: 'uppercase' }}>Time</div>
              <Clock />
            </div>
          </div>
          <button onClick={() => setPage('settings')} style={{
            display: 'flex', alignItems: 'center', gap: '10px', width: '100%',
            padding: '10px 14px', borderRadius: '8px',
            background: page === 'settings'
              ? 'linear-gradient(135deg, rgba(139,92,246,0.22), rgba(34,211,238,0.12))'
              : 'rgba(255,255,255,0.04)',
            border: page === 'settings' ? '1px solid rgba(139,92,246,0.45)' : '1px solid rgba(255,255,255,0.08)',
            cursor: 'pointer', transition: 'all 0.15s',
          }}>
            <span style={{ fontSize: '14px', color: page === 'settings' ? '#a78bfa' : 'rgba(255,255,255,0.35)' }}>⚙</span>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: page === 'settings' ? 600 : 400, color: page === 'settings' ? '#e8eeff' : 'rgba(255,255,255,0.45)' }}>Settings</span>
          </button>
        </div>
      </aside>

      <main style={{ marginLeft: '224px', flex: 1, padding: '36px 32px', boxSizing: 'border-box', minHeight: '100vh' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          {children}
        </div>
      </main>
    </div>
  )
}
