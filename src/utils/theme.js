const gradBorder = (bg = '#07091a') => ({
  background: `linear-gradient(${bg}, ${bg}) padding-box, linear-gradient(135deg, rgba(139,92,246,0.3), rgba(34,211,238,0.3)) border-box`,
  border: '1px solid transparent',
})
export const CARD = {
  ...gradBorder(),
  position: 'relative', padding: '20px',
  boxShadow: '0 4px 28px rgba(0,0,0,0.5)',
}
export const CARD_RED = {
  ...gradBorder('#0e0500'),
  background: `linear-gradient(#0e0500, #0e0500) padding-box, linear-gradient(135deg, rgba(249,115,22,0.5), rgba(251,191,36,0.5)) border-box`,
  position: 'relative', padding: '20px',
  boxShadow: '0 4px 28px rgba(0,0,0,0.5), 0 0 24px rgba(249,115,22,0.1)',
}
export const CARD_ACTIVE = {
  background: `linear-gradient(#07091a, #07091a) padding-box, linear-gradient(135deg, rgba(139,92,246,0.7), rgba(34,211,238,0.7)) border-box`,
  border: '1px solid transparent',
  position: 'relative', padding: '20px',
  boxShadow: '0 4px 28px rgba(0,0,0,0.55), 0 0 40px rgba(139,92,246,0.18)',
}
export const CARD_GREEN = {
  background: `linear-gradient(#040e09, #040e09) padding-box, linear-gradient(135deg, rgba(16,185,129,0.55), rgba(6,182,212,0.45)) border-box`,
  border: '1px solid transparent',
  position: 'relative', padding: '20px',
  boxShadow: '0 4px 28px rgba(0,0,0,0.5), 0 0 24px rgba(16,185,129,0.12)',
}
export const LABEL = {
  fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: 500,
  letterSpacing: '0.07em', color: 'rgba(167,139,250,0.6)', textTransform: 'uppercase', display: 'block',
}
export const H1 = {
  fontFamily: 'Orbitron, sans-serif', fontSize: '26px', fontWeight: 900,
  letterSpacing: '0.05em',
  background: 'linear-gradient(135deg, #e8eeff 0%, #a78bfa 60%, #22d3ee 100%)',
  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
  margin: 0,
}
export const H2 = {
  fontFamily: 'Orbitron, sans-serif', fontSize: '13px', fontWeight: 700,
  letterSpacing: '0.06em', color: '#e8eeff',
}
export const BODY = { fontFamily: 'Inter, sans-serif', fontSize: '13px', color: 'rgba(220,230,255,0.55)', lineHeight: '1.65' }
export const BTN_PRIMARY = {
  fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 700,
  padding: '12px 26px', border: 'none', cursor: 'pointer', borderRadius: '8px',
  background: 'linear-gradient(135deg, #7c3aed 0%, #0891b2 100%)',
  color: '#ffffff',
  boxShadow: '0 4px 20px rgba(124,58,237,0.45), 0 2px 8px rgba(0,0,0,0.3)',
  transition: 'all 0.15s',
}
export const BTN_GHOST = {
  fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 500,
  padding: '9px 18px', cursor: 'pointer', borderRadius: '8px',
  background: `linear-gradient(#07091a, #07091a) padding-box, linear-gradient(135deg, rgba(139,92,246,0.35), rgba(34,211,238,0.35)) border-box`,
  border: '1px solid transparent',
  color: 'rgba(220,230,255,0.8)',
  transition: 'all 0.15s',
}
export const INPUT = {
  width: '100%', backgroundColor: '#05070f', border: '1px solid rgba(139,92,246,0.25)',
  color: '#e8eeff', fontFamily: 'Inter, sans-serif', fontSize: '13px',
  padding: '10px 14px', outline: 'none', boxSizing: 'border-box', borderRadius: '6px',
}
export const TEXTAREA = { ...INPUT, resize: 'vertical', lineHeight: '1.65', minHeight: '72px' }
export const TAG = (color = '#a78bfa', bg = 'rgba(139,92,246,0.12)') => ({
  fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: 500, letterSpacing: '0.04em',
  padding: '3px 10px', borderRadius: '4px', border: `1px solid ${color}55`, color, backgroundColor: bg,
})
export const SCORE_BAR = (pct, color) => ({
  height: '5px', width: `${pct}%`,
  background: color === '#a78bfa' || color === '#8b5cf6'
    ? 'linear-gradient(90deg, #7c3aed, #22d3ee)'
    : color,
  borderRadius: '3px',
  transition: 'width 0.8s cubic-bezier(0.4,0,0.2,1)',
})
export const SKILL_COLORS = {
  rapport: '#22d3ee', discovery: '#67e8f9', tonality: '#a78bfa',
  objection_handling: '#fb923c', frame_control: '#34d399',
}
