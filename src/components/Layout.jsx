import { useState, useEffect } from 'react'
import { getStreak } from '../utils/storage'

const NAV = [
  { id: 'today',     label: 'DASHBOARD',  icon: '◈' },
  { id: 'calls',     label: 'INTEL FEED', icon: '◉' },
  { id: 'insights',  label: 'TRAINING',   icon: '◆' },
  { id: 'drills',    label: 'REPS',       icon: '▶' },
  { id: 'calllog',   label: 'CALL LOG',   icon: '◎' },
  { id: 'genesis',   label: 'GENESIS',    icon: '◇' },
  { id: 'knowledge', label: 'KNOWLEDGE',  icon: '◈' },
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
    <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '13px', fontWeight: 700, color: '#0ea5e9', letterSpacing: '0.1em', textShadow: '0 0 10px rgba(14,165,233,0.5)' }}>
      {hh}:{mm}:{ss}
    </div>
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
        position: 'fixed', top: 0, left: 0, bottom: 0, width: '210px',
        backgroundColor: 'rgba(2,8,20,0.97)', borderRight: '1px solid rgba(14,165,233,0.12)',
        display: 'flex', flexDirection: 'column', zIndex: 100,
        backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
      }}>
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
          backgroundImage: 'radial-gradient(rgba(14,165,233,0.06) 1px, transparent 1px)',
          backgroundSize: '18px 18px',
        }} />

        <div style={{ padding: '22px 18px 16px', borderBottom: '1px solid rgba(14,165,233,0.08)', position: 'relative', zIndex: 1 }}>
          <div style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '11px', fontWeight: 900, letterSpacing: '0.25em', color: '#38bdf8', textShadow: '0 0 14px rgba(14,165,233,0.7)' }}>APEX</div>
          <div style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '11px', fontWeight: 900, letterSpacing: '0.25em', color: 'rgba(14,165,233,0.45)' }}>PROTOCOL</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '8px' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#22c55e', boxShadow: '0 0 8px rgba(34,197,94,0.8)', animation: 'apexPulse 2s ease-in-out infinite' }} />
            <span style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '7px', fontWeight: 700, letterSpacing: '0.2em', color: 'rgba(34,197,94,0.7)' }}>SYSTEM ONLINE</span>
          </div>
        </div>

        <nav style={{ flex: 1, padding: '12px 0', overflowY: 'auto', position: 'relative', zIndex: 1 }}>
          {NAV.map(item => {
            const active = page === item.id
            return (
              <button key={item.id} onClick={() => setPage(item.id)} style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                width: '100%', padding: '11px 18px',
                background: active ? 'rgba(14,165,233,0.1)' : 'transparent',
                border: 'none', borderLeft: active ? '2px solid #0ea5e9' : '2px solid transparent',
                cursor: 'pointer', transition: 'all 0.15s', textAlign: 'left',
                boxShadow: active ? 'inset 0 0 20px rgba(14,165,233,0.05)' : 'none',
              }}>
                <span style={{ fontSize: '12px', color: active ? '#38bdf8' : 'rgba(14,165,233,0.25)', flexShrink: 0, textShadow: active ? '0 0 8px rgba(14,165,233,0.6)' : 'none' }}>{item.icon}</span>
                <span style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '8.5px', fontWeight: 700, letterSpacing: '0.18em', color: active ? '#38bdf8' : 'rgba(14,165,233,0.35)', textShadow: active ? '0 0 8px rgba(14,165,233,0.5)' : 'none' }}>{item.label}</span>
              </button>
            )
          })}
        </nav>

        <div style={{ padding: '14px 18px', borderTop: '1px solid rgba(14,165,233,0.08)', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <div>
              <div style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '7px', fontWeight: 700, letterSpacing: '0.18em', color: 'rgba(14,165,233,0.35)', marginBottom: '3px' }}>STREAK</div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '18px', fontWeight: 700, color: '#22d3ee', textShadow: '0 0 12px rgba(34,211,238,0.5)', lineHeight: 1 }}>{streak}<span style={{ fontSize: '10px', marginLeft: '2px', opacity: 0.5 }}>d</span></div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '7px', fontWeight: 700, letterSpacing: '0.18em', color: 'rgba(14,165,233,0.35)', marginBottom: '3px' }}>LOCAL TIME</div>
              <Clock />
            </div>
          </div>
          <button onClick={() => setPage('settings')} style={{
            display: 'flex', alignItems: 'center', gap: '8px', width: '100%',
            padding: '8px 10px', background: page === 'settings' ? 'rgba(14,165,233,0.1)' : 'rgba(14,165,233,0.04)',
            border: `1px solid ${page === 'settings' ? 'rgba(14,165,233,0.3)' : 'rgba(14,165,233,0.08)'}`,
            cursor: 'pointer', transition: 'all 0.15s',
          }}>
            <span style={{ fontSize: '11px', color: 'rgba(14,165,233,0.4)' }}>⚙</span>
            <span style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '8px', fontWeight: 700, letterSpacing: '0.18em', color: 'rgba(14,165,233,0.4)' }}>CONFIG</span>
          </button>
        </div>
      </aside>

      <main style={{ marginLeft: '210px', flex: 1, padding: '28px 24px', boxSizing: 'border-box' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          {children}
        </div>
      </main>
    </div>
  )
}
