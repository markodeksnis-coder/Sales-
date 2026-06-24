export default function HudCard({ children, style = {}, active = false, green = false, warn = false }) {
  const bracketColor = green ? 'rgba(34,197,94,0.55)' : warn ? 'rgba(249,115,22,0.55)' : active ? 'rgba(14,165,233,0.6)' : 'rgba(14,165,233,0.35)'
  const borderColor = green ? 'rgba(34,197,94,0.25)' : warn ? 'rgba(249,115,22,0.25)' : active ? 'rgba(14,165,233,0.35)' : 'rgba(14,165,233,0.12)'
  const bgColor = green ? 'rgba(3,20,12,0.9)' : warn ? 'rgba(25,8,3,0.9)' : 'rgba(3,10,26,0.9)'
  const shadow = green ? '0 0 20px rgba(34,197,94,0.08)' : warn ? '0 0 20px rgba(249,115,22,0.08)' : active ? '0 0 24px rgba(14,165,233,0.1)' : 'none'
  const bk = `2px solid ${bracketColor}`
  const c = { position: 'absolute', width: 10, height: 10, pointerEvents: 'none', zIndex: 1 }
  return (
    <div style={{ position: 'relative', backgroundColor: bgColor, border: `1px solid ${borderColor}`, backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', boxShadow: shadow, ...style }}>
      <span style={{ ...c, top: -1, left: -1,    borderTop: bk,    borderLeft: bk    }} />
      <span style={{ ...c, top: -1, right: -1,   borderTop: bk,    borderRight: bk   }} />
      <span style={{ ...c, bottom: -1, left: -1,  borderBottom: bk, borderLeft: bk    }} />
      <span style={{ ...c, bottom: -1, right: -1, borderBottom: bk, borderRight: bk   }} />
      {children}
    </div>
  )
}
