export const CARD = {
  backgroundColor: '#111111',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '14px',
  position: 'relative',
  padding: '20px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.35)',
}
export const CARD_RED = {
  ...CARD, backgroundColor: '#1a0e00',
  border: '1px solid rgba(255,159,10,0.3)',
  boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
}
export const CARD_ACTIVE = {
  ...CARD,
  border: '1px solid rgba(10,132,255,0.45)',
  boxShadow: '0 2px 8px rgba(0,0,0,0.4), 0 0 0 1px rgba(10,132,255,0.15)',
}
export const CARD_GREEN = {
  ...CARD, backgroundColor: '#0a1a0d',
  border: '1px solid rgba(48,209,88,0.3)',
}
export const LABEL = {
  fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: 500,
  letterSpacing: '0.05em', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', display: 'block',
}
export const H1 = {
  fontFamily: 'Inter, sans-serif', fontSize: '28px', fontWeight: 800,
  letterSpacing: '-0.03em', color: '#ffffff', margin: 0,
}
export const H2 = {
  fontFamily: 'Inter, sans-serif', fontSize: '15px', fontWeight: 700,
  letterSpacing: '-0.02em', color: '#f5f5f7',
}
export const BODY = {
  fontFamily: 'Inter, sans-serif', fontSize: '14px', color: 'rgba(255,255,255,0.5)', lineHeight: '1.6',
}
export const BTN_PRIMARY = {
  fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 600,
  padding: '12px 24px', border: 'none', cursor: 'pointer', borderRadius: '10px',
  background: '#0a84ff', color: '#ffffff',
  boxShadow: '0 4px 16px rgba(10,132,255,0.4)',
  letterSpacing: '-0.01em',
  transition: 'all 0.15s',
}
export const BTN_GHOST = {
  fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 500,
  padding: '10px 18px', cursor: 'pointer', borderRadius: '10px',
  background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.75)',
  border: '1px solid rgba(255,255,255,0.1)',
  letterSpacing: '-0.01em',
  transition: 'all 0.15s',
}
export const INPUT = {
  width: '100%', backgroundColor: '#1c1c1e', border: '1px solid rgba(255,255,255,0.12)',
  color: '#f5f5f7', fontFamily: 'Inter, sans-serif', fontSize: '14px',
  padding: '11px 14px', outline: 'none', boxSizing: 'border-box', borderRadius: '10px',
}
export const TEXTAREA = { ...INPUT, resize: 'vertical', lineHeight: '1.6', minHeight: '80px' }
export const TAG = (color = '#0a84ff', bg = 'rgba(10,132,255,0.15)') => ({
  fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: 600, letterSpacing: '0.02em',
  padding: '4px 10px', borderRadius: '6px', border: `1px solid ${color}44`, color, backgroundColor: bg,
})
export const SCORE_BAR = (pct, color) => ({
  height: '4px', width: `${pct}%`, background: color, borderRadius: '4px',
  transition: 'width 0.8s cubic-bezier(0.4,0,0.2,1)',
})
export const SKILL_COLORS = {
  rapport: '#0a84ff', discovery: '#5ac8fa', tonality: '#bf5af2',
  objection_handling: '#ff9f0a', frame_control: '#30d158',
}
