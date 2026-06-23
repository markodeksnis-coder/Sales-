import { getAllAnalyses, getSettings } from '../utils/storage'

function avg(vals) {
  if (!vals.length) return 0
  return Math.round(vals.reduce((a, b) => a + b, 0) / vals.length * 10) / 10
}

function SkillBar({ label, score, count }) {
  const color = score >= 7 ? '#22c55e' : score >= 5 ? '#ef4444' : '#7f1d1d'
  return (
    <div style={{ marginBottom: '14px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
        <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', color: '#f5f5f5' }}>{label}</span>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: '#737373' }}>{count} calls</span>
          <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '13px', fontWeight: 700, color }}>{count ? `${score}/10` : '—'}</span>
        </div>
      </div>
      <div style={{ height: '6px', backgroundColor: '#1a1a1a', width: '100%' }}>
        {count > 0 && <div style={{ height: '100%', backgroundColor: color, width: `${(score / 10) * 100}%`, transition: 'width 0.7s' }} />}
      </div>
    </div>
  )
}

const DRILL_TIPS = {
  rapport:            'Practice mirroring and matching tonality in your first 30 seconds on every call.',
  discovery:          'Use “What makes you say that?” and dig 3 levels deep on every pain point.',
  tonality:           'Record your opener in 5 emotional states daily and play them back.',
  objection_handling: 'Categorize every objection this week and write a specific counter for each.',
  frame_control:      'Study how Jeremy Miner maintains frame when prospects push back. Take notes.',
}

const LABELS = {
  rapport: 'RAPPORT', discovery: 'DISCOVERY', tonality: 'TONALITY',
  objection_handling: 'OBJECTION HANDLING', frame_control: 'FRAME CONTROL',
}

const KEYS = Object.keys(LABELS)

export default function Insights() {
  const analyses = getAllAnalyses()
  const settings = getSettings()

  const avgs = {}
  KEYS.forEach(k => {
    const vals = analyses.map(a => a.scores?.[k]).filter(v => typeof v === 'number')
    avgs[k] = { score: avg(vals), count: vals.length }
  })

  const patterns = KEYS.filter(k => avgs[k].score < 6 && avgs[k].count > 0)
  const priorityKey = KEYS.filter(k => avgs[k].count > 0).sort((a, b) => avgs[a].score - avgs[b].score)[0]

  const box = (extra = {}) => ({
    backgroundColor: '#111111', border: '1px solid #1a1a1a', padding: '16px', ...extra
  })

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '22px', fontWeight: 800, color: '#f5f5f5', letterSpacing: '-0.02em', margin: 0 }}>INSIGHTS</h1>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#737373', marginTop: '4px' }}>{analyses.length} calls analyzed</p>
      </div>

      {analyses.length === 0 ? (
        <div style={{ ...box(), textAlign: 'center', padding: '48px 16px' }}>
          <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '12px', letterSpacing: '0.15em', color: '#737373' }}>NO ANALYSES YET</div>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#737373', marginTop: '8px' }}>Analyze calls in the Calls tab to see patterns here</div>
        </div>
      ) : (
        <>
          <div style={box()}>
            <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '10px', fontWeight: 700, letterSpacing: '0.15em', color: '#737373', marginBottom: '16px' }}>SKILL AVERAGES</div>
            {KEYS.map(k => <SkillBar key={k} label={LABELS[k]} score={avgs[k].score} count={avgs[k].count} />)}
          </div>

          {priorityKey && (
            <div style={{ backgroundColor: '#1a0a0a', border: '1px solid #ef4444', padding: '16px', boxShadow: '0 0 16px rgba(239,68,68,0.12)' }}>
              <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '10px', fontWeight: 700, letterSpacing: '0.15em', color: '#ef4444', marginBottom: '6px' }}>PRIORITY FIX THIS WEEK</div>
              <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '16px', fontWeight: 800, color: '#f5f5f5' }}>{LABELS[priorityKey]}</div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: '#737373', marginTop: '2px' }}>Average: {avgs[priorityKey].score}/10</div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#f5f5f5', marginTop: '10px' }}>{DRILL_TIPS[priorityKey]}</div>
            </div>
          )}

          {patterns.length > 0 && (
            <div style={box({ display: 'flex', flexDirection: 'column', gap: '12px' })}>
              <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '10px', fontWeight: 700, letterSpacing: '0.15em', color: '#737373' }}>PATTERNS DETECTED</div>
              {patterns.map(k => (
                <div key={k} style={{ borderLeft: '2px solid #ef4444', paddingLeft: '10px' }}>
                  <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '13px', fontWeight: 700, color: '#f5f5f5' }}>{LABELS[k]} needs work</div>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: '#737373', marginTop: '2px' }}>Avg {avgs[k].score}/10 across {avgs[k].count} call{avgs[k].count !== 1 ? 's' : ''}</div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      <div style={{ backgroundColor: '#111111', border: '1px solid #1a1a1a', padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '10px', fontWeight: 700, letterSpacing: '0.15em', color: '#737373' }}>READING STACK</div>
        {(settings.readingStack || []).map((b, i) => (
          <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '11px', color: '#ef4444', fontWeight: 700, minWidth: '20px' }}>{String(i+1).padStart(2,'0')}</span>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#f5f5f5' }}>{b}</span>
          </div>
        ))}
      </div>

      <div style={{ backgroundColor: '#111111', border: '1px solid #1a1a1a', padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '10px', fontWeight: 700, letterSpacing: '0.15em', color: '#737373' }}>CLOSERS TO STUDY</div>
        {(settings.closers || []).map((c, i) => (
          <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <span style={{ color: '#ef4444', fontSize: '12px' }}>▶</span>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#f5f5f5' }}>{c}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
