export default function HudCard({ children, style = {}, active = false, green = false, warn = false }) {
  const bracketColor = green
    ? 'rgba(0,255,140,0.8)'
    : warn
    ? 'rgba(255,140,0,0.8)'
    : active
    ? 'rgba(0,210,255,0.95)'
    : 'rgba(0,200,255,0.5)'
  const borderColor = green
    ? 'rgba(0,255,140,0.38)'
    : warn
    ? 'rgba(255,140,0,0.38)'
    : active
    ? 'rgba(0,210,255,0.6)'
    : 'rgba(0,200,255,0.22)'
  const bgColor = green ? 'rgba(0,12,6,0.94)' : warn ? 'rgba(18,6,0,0.94)' : 'rgba(1,12,28,0.94)'
  const shadow = green
    ? '0 0 32px rgba(0,255,140,0.18), 0 0 64px rgba(0,255,140,0.06), 0 4px 28px rgba(0,0,0,0.65)'
    : warn
    ? '0 0 32px rgba(255,140,0,0.14), 0 4px 28px rgba(0,0,0,0.65)'
    : active
    ? '0 0 44px rgba(0,200,255,0.24), 0 0 88px rgba(0,200,255,0.08), 0 4px 32px rgba(0,0,0,0.7)'
    : '0 0 24px rgba(0,200,255,0.08), 0 4px 20px rgba(0,0,0,0.55)'
  const bk = `2px solid ${bracketColor}`
  const c = { position: 'absolute', width: 13, height: 13, pointerEvents: 'none', zIndex: 1 }
  return (
    <div style={{
      position: 'relative',
      backgroundColor: bgColor,
      border: `1px solid ${borderColor}`,
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      boxShadow: shadow,
      ...style
    }}>
      <span style={{ ...c, top: -1, left: -1,     borderTop: bk, borderLeft: bk     }} />
      <span style={{ ...c, top: -1, right: -1,    borderTop: bk, borderRight: bk    }} />
      <span style={{ ...c, bottom: -1, left: -1,  borderBottom: bk, borderLeft: bk  }} />
      <span style={{ ...c, bottom: -1, right: -1, borderBottom: bk, borderRight: bk }} />
      {children}
    </div>
  )
}
