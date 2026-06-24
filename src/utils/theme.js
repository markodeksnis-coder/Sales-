export const CARD = {
  backgroundColor: 'rgba(3, 10, 26, 0.9)',
  border: '1px solid rgba(14,165,233,0.14)',
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  position: 'relative',
  padding: '16px',
}
export const CARD_RED = { ...CARD, border: '1px solid rgba(249,115,22,0.4)', boxShadow: '0 0 24px rgba(249,115,22,0.08)' }
export const CARD_ACTIVE = { ...CARD, border: '1px solid rgba(14,165,233,0.5)', boxShadow: '0 0 28px rgba(14,165,233,0.12)' }
export const CARD_GREEN = { ...CARD, border: '1px solid rgba(34,197,94,0.35)', boxShadow: '0 0 20px rgba(34,197,94,0.08)' }
export const LABEL = {
  fontFamily: 'Orbitron, sans-serif', fontSize: '8px', fontWeight: 700,
  letterSpacing: '0.22em', color: 'rgba(14,165,233,0.38)', textTransform: 'uppercase', display: 'block',
}
export const H1 = {
  fontFamily: 'Orbitron, sans-serif', fontSize: '20px', fontWeight: 900,
  letterSpacing: '0.06em', color: '#38bdf8', margin: 0, textShadow: '0 0 24px rgba(14,165,233,0.4)',
}
export const H2 = { fontFamily: 'Orbitron, sans-serif', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', color: '#bae6fd' }
export const BODY = { fontFamily: 'Inter, sans-serif', fontSize: '12px', color: 'rgba(186,230,253,0.55)', lineHeight: '1.6' }
export const BTN_PRIMARY = {
  fontFamily: 'Orbitron, sans-serif', fontSize: '9px', fontWeight: 700, letterSpacing: '0.18em',
  padding: '10px 22px', border: '1px solid rgba(14,165,233,0.55)', cursor: 'pointer',
  background: 'rgba(14,165,233,0.12)', color: '#38bdf8', boxShadow: '0 0 18px rgba(14,165,233,0.2)', transition: 'all 0.2s',
}
export const BTN_GHOST = {
  fontFamily: 'Orbitron, sans-serif', fontSize: '9px', fontWeight: 700, letterSpacing: '0.14em',
  padding: '8px 16px', border: '1px solid rgba(14,165,233,0.18)', cursor: 'pointer',
  background: 'transparent', color: 'rgba(14,165,233,0.45)', transition: 'all 0.2s',
}
export const INPUT = {
  width: '100%', backgroundColor: 'rgba(0,0,0,0.5)', border: '1px solid rgba(14,165,233,0.18)',
  color: '#bae6fd', fontFamily: 'JetBrains Mono, monospace', fontSize: '12px',
  padding: '10px 14px', outline: 'none', boxSizing: 'border-box',
}
export const TEXTAREA = { ...INPUT, resize: 'vertical', fontFamily: 'Inter, sans-serif', minHeight: '64px' }
export const TAG = (color = '#0ea5e9', bg = 'rgba(14,165,233,0.08)') => ({
  fontFamily: 'Orbitron, sans-serif', fontSize: '8px', fontWeight: 700, letterSpacing: '0.18em',
  padding: '3px 8px', border: `1px solid ${color}55`, color, backgroundColor: bg,
})
export const SCORE_BAR = (pct, color) => ({
  height: '4px', width: `${pct}%`, background: color, boxShadow: `0 0 8px ${color}66`,
  transition: 'width 0.8s cubic-bezier(0.4,0,0.2,1)',
})
export const SKILL_COLORS = {
  rapport: '#0ea5e9', discovery: '#22d3ee', tonality: '#a78bfa',
  objection_handling: '#f97316', frame_control: '#22c55e',
}
