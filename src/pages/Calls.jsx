import { useState, useEffect, useCallback } from 'react'
import { getSettings, getAnalysis, saveAnalysis } from '../utils/storage'

function detectType(title = '') {
  const t = title.toLowerCase()
  return t.includes('coach') || t.includes('roleplay') || t.includes('genesis') || t.includes('training')
    ? 'COACHING' : 'PROSPECT'
}

function ScoreBar({ label, score }) {
  return (
    <div style={{ marginBottom: '8px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
        <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', color: '#737373' }}>{label}</span>
        <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '11px', fontWeight: 700, color: '#f5f5f5' }}>{score}/10</span>
      </div>
      <div style={{ height: '4px', backgroundColor: '#1a1a1a', width: '100%' }}>
        <div style={{ height: '100%', backgroundColor: score >= 7 ? '#22c55e' : '#ef4444', width: `${(score / 10) * 100}%`, transition: 'width 0.6s' }} />
      </div>
    </div>
  )
}

function AnalysisPanel({ analysis }) {
  return (
    <div className="fade-in" style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #1a1a1a', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '10px', fontWeight: 700, letterSpacing: '0.15em', color: '#737373', marginBottom: '8px' }}>NEEDS WORK</div>
        {(analysis.wrong || []).map((item, i) => (
          <div key={i} style={{ borderLeft: '2px solid #ef4444', paddingLeft: '10px', marginBottom: '10px' }}>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#f5f5f5', marginBottom: '3px' }}>{item.issue}</div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: '#737373' }}>FIX: {item.fix}</div>
          </div>
        ))}
      </div>
      {analysis.right && (
        <div style={{ borderLeft: '2px solid #22c55e', paddingLeft: '10px' }}>
          <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '10px', fontWeight: 700, letterSpacing: '0.15em', color: '#737373', marginBottom: '6px' }}>DONE RIGHT</div>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#f5f5f5', marginBottom: '3px' }}>{analysis.right.what}</div>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: '#737373' }}>{analysis.right.why}</div>
        </div>
      )}
      {analysis.scores && (
        <div>
          <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '10px', fontWeight: 700, letterSpacing: '0.15em', color: '#737373', marginBottom: '10px' }}>SKILL SCORES</div>
          <ScoreBar label="RAPPORT"            score={analysis.scores.rapport} />
          <ScoreBar label="DISCOVERY"          score={analysis.scores.discovery} />
          <ScoreBar label="TONALITY"           score={analysis.scores.tonality} />
          <ScoreBar label="OBJECTION HANDLING" score={analysis.scores.objection_handling} />
          <ScoreBar label="FRAME CONTROL"      score={analysis.scores.frame_control} />
        </div>
      )}
      {analysis.drill_this_week && (
        <div style={{ backgroundColor: '#0a0a0a', border: '1px solid #1a1a1a', padding: '12px' }}>
          <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '10px', fontWeight: 700, letterSpacing: '0.15em', color: '#ef4444', marginBottom: '6px' }}>DRILL THIS WEEK</div>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#f5f5f5' }}>{analysis.drill_this_week}</div>
        </div>
      )}
    </div>
  )
}

