// Shared design tokens used across all pages
export const CARD = {
  backgroundColor: 'rgba(10, 15, 30, 0.85)',
  border: '1px solid rgba(255, 255, 255, 0.07)',
  backdropFilter: 'blur(24px)',
  WebkitBackdropFilter: 'blur(24px)',
  padding: '20px',
}

export const CARD_RED = {
  ...CARD,
  backgroundColor: 'rgba(239, 68, 68, 0.06)',
  border: '1px solid rgba(239, 68, 68, 0.25)',
  boxShadow: '0 0 30px rgba(239, 68, 68, 0.08), inset 0 1px 0 rgba(239, 68, 68, 0.1)',
}

export const CARD_ACTIVE = {
  ...CARD,
  border: '1px solid rgba(239, 68, 68, 0.45)',
  boxShadow: '0 0 25px rgba(239, 68, 68, 0.15)',
}

export const CARD_GREEN = {
  ...CARD,
  border: '1px solid rgba(34, 197, 94, 0.3)',
  boxShadow: '0 0 20px rgba(34, 197, 94, 0.08)',
}

export const LABEL = {
  fontFamily: 'Space Grotesk, sans-serif',
  fontSize: '10px',
  fontWeight: 700,
  letterSpacing: '0.22em',
  color: 'rgba(255,255,255,0.28)',
  textTransform: 'uppercase',
}

export const H1 = {
  fontFamily: 'Space Grotesk, sans-serif',
  fontSize: '24px',
  fontWeight: 800,
  letterSpacing: '-0.02em',
  background: 'linear-gradient(135deg, #f1f5f9 30%, #94a3b8 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
}

export const H2 = {
  fontFamily: 'Space Grotesk, sans-serif',
  fontSize: '15px',
  fontWeight: 700,
  color: '#f1f5f9',
  letterSpacing: '-0.01em',
}

export const BODY = {
  fontFamily: 'Inter, sans-serif',
  fontSize: '13px',
  color: '#64748b',
  lineHeight: '1.5',
}

export const BTN_PRIMARY = {
  fontFamily: 'Space Grotesk, sans-serif',
  fontSize: '11px',
  fontWeight: 700,
  letterSpacing: '0.18em',
  padding: '10px 22px',
  border: 'none',
  cursor: 'pointer',
  background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
  color: '#fff',
  boxShadow: '0 0 24px rgba(239, 68, 68, 0.35)',
  transition: 'all 0.2s',
}

export const BTN_GHOST = {
  fontFamily: 'Space Grotesk, sans-serif',
  fontSize: '11px',
  fontWeight: 700,
  letterSpacing: '0.15em',
  padding: '8px 16px',
  border: '1px solid rgba(255,255,255,0.1)',
  cursor: 'pointer',
  background: 'rgba(255,255,255,0.03)',
  color: 'rgba(255,255,255,0.45)',
  transition: 'all 0.2s',
}

export const INPUT = {
  width: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.35)',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  color: '#f1f5f9',
  fontFamily: 'Inter, sans-serif',
  fontSize: '13px',
  padding: '10px 12px',
  outline: 'none',
  boxSizing: 'border-box',
  transition: 'border-color 0.2s',
}

export const TEXTAREA = {
  ...INPUT,
  resize: 'vertical',
  minHeight: '60px',
}

export const TAG = (color = '#ef4444', bg = 'rgba(239,68,68,0.08)') => ({
  fontFamily: 'Space Grotesk, sans-serif',
  fontSize: '10px',
  fontWeight: 700,
  letterSpacing: '0.14em',
  padding: '3px 8px',
  border: `1px solid ${color}55`,
  color,
  backgroundColor: bg,
})

export const SCORE_BAR = (pct, color) => ({
  height: '5px',
  width: `${pct}%`,
  background: `linear-gradient(90deg, ${color}, ${color}88)`,
  boxShadow: `0 0 8px ${color}66`,
  transition: 'width 0.7s cubic-bezier(0.4,0,0.2,1)',
})
