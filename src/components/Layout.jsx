const NAV = [
  { id: 'today',    label: 'DASHBOARD', icon: '⊛' },
  { id: 'calls',    label: 'CALLS',     icon: '◈' },
  { id: 'insights', label: 'TRAINING',  icon: '⊞' },
  { id: 'drills',   label: 'REPS',      icon: '⊠' },
  { id: 'settings', label: 'CONFIG',    icon: '⊟' },
]

export default function Layout({ page, setPage, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 42px)' }}>
      <nav style={{ display: 'flex', alignItems: 'stretch', backgroundColor: 'rgba(2, 8, 22, 0.92)', borderBottom: '1px solid rgba(14,165,233,0.1)', backdropFilter: 'blur(16px)', padding: '0 20px', position: 'sticky', top: 0, zIndex: 40 }}>
        {NAV.map(item => {
          const active = page === item.id
          return (
            <button key={item.id} onClick={() => setPage(item.id)} style={{ display: 'flex', alignItems: 'center', gap: '7px', padding: '14px 18px', background: 'none', border: 'none', borderBottom: `2px solid ${active ? '#0ea5e9' : 'transparent'}`, borderTop: '2px solid transparent', cursor: 'pointer', fontFamily: 'Orbitron, sans-serif', fontSize: '9px', fontWeight: 700, letterSpacing: '0.2em', color: active ? '#38bdf8' : 'rgba(14,165,233,0.28)', textShadow: active ? '0 0 12px rgba(14,165,233,0.6)' : 'none', transition: 'all 0.2s', whiteSpace: 'nowrap' }}>
              <span style={{ fontSize: '13px', opacity: active ? 1 : 0.4, filter: active ? 'drop-shadow(0 0 4px rgba(14,165,233,0.8))' : 'none' }}>{item.icon}</span>
              {item.label}
            </button>
          )
        })}
      </nav>
      <main style={{ flex: 1, padding: '0 0 80px' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto', padding: '24px 20px' }}>{children}</div>
      </main>
      <nav style={{ position: 'fixed', bottom: 0, left: 0, right: 0, display: 'flex', backgroundColor: 'rgba(2, 8, 22, 0.97)', borderTop: '1px solid rgba(14,165,233,0.12)', backdropFilter: 'blur(20px)', zIndex: 50 }} className="md:hidden">
        {NAV.map(item => {
          const active = page === item.id
          return (
            <button key={item.id} onClick={() => setPage(item.id)} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '10px 2px', background: 'none', border: 'none', borderTop: `2px solid ${active ? '#0ea5e9' : 'transparent'}`, cursor: 'pointer', color: active ? '#38bdf8' : 'rgba(14,165,233,0.25)', gap: '3px' }}>
              <span style={{ fontSize: '16px', filter: active ? 'drop-shadow(0 0 4px rgba(14,165,233,0.8))' : 'none' }}>{item.icon}</span>
              <span style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '7px', fontWeight: 700, letterSpacing: '0.12em' }}>{item.label}</span>
            </button>
          )
        })}
      </nav>
    </div>
  )
}
