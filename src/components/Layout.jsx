import { useState, useEffect } from 'react'
import { getStreak } from '../utils/storage'

const NAV = [
  { id: 'today',     label: 'Overview',  icon: '⊞' },
  { id: 'calls',     label: 'Calls',     icon: '◯' },
  { id: 'insights',  label: 'Insights',  icon: '◈' },
  { id: 'drills',    label: 'Drills',    icon: '▶' },
  { id: 'calllog',   label: 'Call Log',  icon: '▤' },
  { id: 'genesis',   label: 'Genesis',   icon: '✶' },
  { id: 'knowledge', label: 'Library',   icon: '▦' },
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
  return <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.04em' }}>{hh}:{mm}:{ss}</span>
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
        position: 'fixed', top: 0, left: 0, bottom: 0, width: '240px',
        backgroundColor: '#0a0a0a',
        borderRight: '1px solid rgba(255,255,255,0.07)',
        display: 'flex', flexDirection: 'column', zIndex: 100,
      }}>

        {/* BRAND CARD */}
        <div style={{ padding: '20px 16px 12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px', borderRadius: '12px', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{
              width: '38px', height: '38px', borderRadius: '10px', flexShrink: 0,
              background: 'linear-gradient(135deg, #0a84ff 0%, #30d158 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 14px rgba(10,132,255,0.4)',
            }}>
              <span style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '15px', fontWeight: 900, color: '#fff' }}>A</span>
            </div>
            <div>
              <div style={{ fontSize: '15px', fontWeight: 700, color: '#ffffff', letterSpacing: '-0.02em' }}>Apex Protocol</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '3px' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#30d158', animation: 'pulse 2.5s ease-in-out infinite', flexShrink: 0 }} />
                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>Online</span>
              </div>
            </div>
          </div>
        </div>

        {/* NAV */}
        <nav style={{ flex: 1, padding: '6px 12px', overflowY: 'auto' }}>
          {NAV.map(item => {
            const active = page === item.id
            return (
              <button key={item.id} onClick={() => setPage(item.id)} style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                width: '100%', padding: '11px 12px', marginBottom: '2px',
                background: active ? '#0a84ff' : 'transparent',
                border: 'none', borderRadius: '10px',
                cursor: 'pointer', transition: 'all 0.12s', textAlign: 'left',
              }}>
                <span style={{ fontSize: '16px', flexShrink: 0, color: active ? '#fff' : 'rgba(255,255,255,0.35)', transition: 'color 0.12s' }}>{item.icon}</span>
                <span style={{ fontSize: '14px', fontWeight: active ? 600 : 400, color: active ? '#ffffff' : 'rgba(255,255,255,0.55)', letterSpacing: '-0.01em', transition: 'all 0.12s' }}>{item.label}</span>
              </button>
            )
          })}
        </nav>

        {/* BOTTOM STATS */}
        <div style={{ padding: '12px 16px 20px', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px' }}>
            <div style={{ backgroundColor: '#111', borderRadius: '10px', padding: '12px', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div style={{ fontSize: '10px', fontWeight: 500, color: 'rgba(255,255,255,0.35)', marginBottom: '4px', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Streak</div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '22px', fontWeight: 800, color: '#0a84ff', lineHeight: 1 }}>{streak}<span style={{ fontSize: '11px', opacity: 0.5, marginLeft: '2px' }}>d</span></div>
            </div>
            <div style={{ backgroundColor: '#111', borderRadius: '10px', padding: '12px', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div style={{ fontSize: '10px', fontWeight: 500, color: 'rgba(255,255,255,0.35)', marginBottom: '4px', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Time</div>
              <Clock />
            </div>
          </div>
          <button onClick={() => setPage('settings')} style={{
            display: 'flex', alignItems: 'center', gap: '10px', width: '100%',
            padding: '11px 14px', borderRadius: '10px',
            background: page === 'settings' ? '#0a84ff' : 'transparent',
            border: '1px solid rgba(255,255,255,0.08)',
            cursor: 'pointer', transition: 'all 0.12s',
          }}>
            <span style={{ fontSize: '15px', color: page === 'settings' ? '#fff' : 'rgba(255,255,255,0.4)' }}>⚙</span>
            <span style={{ fontSize: '14px', fontWeight: page === 'settings' ? 600 : 400, color: page === 'settings' ? '#fff' : 'rgba(255,255,255,0.55)' }}>Settings</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main style={{ marginLeft: '240px', flex: 1, padding: '40px 36px', boxSizing: 'border-box', minHeight: '100vh', backgroundColor: '#000000' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          {children}
        </div>
      </main>
    </div>
  )
}
