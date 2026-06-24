export default function HudCard({ children, style = {}, active = false, green = false, warn = false }) {
  const accent = green ? '#00e87a' : warn ? '#ff8c42' : active ? '#00ccff' : '#1a6090'
  const bg = green ? '#051a0e' : warn ? '#1a0a02' : '#081c38'
  const border = green
    ? '1px solid rgba(0,232,122,0.45)'
    : warn
    ? '1px solid rgba(255,140,66,0.45)'
    : active
    ? '1px solid rgba(0,200,255,0.65)'
    : '1px solid rgba(0,120,200,0.4)'
  const shadow = green
    ? '0 4px 32px rgba(0,0,0,0.55), 0 0 24px rgba(0,232,122,0.15)'
    : warn
    ? '0 4px 32px rgba(0,0,0,0.55), 0 0 24px rgba(255,140,66,0.12)'
    : active
    ? '0 4px 32px rgba(0,0,0,0.6), 0 0 32px rgba(0,200,255,0.22)'
    : '0 4px 24px rgba(0,0,0,0.5)'
  const bk = `2px solid ${accent}`
  const c = { position: 'absolute', width: 12, height: 12, pointerEvents: 'none', zIndex: 1 }
  return (
    <div style={{ position: 'relative', backgroundColor: bg, border, backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', boxShadow: shadow, ...style }}>
      <span style={{ ...c, top: -1, left: -1,     borderTop: bk, borderLeft: bk     }} />
      <span style={{ ...c, top: -1, right: -1,    borderTop: bk, borderRight: bk    }} />
      <span style={{ ...c, bottom: -1, left: -1,  borderBottom: bk, borderLeft: bk  }} />
      <span style={{ ...c, bottom: -1, right: -1, borderBottom: bk, borderRight: bk }} />
      {children}
    </div>
  )
}
