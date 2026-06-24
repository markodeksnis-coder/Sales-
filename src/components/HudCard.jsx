export default function HudCard({ children, style = {}, active = false, green = false, warn = false }) {
  const g0 = green ? 'rgba(16,185,129,0.65)' : warn ? 'rgba(249,115,22,0.65)' : active ? 'rgba(139,92,246,0.75)' : 'rgba(139,92,246,0.28)'
  const g1 = green ? 'rgba(6,182,212,0.45)'  : warn ? 'rgba(251,191,36,0.45)' : active ? 'rgba(34,211,238,0.75)'  : 'rgba(34,211,238,0.28)'
  const bg = green ? '#040e09' : warn ? '#0e0500' : '#07091a'
  const shadow = green
    ? '0 8px 40px rgba(0,0,0,0.55), 0 0 28px rgba(16,185,129,0.18)'
    : warn
    ? '0 8px 40px rgba(0,0,0,0.55), 0 0 28px rgba(249,115,22,0.15)'
    : active
    ? '0 8px 40px rgba(0,0,0,0.6), 0 0 48px rgba(139,92,246,0.22)'
    : '0 4px 28px rgba(0,0,0,0.5)'
  const bk = `2px solid ${green ? '#10b981' : warn ? '#f97316' : active ? '#8b5cf6' : 'rgba(139,92,246,0.5)'}`
  const c = { position: 'absolute', width: 11, height: 11, pointerEvents: 'none', zIndex: 1 }
  return (
    <div style={{
      position: 'relative',
      background: `linear-gradient(${bg}, ${bg}) padding-box, linear-gradient(135deg, ${g0}, ${g1}) border-box`,
      border: '1px solid transparent',
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
