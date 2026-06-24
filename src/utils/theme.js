export const CARD = {
  backgroundColor: 'rgba(3,16,40,0.97)',
  border: '1px solid rgba(0,200,255,0.35)',
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  position: 'relative',
  padding: '16px',
  boxShadow: '0 0 28px rgba(0,200,255,0.1), 0 6px 24px rgba(0,0,0,0.6)',
}
export const CARD_RED = { ...CARD, border: '1px solid rgba(255,144,64,0.55)', boxShadow: '0 0 32px rgba(255,144,64,0.18)' }
export const CARD_ACTIVE = { ...CARD, border: '1px solid rgba(0,200,255,0.7)', boxShadow: '0 0 48px rgba(0,200,255,0.28), 0 0 96px rgba(0,200,255,0.08)' }
export const CARD_GREEN = { ...CARD, border: '1px solid rgba(0,255,136,0.5)', boxShadow: '0 0 32px rgba(0,255,136,0.18)' }
export const LABEL = {
  fontFamily: 'Orbitron, sans-serif', fontSize: '10px', fontWeight: 700,
  letterSpacing: '0.2em', color: 'rgba(0,210,255,0.8)', textTransform: 'uppercase', display: 'block',
}
export const H1 = {
  fontFamily: 'Orbitron, sans-serif', fontSize: '24px', fontWeight: 900,
  letterSpacing: '0.06em', color: '#00d9ff', margin: 0,
  textShadow: '0 0 28px rgba(0,200,255,0.95), 0 0 56px rgba(0,200,255,0.4)',
}
export const H2 = {
  fontFamily: 'Orbitron, sans-serif', fontSize: '13px', fontWeight: 700,
  letterSpacing: '0.08em', color: '#e8f6ff',
  textShadow: '0 0 14px rgba(0,200,255,0.4)',
}
export const BODY = { fontFamily: 'Inter, sans-serif', fontSize: '13px', color: 'rgba(210,238,255,0.8)', lineHeight: '1.65' }
export const BTN_PRIMARY = {
  fontFamily: 'Orbitron, sans-serif', fontSize: '10px', fontWeight: 700, letterSpacing: '0.18em',
  padding: '12px 24px', border: '1px solid rgba(0,200,255,0.75)', cursor: 'pointer',
  background: 'rgba(0,200,255,0.18)', color: '#00d9ff',
  boxShadow: '0 0 30px rgba(0,200,255,0.32), 0 0 6px rgba(0,200,255,0.5)',
  textShadow: '0 0 14px rgba(0,200,255,0.9)',
  transition: 'all 0.2s',
}
export const BTN_GHOST = {
  fontFamily: 'Orbitron, sans-serif', fontSize: '10px', fontWeight: 700, letterSpacing: '0.14em',
  padding: '9px 18px', border: '1px solid rgba(0,200,255,0.4)', cursor: 'pointer',
  background: 'rgba(0,200,255,0.08)', color: 'rgba(0,210,255,0.85)',
  textShadow: '0 0 10px rgba(0,200,255,0.5)',
  transition: 'all 0.2s',
}
export const INPUT = {
  width: '100%', backgroundColor: 'rgba(1,8,22,0.8)', border: '1px solid rgba(0,200,255,0.3)',
  color: '#dff0ff', fontFamily: 'JetBrains Mono, monospace', fontSize: '13px',
  padding: '10px 14px', outline: 'none', boxSizing: 'border-box',
}
export const TEXTAREA = { ...INPUT, resize: 'vertical', fontFamily: 'Inter, sans-serif', lineHeight: '1.6', minHeight: '64px' }
export const TAG = (color = '#00d9ff', bg = 'rgba(0,200,255,0.12)') => ({
  fontFamily: 'Orbitron, sans-serif', fontSize: '9px', fontWeight: 700, letterSpacing: '0.16em',
  padding: '4px 10px', border: `1px solid ${color}77`, color, backgroundColor: bg,
  textShadow: `0 0 10px ${color}77`,
})
export const SCORE_BAR = (pct, color) => ({
  height: '5px', width: `${pct}%`, background: color,
  boxShadow: `0 0 12px ${color}aa, 0 0 24px ${color}44`,
  transition: 'width 0.8s cubic-bezier(0.4,0,0.2,1)',
})
export const SKILL_COLORS = {
  rapport: '#00d9ff', discovery: '#22d3ee', tonality: '#bf80ff',
  objection_handling: '#ff8c42', frame_control: '#00ff88',
}