function CallCard({ call, onAnalyze }) {
  const [analysis, setAnalysis] = useState(() => getAnalysis(call.id))
  const [expanded,  setExpanded]  = useState(false)
  const [analyzing, setAnalyzing] = useState(false)
  const [error,     setError]     = useState(null)

  const type        = detectType(call.title || call.meeting_title || '')
  const title       = call.title || call.meeting_title || 'Untitled Call'
  const dateRaw     = call.created_at || call.started_at || call.date
  const dateStr     = dateRaw ? new Date(dateRaw).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ''
  const duration    = call.duration_seconds ? `${Math.round(call.duration_seconds / 60)}m` : ''

  const handleAnalyze = async () => {
    if (analysis) { setExpanded(e => !e); return }
    setAnalyzing(true); setError(null)
    try {
      const result = await onAnalyze(call)
      setAnalysis(result)
      setExpanded(true)
    } catch (err) {
      setError(err.message || 'Analysis failed')
    } finally {
      setAnalyzing(false)
    }
  }

  return (
    <div style={{ backgroundColor: '#111111', border: `1px solid ${analysis ? '#22c55e33' : '#1a1a1a'}`, padding: '14px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px', flexWrap: 'wrap' }}>
            <span style={{
              fontFamily: 'Space Grotesk, sans-serif', fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em',
              padding: '2px 6px', border: `1px solid ${type === 'COACHING' ? '#22c55e' : '#ef4444'}`,
              color: type === 'COACHING' ? '#22c55e' : '#ef4444',
              backgroundColor: type === 'COACHING' ? '#0a1a0a' : '#1a0a0a',
            }}>{type}</span>
            {dateStr  && <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: '#737373' }}>{dateStr}</span>}
            {duration && <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: '#737373' }}>{duration}</span>}
            {analysis && <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '10px', fontWeight: 700, color: '#22c55e', letterSpacing: '0.1em' }}>✓ ANALYZED</span>}
          </div>
          <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '13px', fontWeight: 700, color: '#f5f5f5', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{title}</div>
        </div>
        <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
          <a href={`https://fathom.video/calls/${call.id}`} target="_blank" rel="noopener noreferrer"
             style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', padding: '6px 10px', border: '1px solid #1a1a1a', color: '#737373', textDecoration: 'none', whiteSpace: 'nowrap', transition: 'all 0.15s' }}>
            OPEN
          </a>
          <button onClick={handleAnalyze} disabled={analyzing} style={{
            fontFamily: 'Space Grotesk, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em',
            padding: '6px 10px', border: 'none', cursor: analyzing ? 'wait' : 'pointer',
            whiteSpace: 'nowrap', transition: 'all 0.15s',
            backgroundColor: analysis ? (expanded ? '#22c55e' : 'transparent') : '#ef4444',
            color: analysis ? (expanded ? '#fff' : '#22c55e') : '#fff',
            border: analysis ? '1px solid #22c55e' : '1px solid #ef4444',
            opacity: analyzing ? 0.6 : 1,
          }}>
            {analyzing ? 'ANALYZING...' : analysis ? (expanded ? 'HIDE' : 'VIEW') : 'ANALYZE'}
          </button>
        </div>
      </div>
      {error && (
        <div style={{ marginTop: '10px', padding: '8px 10px', backgroundColor: '#1a0a0a', border: '1px solid #ef4444', fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#ef4444' }}>
          ERROR: {error}
        </div>
      )}
      {expanded && analysis && <AnalysisPanel analysis={analysis} />}
    </div>
  )
}

