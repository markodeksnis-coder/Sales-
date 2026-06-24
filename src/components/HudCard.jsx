export default function HudCard({ children, style = {}, active = false, green = false, warn = false }) {
  const bracketColor = green
    ? '#00ff88'
    : warn
    ? '#ff9040'
    : active
    ? '#00d9ff'
    : 'rgba(0,200,255,0.6)'
  const borderColor = green
    ? 'rgba(0,255,136,0.5)'
    : warn
    ? 'rgba(255,144,64,0.5)'
    : active
    ? 'rgba(0,210,255,0.7)'
    : 'rgba(0,200,255,0.35)'
  const bgColor = green
    ? 'rgba(0,18,10,0.97)'
    : warn
    ? 'rgba(22,8,0,0.97)'
    : 'rgba(3,16,40,0.97)'
  const shadow = green
    ? '0 0 36px rgba(0,255,136,0.2), 0 6px 28px rgba(0,0,0,0.7)'
    : warn
    ? '0 0 36px rgba(255,144,64,0.16), 0 6px 28px rgba(0,0,0,0.7)'
    : active
    ? '0 0 48px rgba(0,200,255,0.28), 0 6px 32px rgba(0,0,0,0.75)'
    : '0 0 28px rgba(0,200,255,0.1), 0 6px 22px rgba(0,0,0,0.6)'
  const bk = `2px solid ${bracketColor}`
  const c = { position: 'absolute', width: 14, height: 14, pointerEvents: 'none', zIndex: 1 }
  return (
    <div style={{
      position: 'relative', backgroundColor: bgColor,
      border: `1px solid ${borderColor}`,
      backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
      boxShadow: shadow, ...style
    }}>
      <span style={{ ...c, top: -1, left: -1,     borderTop: bk, borderLeft: bk     }} />
      <span style={{ ...c, top: -1, right: -1,    borderTop: bk, borderRight: bk    }} />
      <span style={{ ...c, bottom: -1, left: -1,  borderBottom: bk, borderLeft: bk  }} />
      <span style={{ ...c, bottom: -1, right: -1, borderBottom: bk, borderRight: bk }} />
      {children}
    </div>
  )
}
