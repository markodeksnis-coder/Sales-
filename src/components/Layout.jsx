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
    <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '15px', fontWeight: 700, color: '#00d9ff', letterSpacing: '0.05em', textShadow: '0 0 18px rgba(0,200,255,1), 0 0 36px rgba(0,200,255,0.4)' }}>
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
        position: 'fixed', top: 0, left: 0, bottom: 0, width: '220px',
        background: 'linear-gradient(180deg, rgba(2,12,28,1) 0%, rgba(3,16,36,1) 100%)',
        borderRight: '1px solid rgba(0,200,255,0.35)',
        boxShadow: '6px 0 48px rgba(0,150,255,0.12)',
        display: 'flex', flexDirection: 'column', zIndex: 100,
      }}>
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
          backgroundImage: 'radial-gradient(rgba(0,200,255,0.1) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }} />

        <div style={{ padding: '26px 20px 20px', borderBottom: '1px solid rgba(0,200,255,0.2)', position: 'relative', zIndex: 1 }}>
          <div style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '18px', fontWeight: 900, letterSpacing: '0.28em', color: '#00d9ff', textShadow: '0 0 22px rgba(0,200,255,1), 0 0 50px rgba(0,200,255,0.5)' }}>APEX</div>
          <div style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '10px', fontWeight: 700, letterSpacing: '0.28em', color: 'rgba(0,200,255,0.75)', marginTop: '2px', textShadow: '0 0 14px rgba(0,200,255,0.5)' }}>PROTOCOL</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '12px' }}>
            <div style={{ width: '9px', height: '9px', borderRadius: '50%', backgroundColor: '#00ff88', boxShadow: '0 0 16px rgba(0,255,136,1), 0 0 32px rgba(0,255,136,0.5)', animation: 'apexPulse 2s ease-in-out infinite' }} />
            <span style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '8px', fontWeight: 700, letterSpacing: '0.2em', color: '#00ff88', textShadow: '0 0 12px rgba(0,255,136,0.7)' }}>SYSTEM ONLINE</span>
          </div>
        </div>

        <nav style={{ flex: 1, padding: '8px 0', overflowY: 'auto', position: 'relative', zIndex: 1 }}>
          {NAV.map(item => {
            const active = page === item.id
            return (
              <button key={item.id} onClick={() => setPage(item.id)} style={{
                display: 'flex', alignItems: 'center', gap: '13px',
                width: '100%', padding: '13px 20px',
                background: active
                  ? 'linear-gradient(90deg, rgba(0,200,255,0.22) 0%, rgba(0,200,255,0.06) 100%)'
                  : 'transparent',
                border: 'none',
                borderLeft: active ? '4px solid #00d9ff' : '4px solid transparent',
                cursor: 'pointer', transition: 'all 0.18s', textAlign: 'left',
                boxShadow: active ? 'inset 0 0 40px rgba(0,200,255,0.1)' : 'none',
              }}>
                <span style={{
                  fontSize: '15px', flexShrink: 0, transition: 'all 0.18s',
                  color: active ? '#00d9ff' : 'rgba(160,220,255,0.65)',
                  textShadow: active ? '0 0 16px rgba(0,200,255,1), 0 0 32px rgba(0,200,255,0.5)' : 'none',
                }}>{item.icon}</span>
                <span style={{
                  fontFamily: 'Orbitron, sans-serif', fontSize: '10px', fontWeight: 700, letterSpacing: '0.16em',
                  transition: 'all 0.18s',
                  color: active ? '#ffffff' : 'rgba(180,225,255,0.72)',
                  textShadow: active ? '0 0 14px rgba(0,200,255,0.9), 0 0 28px rgba(0,200,255,0.4)' : 'none',
                }}>{item.label}</span>
              </button>
            )
          })}
        </nav>

        <div style={{ padding: '16px 20px', borderTop: '1px solid rgba(0,200,255,0.2)', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <div>
              <div style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '8px', fontWeight: 700, letterSpacing: '0.18em', color: 'rgba(0,200,255,0.65)', marginBottom: '5px' }}>STREAK</div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '24px', fontWeight: 700, color: '#00d9ff', textShadow: '0 0 20px rgba(0,200,255,0.9), 0 0 40px rgba(0,200,255,0.4)', lineHeight: 1 }}>
                {streak}<span style={{ fontSize: '12px', marginLeft: '3px', opacity: 0.6 }}>d</span>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '8px', fontWeight: 700, letterSpacing: '0.18em', color: 'rgba(0,200,255,0.65)', marginBottom: '5px' }}>LOCAL TIME</div>
              <Clock />
            </div>
          </div>
          <button onClick={() => setPage('settings')} style={{
            display: 'flex', alignItems: 'center', gap: '10px', width: '100%',
            padding: '10px 14px',
            background: page === 'settings' ? 'rgba(0,200,255,0.2)' : 'rgba(0,200,255,0.07)',
            border: `1px solid ${page === 'settings' ? 'rgba(0,200,255,0.65)' : 'rgba(0,200,255,0.25)'}`,
            boxShadow: page === 'settings' ? '0 0 24px rgba(0,200,255,0.3)' : 'none',
            cursor: 'pointer', transition: 'all 0.15s',
          }}>
            <span style={{ fontSize: '14px', color: page === 'settings' ? '#00d9ff' : 'rgba(160,220,255,0.7)' }}>⚙</span>
            <span style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '10px', fontWeight: 700, letterSpacing: '0.16em', color: page === 'settings' ? '#ffffff' : 'rgba(180,225,255,0.72)', textShadow: page === 'settings' ? '0 0 10px rgba(0,200,255,0.8)' : 'none' }}>CONFIG</span>
          </button>
        </div>
      </aside>

      <main style={{ marginLeft: '220px', flex: 1, padding: '32px 28px', boxSizing: 'border-box' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          {children}
        </div>
      </main>
    </div>
  )
}
