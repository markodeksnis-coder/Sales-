export default function HudCard({ children, style = {}, active = false, green = false, warn = false }) {
  const bg     = green ? '#0a1f0f' : warn ? '#1f0f00' : '#111111'
  const border = green
    ? '1px solid rgba(48,209,88,0.3)'
    : warn
    ? '1px solid rgba(255,159,10,0.3)'
    : active
    ? '1px solid rgba(10,132,255,0.45)'
    : '1px solid rgba(255,255,255,0.1)'
  const shadow = active
    ? '0 2px 8px rgba(0,0,0,0.4), 0 0 0 1px rgba(10,132,255,0.2)'
    : '0 2px 8px rgba(0,0,0,0.35)'
  return (
    <div style={{ backgroundColor: bg, border, borderRadius: '14px', boxShadow: shadow, ...style }}>
      {children}
    </div>
  )
}
