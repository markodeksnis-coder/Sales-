const NAV = [
  { id: 'today',    label: 'TODAY',    icon: '◉' },
  { id: 'calls',    label: 'CALLS',    icon: '◎' },
  { id: 'insights', label: 'INSIGHTS', icon: '◈' },
  { id: 'drills',   label: 'DRILLS',   icon: '⬡' },
  { id: 'settings', label: 'SETTINGS', icon: '⚙' },
]

export default function Layout({ page, setPage, children }) {
  return (
    <div className="flex" style={{ minHeight: 'calc(100vh - 40px)' }}>
      {/* Desktop sidebar */}
      <aside
        className="hidden md:flex flex-col"
        style={{
          width: '176px', borderRight: '1px solid #1a1a1a',
          backgroundColor: '#111111', position: 'fixed',
          top: '40px', left: 0, height: 'calc(100vh - 40px)',
        }}
      >
        <div style={{ padding: '20px 16px 14px', borderBottom: '1px solid #1a1a1a' }}>
          <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '11px', fontWeight: 800,
                        color: '#ef4444', letterSpacing: '0.2em', lineHeight: 1.4 }}>
            SALES GOD<br />SYSTEM
          </div>
        </div>
        <nav className="flex flex-col pt-1">
          {NAV.map(item => (
            <button
              key={item.id}
              onClick={() => setPage(item.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '11px 16px', fontSize: '11px', fontWeight: 700,
                fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '0.15em',
                background: 'none', border: 'none', cursor: 'pointer',
                borderLeft: page === item.id ? '2px solid #ef4444' : '2px solid transparent',
                backgroundColor: page === item.id ? '#1a1a1a' : 'transparent',
                color: page === item.id ? '#ef4444' : '#737373',
                transition: 'all 0.15s',
                textAlign: 'left',
              }}
            >
              <span>{item.icon}</span>{item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Page content */}
      <main
        className="flex-1"
        style={{ marginLeft: '0', paddingBottom: '80px' }}
      >
        <div className="md:ml-44">
          <div style={{ maxWidth: '800px', margin: '0 auto', padding: '24px 16px' }}>
            {children}
          </div>
        </div>
      </main>

      {/* Mobile bottom tabs */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 flex"
        style={{ backgroundColor: '#111111', borderTop: '1px solid #1a1a1a', zIndex: 50 }}
      >
        {NAV.map(item => (
          <button
            key={item.id}
            onClick={() => setPage(item.id)}
            style={{
              flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
              justifyContent: 'center', padding: '8px 2px', background: 'none', border: 'none',
              cursor: 'pointer', fontSize: '9px', fontWeight: 700,
              fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '0.12em',
              color: page === item.id ? '#ef4444' : '#737373',
            }}
          >
            <span style={{ fontSize: '18px', lineHeight: 1, marginBottom: '3px' }}>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  )
}
