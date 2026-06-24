import { getAllAnalyses, getSettings } from '../utils/storage'
import { LABEL, H1, BODY, SCORE_BAR } from '../utils/theme'
import HudCard from '../components/HudCard'

const SKILL_COLORS = {
  rapport:            '#0ea5e9',
  discovery:          '#22d3ee',
  tonality:           '#a78bfa',
  objection_handling: '#f97316',
  frame_control:      '#22c55e',
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
        <span style={LABEL}>{label}</span>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          {count > 0 && <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: 'rgba(14,165,233,0.3)' }}>{count} call{count !== 1 ? 's' : ''}</span>}
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '14px', fontWeight: 700, color: count > 0 ? color : 'rgba(14,165,233,0.15)' }}>{count > 0 ? `${score}/10` : '—'}</span>
        </div>
      </div>
      <div style={{ height: '5px', backgroundColor: 'rgba(14,165,233,0.06)', width: '100%', overflow: 'hidden' }}>
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
        <h1 style={{ ...H1, margin: 0 }}>TRAINING</h1>
        <p style={{ ...BODY, marginTop: '4px' }}>{analyses.length} call{analyses.length !== 1 ? 's' : ''} analyzed</p>
      </div>

      {analyses.length === 0 ? (
        <HudCard style={{ textAlign: 'center', padding: '56px 24px' }}>
          <div style={{ ...LABEL, marginBottom: '8px' }}>NO DATA STREAMS</div>
          <div style={BODY}>Analyze calls in the Intel Feed to see patterns here</div>
        </HudCard>
      ) : (
        <>
          <HudCard style={{ padding: '20px' }}>
            <div style={{ ...LABEL, marginBottom: '20px' }}>SKILL MATRIX</div>
            {KEYS.map(k => (
              <SkillBar key={k} label={LABELS[k]} score={avgs[k].score} count={avgs[k].count} color={SKILL_COLORS[k]} />
            ))}
          </HudCard>

          {priorityKey && (
            <HudCard warn style={{ padding: '20px' }}>
              <div style={{ ...LABEL, color: '#f97316', marginBottom: '10px' }}>PRIORITY VECTOR THIS WEEK</div>
              <div style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '18px', fontWeight: 800, color: '#bae6fd', letterSpacing: '0.04em' }}>{LABELS[priorityKey]}</div>
              <div style={{ ...BODY, marginTop: '2px', fontSize: '12px' }}>Average: {avgs[priorityKey].score}/10 across {avgs[priorityKey].count} call{avgs[priorityKey].count !== 1 ? 's' : ''}</div>
              <div style={{ height: '1px', backgroundColor: 'rgba(249,115,22,0.15)', margin: '14px 0' }} />
              <div style={{ ...BODY, color: '#bae6fd' }}>{DRILL_TIPS[priorityKey]}</div>
            </HudCard>
          )}

          {patterns.length > 0 && (
            <HudCard style={{ padding: '20px' }}>
              <div style={{ ...LABEL, marginBottom: '16px' }}>ANOMALIES DETECTED</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {patterns.map(k => (
                  <div key={k} style={{ borderLeft: `2px solid ${SKILL_COLORS[k]}66`, paddingLeft: '12px' }}>
                    <div style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '12px', fontWeight: 700, color: '#bae6fd', letterSpacing: '0.04em' }}>{LABELS[k]} needs work</div>
                    <div style={{ ...BODY, fontSize: '12px', marginTop: '2px' }}>Avg {avgs[k].score}/10 across {avgs[k].count} call{avgs[k].count !== 1 ? 's' : ''}</div>
                  </div>
                ))}
              </div>
            </HudCard>
          )}
        </>
      )}

      {(settings.readingStack || []).length > 0 && (
        <HudCard style={{ padding: '20px' }}>
          <div style={{ ...LABEL, marginBottom: '16px' }}>INTEL LIBRARY</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {(settings.readingStack || []).map((b, i) => (
              <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: 'rgba(14,165,233,0.5)', fontWeight: 700, minWidth: '22px' }}>{String(i+1).padStart(2,'0')}</span>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#bae6fd' }}>{b}</span>
              </div>
            ))}
          </div>
        </HudCard>
      )}

      {(settings.closers || []).length > 0 && (
        <HudCard style={{ padding: '20px' }}>
          <div style={{ ...LABEL, marginBottom: '16px' }}>OPERATORS TO STUDY</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {(settings.closers || []).map((c, i) => (
              <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <span style={{ color: 'rgba(14,165,233,0.5)', fontSize: '10px', fontFamily: 'Orbitron, sans-serif' }}>▶</span>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#bae6fd' }}>{c}</span>
              </div>
            ))}
          </div>
        </HudCard>
      )}
    </div>
  )
}
