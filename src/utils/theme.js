export const CARD = {
  backgroundColor: 'rgba(1,12,28,0.94)',
  border: '1px solid rgba(0,200,255,0.22)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  position: 'relative',
  padding: '16px',
  boxShadow: '0 0 24px rgba(0,200,255,0.08), 0 4px 20px rgba(0,0,0,0.55)',
}
export const CARD_RED = { ...CARD, border: '1px solid rgba(255,140,0,0.45)', boxShadow: '0 0 32px rgba(255,140,0,0.14)' }
export const CARD_ACTIVE = { ...CARD, border: '1px solid rgba(0,200,255,0.58)', boxShadow: '0 0 44px rgba(0,200,255,0.22), 0 0 88px rgba(0,200,255,0.07)' }
export const CARD_GREEN = { ...CARD, border: '1px solid rgba(0,255,140,0.42)', boxShadow: '0 0 32px rgba(0,255,140,0.14)' }
export const LABEL = {
  fontFamily: 'Orbitron, sans-serif', fontSize: '8px', fontWeight: 700,
  letterSpacing: '0.22em', color: 'rgba(0,200,255,0.58)', textTransform: 'uppercase', display: 'block',
}
export const H1 = {
  fontFamily: 'Orbitron, sans-serif', fontSize: '22px', fontWeight: 900,
  letterSpacing: '0.06em', color: '#00d9ff', margin: 0,
  textShadow: '0 0 24px rgba(0,200,255,0.9), 0 0 50px rgba(0,200,255,0.35)',
}
export const H2 = {
  fontFamily: 'Orbitron, sans-serif', fontSize: '12px', fontWeight: 700,
  letterSpacing: '0.08em', color: '#c8e8ff',
  textShadow: '0 0 12px rgba(0,200,255,0.35)',
}
export const BODY = { fontFamily: 'Inter, sans-serif', fontSize: '12px', color: 'rgba(200,232,255,0.62)', lineHeight: '1.6' }
export const BTN_PRIMARY = {
  fontFamily: 'Orbitron, sans-serif', fontSize: '9px', fontWeight: 700, letterSpacing: '0.18em',
  padding: '10px 22px', border: '1px solid rgba(0,200,255,0.68)', cursor: 'pointer',
  background: 'rgba(0,200,255,0.15)', color: '#00d9ff',
  boxShadow: '0 0 26px rgba(0,200,255,0.28), 0 0 5px rgba(0,200,255,0.4)',
  textShadow: '0 0 12px rgba(0,200,255,0.8)',
  transition: 'all 0.2s',
}
export const BTN_GHOST = {
  fontFamily: 'Orbitron, sans-serif', fontSize: '9px', fontWeight: 700, letterSpacing: '0.14em',
  padding: '8px 16px', border: '1px solid rgba(0,200,255,0.3)', cursor: 'pointer',
  background: 'rgba(0,200,255,0.06)', color: 'rgba(0,200,255,0.7)',
  textShadow: '0 0 8px rgba(0,200,255,0.45)',
  transition: 'all 0.2s',
}
export const INPUT = {
  width: '100%', backgroundColor: 'rgba(0,5,15,0.7)', border: '1px solid rgba(0,200,255,0.24)',
  color: '#c8e8ff', fontFamily: 'JetBrains Mono, monospace', fontSize: '12px',
  padding: '10px 14px', outline: 'none', boxSizing: 'border-box',
}
export const TEXTAREA = { ...INPUT, resize: 'vertical', fontFamily: 'Inter, sans-serif', minHeight: '64px' }
export const TAG = (color = '#00d9ff', bg = 'rgba(0,200,255,0.1)') => ({
  fontFamily: 'Orbitron, sans-serif', fontSize: '8px', fontWeight: 700, letterSpacing: '0.18em',
  padding: '3px 8px', border: `1px solid ${color}66`, color, backgroundColor: bg,
  textShadow: `0 0 8px ${color}66`,
})
export const SCORE_BAR = (pct, color) => ({
  height: '4px', width: `${pct}%`, background: color,
  boxShadow: `0 0 10px ${color}99, 0 0 22px ${color}33`,
  transition: 'width 0.8s cubic-bezier(0.4,0,0.2,1)',
})
export const SKILL_COLORS = {
  rapport: '#00d9ff', discovery: '#22d3ee', tonality: '#bf80ff',
  objection_handling: '#ff8c42', frame_control: '#00ff88',
}