export default function Calls() {
  const [calls,   setCalls]   = useState([])
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState(null)
  const [filter,  setFilter]  = useState('ALL')

  const fetchCalls = useCallback(async () => {
    const { fathomKey } = getSettings()
    if (!fathomKey) { setError('Add your Fathom API key in Settings to load calls.'); return }
    setLoading(true); setError(null)
    try {
      const res = await fetch('https://api.fathom.video/v1/calls?limit=30', {
        headers: { Authorization: `Bearer ${fathomKey}` }
      })
      if (!res.ok) throw new Error(`Fathom: ${res.status} ${res.statusText}`)
      const data = await res.json()
      setCalls(Array.isArray(data) ? data : (data.data || data.calls || []))
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchCalls() }, [fetchCalls])

  const handleAnalyze = async (call) => {
    const { fathomKey, anthropicKey } = getSettings()
    if (!fathomKey)    throw new Error('Fathom API key not configured')
    if (!anthropicKey) throw new Error('Anthropic API key not configured')

    const txRes = await fetch(`https://api.fathom.video/v1/calls/${call.id}/transcript`, {
      headers: { Authorization: `Bearer ${fathomKey}` }
    })
    if (!txRes.ok) throw new Error(`Transcript fetch failed: ${txRes.status}`)
    const txData = await txRes.json()

    const transcript = Array.isArray(txData)
      ? txData.map(t => `${t.speaker || t.name || ''}: ${t.text || t.content || ''}`).join('\n')
      : (txData.transcript || txData.text || JSON.stringify(txData))

    const claudeRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': anthropicKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 1024,
        system: 'You are a brutal, honest sales coach. Return ONLY valid JSON, no other text, no markdown.',
        messages: [{ role: 'user', content:
          `Analyze this sales call transcript. Return ONLY this JSON structure:\n{"wrong":[{"issue":"","fix":""},{"issue":"","fix":""},{"issue":"","fix":""}],"right":{"what":"","why":""},"scores":{"rapport":0,"discovery":0,"tonality":0,"objection_handling":0,"frame_control":0},"drill_this_week":""}\n\nTRANSCRIPT:\n${transcript.slice(0, 8000)}`
        }]
      })
    })
    if (!claudeRes.ok) {
      const e = await claudeRes.json().catch(() => ({}))
      throw new Error(`Claude: ${claudeRes.status} — ${e.error?.message || claudeRes.statusText}`)
    }
    const { content } = await claudeRes.json()
    const raw = content?.[0]?.text || ''
    const match = raw.match(/\{[\s\S]*\}/)
    if (!match) throw new Error('Claude returned no valid JSON')
    const analysis = JSON.parse(match[0])
    saveAnalysis(call.id, analysis)
    return analysis
  }

  const filtered = calls.filter(c =>
    filter === 'ALL' ? true : detectType(c.title || c.meeting_title || '') === filter
  )

  const pill = (label) => ({
    fontFamily: 'Space Grotesk, sans-serif', fontSize: '11px', fontWeight: 700,
    letterSpacing: '0.14em', padding: '6px 14px', border: 'none', cursor: 'pointer',
    transition: 'all 0.15s',
    backgroundColor: filter === label ? '#ef4444' : 'transparent',
    color: filter === label ? '#fff' : '#737373',
    border: `1px solid ${filter === label ? '#ef4444' : '#1a1a1a'}`,
  })

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '22px', fontWeight: 800, color: '#f5f5f5', letterSpacing: '-0.02em', margin: 0 }}>CALL LIBRARY</h1>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#737373', marginTop: '4px' }}>{calls.length} calls loaded</p>
        </div>
        <button onClick={fetchCalls} disabled={loading} style={{
          fontFamily: 'Space Grotesk, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em',
          padding: '6px 12px', border: '1px solid #1a1a1a', backgroundColor: 'transparent',
          color: '#737373', cursor: loading ? 'wait' : 'pointer', opacity: loading ? 0.5 : 1,
        }}>{loading ? 'LOADING...' : 'REFRESH'}</button>
      </div>

      <div style={{ display: 'flex', gap: '6px' }}>
        {['ALL','PROSPECT','COACHING'].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={pill(f)}>{f}</button>
        ))}
      </div>

      {error && (
        <div style={{ padding: '14px', backgroundColor: '#1a0a0a', border: '1px solid #ef4444', fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#ef4444' }}>{error}</div>
      )}
      {loading && (
        <div style={{ textAlign: 'center', padding: '48px 0', fontFamily: 'Space Grotesk, sans-serif', fontSize: '12px', letterSpacing: '0.15em', color: '#737373' }} className="animate-pulse">LOADING CALLS...</div>
      )}
      {!loading && !error && filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '48px 0' }}>
          <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '12px', letterSpacing: '0.15em', color: '#737373' }}>NO CALLS FOUND</div>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {filtered.map(call => <CallCard key={call.id} call={call} onAnalyze={handleAnalyze} />)}
      </div>
    </div>
  )
}
