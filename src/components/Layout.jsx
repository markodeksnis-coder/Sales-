const NAV = [
  { id: 'today',    label: 'TODAY',    icon: '◉' },
  { id: 'calls',    label: 'CALLS',    icon: '◎' },
  { id: 'insights', label: 'INSIGHTS', icon: '◈' },
  { id: 'drills',   label: 'DRILLS',   icon: '⬡' },
  { id: 'settings', label: 'SETTINGS', icon: '⚙' },
]

export default function Layout({ page, setPage, children }) {
  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 44px)' }}>

      {/* Desktop sidebar */}
      <aside style={{
        display: 'none',
        width: '180px',
        borderRight: '1px solid rgba(255,255,255,0.05)',
        backgroundColor: 'rgba(5, 9, 20, 0.95)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        position: 'fixed', top: '44px', left: 0, height: 'calc(100vh - 44px)',
        flexDirection: 'column',
        zIndex: 40,
      }} className="md:flex flex-col">

        {/* Logo */}
        <div style={{ padding: '24px 20px 16px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{
            fontFamily: 'Space Grotesk, sans-serif', fontSize: '11px', fontWeight: 800,
            letterSpacing: '0.22em', lineHeight: 1.5,
            background: 'linear-gradient(135deg, #ef4444, #f97316)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>SALES GOD<br />SYSTEM</div>
        </div>

        {/* Nav items */}
        <nav style={{ display: 'flex', flexDirection: 'column', padding: '8px 0', flex: 1 }}>
          {NAV.map(item => (
            <button key={item.id} onClick={() => setPage(item.id)} style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '11px 20px',
              fontFamily: 'Space Grotesk, sans-serif', fontSize: '11px', fontWeight: 700,
              letterSpacing: '0.15em',
              background: page === item.id
                ? 'linear-gradient(90deg, rgba(239,68,68,0.12), rgba(239,68,68,0.04))'
                : 'none',
              border: 'none',
              borderLeft: `2px solid ${page === item.id ? '#ef4444' : 'transparent'}`,
              color: page === item.id ? '#ef4444' : 'rgba(255,255,255,0.3)',
              cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s',
              boxShadow: page === item.id ? 'inset 0 0 20px rgba(239,68,68,0.05)' : 'none',
            }}>
              <span style={{ fontSize: '13px' }}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        {/* Bottom decoration */}
        <div style={{ padding: '16px 20px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '9px', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.15)' }}>SALES GOD SYSTEM v1</div>
        </div>
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, paddingBottom: '80px' }} className="md:ml-[180px]">
        <div style={{ maxWidth: '820px', margin: '0 auto', padding: '28px 20px' }}>
          {children}
        </div>
      </main>

      {/* Mobile bottom bar */}
      <nav style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 50,
        display: 'flex',
        backgroundColor: 'rgba(5, 9, 20, 0.97)',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }} className="md:hidden">
        {NAV.map(item => (
          <button key={item.id} onClick={() => setPage(item.id)} style={{
            flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', padding: '10px 2px',
            fontFamily: 'Space Grotesk, sans-serif', fontSize: '9px', fontWeight: 700,
            letterSpacing: '0.1em', background: 'none', border: 'none', cursor: 'pointer',
            color: page === item.id ? '#ef4444' : 'rgba(255,255,255,0.25)',
            borderTop: `2px solid ${page === item.id ? '#ef4444' : 'transparent'}`,
          }}>
            <span style={{ fontSize: '17px', lineHeight: 1, marginBottom: '3px' }}>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  )
}
