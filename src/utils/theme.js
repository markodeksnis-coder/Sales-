export const CARD = {
  backgroundColor: '#0c1828',
  border: '1px solid rgba(255,255,255,0.08)',
  position: 'relative',
  padding: '20px',
  boxShadow: '0 1px 3px rgba(0,0,0,0.3), 0 8px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)',
  borderRadius: '2px',
}
export const CARD_RED = { ...CARD, border: '1px solid rgba(255,150,50,0.3)', boxShadow: '0 8px 24px rgba(0,0,0,0.3), 0 0 20px rgba(255,100,0,0.08)' }
export const CARD_ACTIVE = { ...CARD, border: '1px solid rgba(0,160,255,0.45)', boxShadow: '0 8px 24px rgba(0,0,0,0.35), 0 0 28px rgba(0,140,255,0.15)' }
export const CARD_GREEN = { ...CARD, border: '1px solid rgba(0,220,100,0.35)', boxShadow: '0 8px 24px rgba(0,0,0,0.3), 0 0 20px rgba(0,200,80,0.1)' }
export const LABEL = {
  fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: 500,
  letterSpacing: '0.06em', color: 'rgba(255,255,255,0.38)', textTransform: 'uppercase', display: 'block',
}
export const H1 = {
  fontFamily: 'Orbitron, sans-serif', fontSize: '26px', fontWeight: 900,
  letterSpacing: '0.04em', color: '#ffffff', margin: 0,
}
export const H2 = {
  fontFamily: 'Orbitron, sans-serif', fontSize: '13px', fontWeight: 700,
  letterSpacing: '0.06em', color: '#e8f3ff',
}
export const BODY = { fontFamily: 'Inter, sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.5)', lineHeight: '1.65' }
export const BTN_PRIMARY = {
  fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 600,
  padding: '10px 22px', border: '1px solid rgba(0,140,255,0.5)', cursor: 'pointer', borderRadius: '6px',
  background: 'rgba(0,120,255,0.2)', color: '#ffffff',
  boxShadow: '0 0 0 1px rgba(0,140,255,0.1)',
  transition: 'all 0.15s',
}
export const BTN_GHOST = {
  fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 500,
  padding: '9px 18px', border: '1px solid rgba(255,255,255,0.12)', cursor: 'pointer', borderRadius: '6px',
  background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.7)',
  transition: 'all 0.15s',
}
export const INPUT = {
  width: '100%', backgroundColor: '#060e1a', border: '1px solid rgba(255,255,255,0.1)',
  color: '#e8f3ff', fontFamily: 'Inter, sans-serif', fontSize: '13px',
  padding: '10px 14px', outline: 'none', boxSizing: 'border-box', borderRadius: '6px',
}
export const TEXTAREA = { ...INPUT, resize: 'vertical', lineHeight: '1.65', minHeight: '72px' }
export const TAG = (color = '#0af', bg = 'rgba(0,170,255,0.1)') => ({
  fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: 500, letterSpacing: '0.04em',
  padding: '3px 10px', borderRadius: '4px', border: `1px solid ${color}44`, color, backgroundColor: bg,
})
export const SCORE_BAR = (pct, color) => ({
  height: '4px', width: `${pct}%`, background: color, borderRadius: '2px',
  transition: 'width 0.8s cubic-bezier(0.4,0,0.2,1)',
})
export const SKILL_COLORS = {
  rapport: '#0af', discovery: '#22d3ee', tonality: '#a87bff',
  objection_handling: '#ff8c42', frame_control: '#00e87a',
}
