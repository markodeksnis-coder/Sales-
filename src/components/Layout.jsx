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
    <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '14px', fontWeight: 700, color: '#00d9ff', letterSpacing: '0.08em', textShadow: '0 0 16px rgba(0,200,255,0.9), 0 0 32px rgba(0,200,255,0.4)' }}>
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
        background: 'linear-gradient(180deg, rgba(1,10,22,0.99) 0%, rgba(2,14,30,0.99) 100%)',
        borderRight: '1px solid rgba(0,200,255,0.25)',
        boxShadow: '4px 0 48px rgba(0,180,255,0.1), 1px 0 0 rgba(0,200,255,0.08)',
        display: 'flex', flexDirection: 'column', zIndex: 100,
        backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)',
      }}>
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
          backgroundImage: 'radial-gradient(rgba(0,200,255,0.13) 1px, transparent 1px)',
          backgroundSize: '18px 18px',
        }} />
        <div style={{
          position: 'absolute', top: -80, left: '50%', transform: 'translateX(-50%)',
          width: '300px', height: '200px', pointerEvents: 'none', zIndex: 0,
          background: 'radial-gradient(ellipse, rgba(0,180,255,0.22) 0%, transparent 70%)',
        }} />

        <div style={{ padding: '24px 18px 18px', borderBottom: '1px solid rgba(0,200,255,0.14)', position: 'relative', zIndex: 1 }}>
          <div style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '16px', fontWeight: 900, letterSpacing: '0.32em', color: '#00d9ff', textShadow: '0 0 20px rgba(0,200,255,1), 0 0 44px rgba(0,200,255,0.45), 0 0 80px rgba(0,200,255,0.2)' }}>APEX</div>
          <div style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '9px', fontWeight: 700, letterSpacing: '0.32em', color: 'rgba(0,200,255,0.65)', marginTop: '1px', textShadow: '0 0 12px rgba(0,200,255,0.5)' }}>PROTOCOL</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginTop: '11px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#00ff88', boxShadow: '0 0 14px rgba(0,255,136,1), 0 0 28px rgba(0,255,136,0.5)', animation: 'apexPulse 2s ease-in-out infinite' }} />
            <span style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '7px', fontWeight: 700, letterSpacing: '0.22em', color: 'rgba(0,255,136,0.9)', textShadow: '0 0 12px rgba(0,255,136,0.6)' }}>SYSTEM ONLINE</span>
          </div>
        </div>

        <nav style={{ flex: 1, padding: '10px 0', overflowY: 'auto', position: 'relative', zIndex: 1 }}>
          {NAV.map(item => {
            const active = page === item.id
            return (
              <button key={item.id} onClick={() => setPage(item.id)} style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                width: '100%', padding: '12px 18px',
                background: active
                  ? 'linear-gradient(90deg, rgba(0,200,255,0.2) 0%, rgba(0,200,255,0.05) 100%)'
                  : 'transparent',
                border: 'none',
                borderLeft: active ? '3px solid #00d9ff' : '3px solid transparent',
                cursor: 'pointer', transition: 'all 0.18s', textAlign: 'left',
                boxShadow: active ? 'inset 0 0 40px rgba(0,200,255,0.1)' : 'none',
              }}>
                <span style={{
                  fontSize: '13px', flexShrink: 0, transition: 'all 0.18s',
                  color: active ? '#00d9ff' : 'rgba(0,200,255,0.52)',
                  textShadow: active ? '0 0 14px rgba(0,200,255,1), 0 0 28px rgba(0,200,255,0.5)' : 'none',
                }}>{item.icon}</span>
                <span style={{
                  fontFamily: 'Orbitron, sans-serif', fontSize: '9px', fontWeight: 700, letterSpacing: '0.18em',
                  transition: 'all 0.18s',
                  color: active ? '#00d9ff' : 'rgba(0,200,255,0.55)',
                  textShadow: active ? '0 0 12px rgba(0,200,255,0.9), 0 0 24px rgba(0,200,255,0.4)' : 'none',
                }}>{item.label}</span>
              </button>
            )
          })}
        </nav>

        <div style={{ padding: '14px 18px', borderTop: '1px solid rgba(0,200,255,0.14)', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <div>
              <div style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '7px', fontWeight: 700, letterSpacing: '0.2em', color: 'rgba(0,200,255,0.5)', marginBottom: '4px' }}>STREAK</div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '22px', fontWeight: 700, color: '#00d9ff', textShadow: '0 0 18px rgba(0,200,255,0.9), 0 0 36px rgba(0,200,255,0.4)', lineHeight: 1 }}>
                {streak}<span style={{ fontSize: '11px', marginLeft: '2px', opacity: 0.5 }}>d</span>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '7px', fontWeight: 700, letterSpacing: '0.2em', color: 'rgba(0,200,255,0.5)', marginBottom: '4px' }}>LOCAL TIME</div>
              <Clock />
            </div>
          </div>
          <button onClick={() => setPage('settings')} style={{
            display: 'flex', alignItems: 'center', gap: '8px', width: '100%',
            padding: '9px 12px',
            background: page === 'settings' ? 'rgba(0,200,255,0.18)' : 'rgba(0,200,255,0.06)',
            border: `1px solid ${page === 'settings' ? 'rgba(0,200,255,0.55)' : 'rgba(0,200,255,0.18)'}`,
            boxShadow: page === 'settings' ? '0 0 20px rgba(0,200,255,0.25)' : 'none',
            cursor: 'pointer', transition: 'all 0.15s',
          }}>
            <span style={{ fontSize: '12px', color: page === 'settings' ? '#00d9ff' : 'rgba(0,200,255,0.55)' }}>⚙</span>
            <span style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '8px', fontWeight: 700, letterSpacing: '0.18em', color: page === 'settings' ? '#00d9ff' : 'rgba(0,200,255,0.55)', textShadow: page === 'settings' ? '0 0 10px rgba(0,200,255,0.8)' : 'none' }}>CONFIG</span>
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
