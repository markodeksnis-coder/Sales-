export const CARD = {
  backgroundColor: '#081c38',
  border: '1px solid rgba(0,120,200,0.4)',
  position: 'relative',
  padding: '18px',
  boxShadow: '0 4px 24px rgba(0,0,0,0.5)',
}
export const CARD_RED = { ...CARD, border: '1px solid rgba(255,140,66,0.5)', boxShadow: '0 4px 24px rgba(0,0,0,0.5), 0 0 24px rgba(255,140,66,0.14)' }
export const CARD_ACTIVE = { ...CARD, border: '1px solid rgba(0,200,255,0.65)', boxShadow: '0 4px 28px rgba(0,0,0,0.55), 0 0 36px rgba(0,200,255,0.2)' }
export const CARD_GREEN = { ...CARD, border: '1px solid rgba(0,232,122,0.5)', boxShadow: '0 4px 24px rgba(0,0,0,0.5), 0 0 24px rgba(0,232,122,0.14)' }
export const LABEL = {
  fontFamily: 'Orbitron, sans-serif', fontSize: '10px', fontWeight: 700,
  letterSpacing: '0.2em', color: '#4a90b8', textTransform: 'uppercase', display: 'block',
}
export const H1 = {
  fontFamily: 'Orbitron, sans-serif', fontSize: '24px', fontWeight: 900,
  letterSpacing: '0.06em', color: '#00ccff', margin: 0,
  textShadow: '0 0 28px #00ccff, 0 0 56px rgba(0,200,255,0.4)',
}
export const H2 = {
  fontFamily: 'Orbitron, sans-serif', fontSize: '14px', fontWeight: 700,
  letterSpacing: '0.07em', color: '#e0f2ff',
}
export const BODY = { fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#7aaecc', lineHeight: '1.65' }
export const BTN_PRIMARY = {
  fontFamily: 'Orbitron, sans-serif', fontSize: '10px', fontWeight: 700, letterSpacing: '0.18em',
  padding: '12px 26px', border: '1px solid rgba(0,190,255,0.7)', cursor: 'pointer',
  background: 'rgba(0,180,255,0.18)', color: '#00ccff',
  boxShadow: '0 0 28px rgba(0,180,255,0.3)',
  textShadow: '0 0 12px rgba(0,200,255,0.8)',
  transition: 'all 0.2s',
}
export const BTN_GHOST = {
  fontFamily: 'Orbitron, sans-serif', fontSize: '10px', fontWeight: 700, letterSpacing: '0.14em',
  padding: '9px 18px', border: '1px solid rgba(0,160,220,0.35)', cursor: 'pointer',
  background: 'rgba(0,140,200,0.08)', color: '#5aaccc',
  transition: 'all 0.2s',
}
export const INPUT = {
  width: '100%', backgroundColor: '#040f20', border: '1px solid rgba(0,130,200,0.35)',
  color: '#cce4ff', fontFamily: 'JetBrains Mono, monospace', fontSize: '13px',
  padding: '10px 14px', outline: 'none', boxSizing: 'border-box',
}
export const TEXTAREA = { ...INPUT, resize: 'vertical', fontFamily: 'Inter, sans-serif', lineHeight: '1.65', minHeight: '68px' }
export const TAG = (color = '#00ccff', bg = 'rgba(0,180,255,0.12)') => ({
  fontFamily: 'Orbitron, sans-serif', fontSize: '9px', fontWeight: 700, letterSpacing: '0.15em',
  padding: '4px 10px', border: `1px solid ${color}66`, color, backgroundColor: bg,
})
export const SCORE_BAR = (pct, color) => ({
  height: '5px', width: `${pct}%`, background: color,
  boxShadow: `0 0 10px ${color}99`,
  transition: 'width 0.8s cubic-bezier(0.4,0,0.2,1)',
})
export const SKILL_COLORS = {
  rapport: '#00ccff', discovery: '#22d3ee', tonality: '#a87bff',
  objection_handling: '#ff8c42', frame_control: '#00e87a',
}
