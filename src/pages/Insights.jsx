import { getAllAnalyses, getSettings } from '../utils/storage'
import { CARD, CARD_RED, LABEL, H1, H2, BODY, BTN_GHOST, TAG, SCORE_BAR } from '../utils/theme'

const SKILL_COLORS = {
  rapport:            '#ef4444',
  discovery:          '#f97316',
  tonality:           '#22d3ee',
  objection_handling: '#a78bfa',
  frame_control:      '#ef4444',
}

const LABELS = {
  rapport: 'RAPPORT', discovery: 'DISCOVERY', tonality: 'TONALITY',
  objection_handling: 'OBJECTION HANDLING', frame_control: 'FRAME CONTROL',
}

const DRILL_TIPS = {
  rapport:            'Practice mirroring and matching tonality in your first 30 seconds on every call.',
  discovery:          'Use "What makes you say that?" and dig 3 levels deep on every pain point.',
  tonality:           'Record your opener in 5 emotional states daily and play them back.',
  objection_handling: 'Categorize every objection this week and write a specific counter for each.',
  frame_control:      'Study how Jeremy Miner maintains frame when prospects push back. Take notes.',
}

const KEYS = Object.keys(LABELS)

function avg(vals) {
  if (!vals.length) return 0
  return Math.round(vals.reduce((a, b) => a + b, 0) / vals.length * 10) / 10
}

function SkillBar({ label, score, count, color }) {
  return (
    <div style={{ marginBottom: '18px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <span style={{ ...LABEL }}>{label}</span>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          {count > 0 && <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: 'rgba(255,255,255,0.25)' }}>{count} call{count !== 1 ? 's' : ''}</span>}
          <span style={{
            fontFamily: 'Space Grotesk, sans-serif', fontSize: '14px', fontWeight: 800,
            color: count > 0 ? color : 'rgba(255,255,255,0.2)',
          }}>{count > 0 ? `${score}/10` : '—'}</span>
        </div>
      </div>
      <div style={{ height: '5px', backgroundColor: 'rgba(255,255,255,0.05)', width: '100%', overflow: 'hidden' }}>
        {count > 0 && <div style={{ ...SCORE_BAR((score / 10) * 100, color) }} />}
      </div>
    </div>
  )
}

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

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h1 style={{ ...H1, margin: 0 }}>INSIGHTS</h1>
        <p style={{ ...BODY, marginTop: '4px' }}>{analyses.length} call{analyses.length !== 1 ? 's' : ''} analyzed</p>
      </div>

      {analyses.length === 0 ? (
        <div style={{ ...CARD, textAlign: 'center', padding: '56px 24px' }}>
          <div style={{ ...LABEL, marginBottom: '8px' }}>NO ANALYSES YET</div>
          <div style={{ ...BODY }}>Analyze calls in the Calls tab to see patterns here</div>
        </div>
      ) : (
        <>
          <div style={CARD}>
            <div style={{ ...LABEL, marginBottom: '20px' }}>SKILL AVERAGES</div>
            {KEYS.map(k => (
              <SkillBar key={k} label={LABELS[k]} score={avgs[k].score} count={avgs[k].count} color={SKILL_COLORS[k]} />
            ))}
          </div>

          {priorityKey && (
            <div style={{
              ...CARD,
              backgroundColor: 'rgba(239, 68, 68, 0.06)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              boxShadow: '0 0 30px rgba(239, 68, 68, 0.1), inset 0 1px 0 rgba(239, 68, 68, 0.1)',
            }}>
              <div style={{ ...LABEL, color: '#ef4444', marginBottom: '10px' }}>PRIORITY FIX THIS WEEK</div>
              <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '18px', fontWeight: 800, color: '#f1f5f9', letterSpacing: '-0.01em' }}>{LABELS[priorityKey]}</div>
              <div style={{ ...BODY, marginTop: '2px', fontSize: '12px' }}>Average: {avgs[priorityKey].score}/10 across {avgs[priorityKey].count} call{avgs[priorityKey].count !== 1 ? 's' : ''}</div>
              <div style={{ height: '1px', backgroundColor: 'rgba(239,68,68,0.15)', margin: '14px 0' }} />
              <div style={{ ...BODY, color: '#cbd5e1' }}>{DRILL_TIPS[priorityKey]}</div>
            </div>
          )}

          {patterns.length > 0 && (
            <div style={CARD}>
              <div style={{ ...LABEL, marginBottom: '16px' }}>PATTERNS DETECTED</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {patterns.map(k => (
                  <div key={k} style={{ borderLeft: '2px solid rgba(239,68,68,0.5)', paddingLeft: '12px' }}>
                    <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '13px', fontWeight: 700, color: '#f1f5f9' }}>{LABELS[k]} needs work</div>
                    <div style={{ ...BODY, fontSize: '12px', marginTop: '2px' }}>Avg {avgs[k].score}/10 across {avgs[k].count} call{avgs[k].count !== 1 ? 's' : ''}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {(settings.readingStack || []).length > 0 && (
        <div style={CARD}>
          <div style={{ ...LABEL, marginBottom: '16px' }}>READING STACK</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {(settings.readingStack || []).map((b, i) => (
              <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '11px', color: 'rgba(239,68,68,0.7)', fontWeight: 700, minWidth: '22px' }}>{String(i+1).padStart(2,'0')}</span>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#e2e8f0' }}>{b}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {(settings.closers || []).length > 0 && (
        <div style={CARD}>
          <div style={{ ...LABEL, marginBottom: '16px' }}>CLOSERS TO STUDY</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {(settings.closers || []).map((c, i) => (
              <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <span style={{ color: 'rgba(239,68,68,0.7)', fontSize: '10px' }}>▶</span>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#e2e8f0' }}>{c}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
