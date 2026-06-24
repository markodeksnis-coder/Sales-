import { useState, useEffect, useCallback } from 'react'
import { getSettings, getAnalysis, saveAnalysis } from '../utils/storage'
import { LABEL, H1, BODY, BTN_PRIMARY, BTN_GHOST, SCORE_BAR } from '../utils/theme'
import HudCard from '../components/HudCard'

const SKILL_COLORS = {
  rapport:            '#0ea5e9',
  discovery:          '#22d3ee',
  tonality:           '#a78bfa',
  objection_handling: '#f97316',
  frame_control:      '#22c55e',
}

function detectType(title = '') {
  const t = title.toLowerCase()
  return t.includes('coach')||t.includes('roleplay')||t.includes('genesis')||t.includes('training') ? 'COACHING' : 'PROSPECT'
}

function AnalysisPanel({ analysis }) {
  return (
    <div className="fade-in" style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(14,165,233,0.1)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <div style={{ ...LABEL, marginBottom: '10px' }}>NEEDS WORK</div>
        {(analysis.wrong||[]).map((item,i) => (
          <div key={i} style={{ borderLeft: '2px solid rgba(249,115,22,0.6)', marginBottom: '12px', background: 'rgba(249,115,22,0.03)', padding: '8px 12px' }}>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#bae6fd', marginBottom: '4px' }}>{item.issue}</div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: 'rgba(14,165,233,0.4)' }}>FIX → {item.fix}</div>
          </div>
        ))}
      </div>
      {analysis.right && (
        <div style={{ borderLeft: '2px solid rgba(34,197,94,0.6)', background: 'rgba(34,197,94,0.03)', padding: '8px 12px' }}>
          <div style={{ ...LABEL, color: 'rgba(34,197,94,0.6)', marginBottom: '6px' }}>DONE RIGHT</div>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#bae6fd', marginBottom: '4px' }}>{analysis.right.what}</div>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: 'rgba(14,165,233,0.4)' }}>{analysis.right.why}</div>
        </div>
      )}
      {analysis.scores && (
        <div>
          <div style={{ ...LABEL, marginBottom: '12px' }}>SKILL MATRIX</div>
          {[['RAPPORT','rapport'],['DISCOVERY','discovery'],['TONALITY','tonality'],['OBJECTION HANDLING','objection_handling'],['FRAME CONTROL','frame_control']].map(([lbl,key]) => {
            const col = SKILL_COLORS[key]
            return (
              <div key={key} style={{ marginBottom: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <span style={LABEL}>{lbl}</span>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', fontWeight: 700, color: col }}>{analysis.scores[key]}/10</span>
                </div>
                <div style={{ height: '4px', backgroundColor: 'rgba(14,165,233,0.06)', width: '100%' }}>
                  <div style={{ ...SCORE_BAR((analysis.scores[key]/10)*100, col) }} />
                </div>
              </div>
            )
          })}
        </div>
      )}
      {analysis.drill_this_week && (
        <div style={{ background: 'rgba(14,165,233,0.05)', border: '1px solid rgba(14,165,233,0.2)', padding: '12px' }}>
          <div style={{ ...LABEL, color: 'rgba(14,165,233,0.7)', marginBottom: '6px' }}>DRILL THIS WEEK</div>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#bae6fd' }}>{analysis.drill_this_week}</div>
        </div>
      )}
    </div>
  )
}

function CallCard({ call, onAnalyze }) {
  const [analysis,  setAnalysis]  = useState(() => getAnalysis(call.id))
  const [expanded,  setExpanded]  = useState(false)
  const [analyzing, setAnalyzing] = useState(false)
  const [error,     setError]     = useState(null)

  const type     = detectType(call.title||call.meeting_title||'')
  const title    = call.title||call.meeting_title||'Untitled Call'
  const dateRaw  = call.created_at||call.started_at||call.date
  const dateStr  = dateRaw ? new Date(dateRaw).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'}) : ''
  const duration = call.duration_seconds ? `${Math.round(call.duration_seconds/60)}m` : ''

  const handleAnalyze = async () => {
    if (analysis) { setExpanded(e => !e); return }
    setAnalyzing(true); setError(null)
    try { const r = await onAnalyze(call); setAnalysis(r); setExpanded(true) }
    catch (err) { setError(err.message||'Analysis failed') }
    finally { setAnalyzing(false) }
  }

  const typeColor = type === 'COACHING' ? '#22c55e' : '#0ea5e9'
  const typeBg    = type === 'COACHING' ? 'rgba(34,197,94,0.08)' : 'rgba(14,165,233,0.08)'

  return (
    <HudCard active={analysis && expanded} green={!!analysis && !expanded} style={{ padding: '14px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '8px', fontWeight: 700, letterSpacing: '0.18em', padding: '3px 8px', border: `1px solid ${typeColor}55`, color: typeColor, backgroundColor: typeBg }}>{type}</span>
            {dateStr  && <span style={{ fontFamily:'JetBrains Mono, monospace', fontSize:'11px', color:'rgba(14,165,233,0.3)' }}>{dateStr}</span>}
            {duration && <span style={{ fontFamily:'JetBrains Mono, monospace', fontSize:'11px', color:'rgba(14,165,233,0.3)' }}>{duration}</span>}
            {analysis && <span style={{ fontFamily:'Orbitron, sans-serif', fontSize:'8px', fontWeight:700, letterSpacing:'0.12em', color:'#22c55e' }}>✓ ANALYZED</span>}
          </div>
          <div style={{ fontFamily:'Orbitron, sans-serif', fontSize:'13px', fontWeight:700, color:'#bae6fd', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', letterSpacing:'0.04em' }}>{title}</div>
        </div>
        <div style={{ display:'flex', gap:'6px', flexShrink:0 }}>
          <a href={`https://fathom.video/calls/${call.id}`} target="_blank" rel="noopener noreferrer"
            style={{ ...BTN_GHOST, textDecoration:'none', fontSize:'9px', padding:'7px 12px', whiteSpace:'nowrap' }}>OPEN</a>
          <button onClick={handleAnalyze} disabled={analyzing} style={{
            fontFamily: 'Orbitron, sans-serif', fontSize: '9px', fontWeight: 700, letterSpacing: '0.14em',
            padding: '7px 14px', cursor: analyzing ? 'wait' : 'pointer', whiteSpace: 'nowrap', transition: 'all 0.2s',
            opacity: analyzing ? 0.6 : 1, border: '1px solid',
            background: analysis ? (expanded ? 'rgba(14,165,233,0.15)' : 'rgba(14,165,233,0.08)') : 'rgba(14,165,233,0.12)',
            borderColor: 'rgba(14,165,233,0.4)',
            color: '#38bdf8',
            boxShadow: '0 0 16px rgba(14,165,233,0.15)',
          }}>{analyzing ? 'SCANNING...' : analysis ? (expanded ? 'COLLAPSE' : 'VIEW INTEL') : 'ANALYZE'}</button>
        </div>
      </div>
      {error && <div style={{ marginTop:'10px', padding:'8px 12px', background:'rgba(249,115,22,0.08)', border:'1px solid rgba(249,115,22,0.25)', fontFamily:'Inter,sans-serif', fontSize:'12px', color:'#f97316' }}>ERROR: {error}</div>}
      {expanded && analysis && <AnalysisPanel analysis={analysis} />}
    </HudCard>
  )
}

export default function Calls() {
  const [calls,   setCalls]   = useState([])
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState(null)
  const [filter,  setFilter]  = useState('ALL')

  const fetchCalls = useCallback(async () => {
    const { fathomKey } = getSettings()
    if (!fathomKey) { setError('Add your Fathom API key in Settings.'); return }
    setLoading(true); setError(null)
    try {
      const res = await fetch('https://api.fathom.video/v1/calls?limit=30', { headers: { Authorization: `Bearer ${fathomKey}` } })
      if (!res.ok) throw new Error(`Fathom: ${res.status}`)
      const data = await res.json()
      setCalls(Array.isArray(data) ? data : (data.data||data.calls||[]))
    } catch (err) { setError(err.message) }
    finally { setLoading(false) }
  }, [])

  useEffect(() => { fetchCalls() }, [fetchCalls])

  const handleAnalyze = async (call) => {
    const { fathomKey, anthropicKey } = getSettings()
    if (!fathomKey)    throw new Error('Fathom API key not configured')
    if (!anthropicKey) throw new Error('Anthropic API key not configured')
    const txRes = await fetch(`https://api.fathom.video/v1/calls/${call.id}/transcript`, { headers: { Authorization: `Bearer ${fathomKey}` } })
    if (!txRes.ok) throw new Error(`Transcript: ${txRes.status}`)
    const txData = await txRes.json()
    const transcript = Array.isArray(txData)
      ? txData.map(t => `${t.speaker||t.name||''}: ${t.text||t.content||''}`).join('\n')
      : (txData.transcript||txData.text||JSON.stringify(txData))
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type':'application/json', 'x-api-key':anthropicKey, 'anthropic-version':'2023-06-01', 'anthropic-dangerous-direct-browser-access':'true' },
      body: JSON.stringify({ model:'claude-sonnet-4-6', max_tokens:1024,
        system: 'You are a brutal, honest sales coach. Return ONLY valid JSON, no other text.',
        messages: [{ role:'user', content:`Analyze this sales call. Return ONLY this JSON:\n{"wrong":[{"issue":"","fix":""},{"issue":"","fix":""},{"issue":"","fix":""}],"right":{"what":"","why":""},"scores":{"rapport":0,"discovery":0,"tonality":0,"objection_handling":0,"frame_control":0},"drill_this_week":""}\n\nTRANSCRIPT:\n${transcript.slice(0,8000)}` }] })
    })
    if (!res.ok) { const e = await res.json().catch(()=>{}); throw new Error(`Claude: ${res.status} — ${e?.error?.message||res.statusText}`) }
    const { content } = await res.json()
    const match = (content?.[0]?.text||'').match(/\{[\s\S]*\}/)
    if (!match) throw new Error('No JSON in Claude response')
    const analysis = JSON.parse(match[0])
    saveAnalysis(call.id, analysis)
    return analysis
  }

  const filtered = calls.filter(c => filter==='ALL' ? true : detectType(c.title||c.meeting_title||'')=== filter)

  return (
    <div className="fade-in" style={{ display:'flex', flexDirection:'column', gap:'16px' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
        <div>
          <h1 style={H1}>INTEL FEED</h1>
          <p style={{ ...BODY, marginTop:'5px' }}>{calls.length} transmissions indexed</p>
        </div>
        <button onClick={fetchCalls} disabled={loading} style={{ ...BTN_GHOST, opacity: loading?0.5:1 }}>{loading?'SYNCING...':'REFRESH'}</button>
      </div>

      <div style={{ display:'flex', gap:'6px' }}>
        {['ALL','PROSPECT','COACHING'].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            fontFamily:'Orbitron, sans-serif', fontSize:'9px', fontWeight:700, letterSpacing:'0.15em',
            padding:'7px 16px', cursor:'pointer', transition:'all 0.15s',
            background: filter===f ? 'rgba(14,165,233,0.15)' : 'rgba(14,165,233,0.03)',
            border: `1px solid ${filter===f ? 'rgba(14,165,233,0.55)' : 'rgba(14,165,233,0.12)'}`,
            color: filter===f ? '#38bdf8' : 'rgba(14,165,233,0.3)',
            boxShadow: filter===f ? '0 0 14px rgba(14,165,233,0.2)' : 'none',
            textShadow: filter===f ? '0 0 10px rgba(14,165,233,0.5)' : 'none',
          }}>{f}</button>
        ))}
      </div>

      {error && <div style={{ padding:'14px', background:'rgba(249,115,22,0.08)', border:'1px solid rgba(249,115,22,0.25)', fontFamily:'Inter,sans-serif', fontSize:'13px', color:'#f97316' }}>{error}</div>}
      {loading && <div style={{ textAlign:'center', padding:'48px', fontFamily:'Orbitron, sans-serif', fontSize:'10px', letterSpacing:'0.2em', color:'rgba(14,165,233,0.3)' }}>RETRIEVING TRANSMISSIONS...</div>}
      {!loading && !error && filtered.length===0 && (
        <HudCard style={{ textAlign:'center', padding:'48px' }}>
          <div style={{ fontFamily:'Orbitron, sans-serif', fontSize:'10px', letterSpacing:'0.2em', color:'rgba(14,165,233,0.2)' }}>NO TRANSMISSIONS FOUND</div>
        </HudCard>
      )}
      <div style={{ display:'flex', flexDirection:'column', gap:'8px' }}>
        {filtered.map(call => <CallCard key={call.id} call={call} onAnalyze={handleAnalyze} />)}
      </div>
    </div>
  )
}
