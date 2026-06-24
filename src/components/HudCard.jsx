export default function HudCard({ children, style = {}, active = false, green = false, warn = false }) {
  const bg = green ? '#071a0e' : warn ? '#1a0d04' : '#0c1828'
  const border = green
    ? '1px solid rgba(0,220,110,0.35)'
    : warn
    ? '1px solid rgba(255,150,50,0.35)'
    : active
    ? '1px solid rgba(0,160,255,0.55)'
    : '1px solid rgba(255,255,255,0.08)'
  const shadow = green
    ? '0 1px 3px rgba(0,0,0,0.4), 0 8px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(0,220,110,0.12)'
    : warn
    ? '0 1px 3px rgba(0,0,0,0.4), 0 8px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,150,50,0.1)'
    : active
    ? '0 1px 3px rgba(0,0,0,0.4), 0 8px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(0,160,255,0.15)'
    : '0 1px 3px rgba(0,0,0,0.3), 0 8px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)'
  const bracketC = green ? '#00dc6e' : warn ? '#ff9632' : active ? '#0af' : 'rgba(0,140,220,0.5)'
  const bk = `2px solid ${bracketC}`
  const c = { position: 'absolute', width: 11, height: 11, pointerEvents: 'none', zIndex: 1 }
  return (
    <div style={{ position: 'relative', backgroundColor: bg, border, boxShadow: shadow, ...style }}>
      <span style={{ ...c, top: -1, left: -1,     borderTop: bk, borderLeft: bk     }} />
      <span style={{ ...c, top: -1, right: -1,    borderTop: bk, borderRight: bk    }} />
      <span style={{ ...c, bottom: -1, left: -1,  borderBottom: bk, borderLeft: bk  }} />
      <span style={{ ...c, bottom: -1, right: -1, borderBottom: bk, borderRight: bk }} />
      {children}
    </div>
  )
}
