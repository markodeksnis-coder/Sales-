import { useState } from 'react'
import { getCallLog, saveCallLog } from '../utils/storage'
import { LABEL, H1, BODY, BTN_PRIMARY, BTN_GHOST, INPUT } from '../utils/theme'
import HudCard from '../components/HudCard'

const EMOTIONS = ['Confident','Nervous','Relaxed','Frustrated','Excited','Uncertain','Calm','Pressured']
const CONCLUSIONS = [
  { id:'CLOSED',           color:'#22c55e' },
  { id:'FOLLOW-UP',        color:'#0ea5e9' },
  { id:'LOST',             color:'#ef4444' },
  { id:'NO SHOW',          color:'#6b7280' },
  { id:'REFERRAL',         color:'#a78bfa' },
  { id:'COACHING INSIGHT', color:'#f59e0b' },
]
const TYPES = ['PROSPECT','COACHING','LIVE REPS']
const FILTERS = ['ALL', ...TYPES]

const EMPTY_FORM = { title:'', type:'PROSPECT', date:'', emotions:[], conclusion:'', objections:'', notes:'' }

export default function CallLog() {
  const [log, setLog] = useState(getCallLog)
  const [form, setForm] = useState({ ...EMPTY_FORM, date: new Date().toISOString().slice(0,10) })
  const [filter, setFilter] = useState('ALL')
  const [showForm, setShowForm] = useState(false)

  const persist = (next) => { setLog(next); saveCallLog(next) }

  const addEntry = () => {
    if (!form.title.trim() || !form.conclusion) return
    const entry = { ...form, id: Date.now().toString(), createdAt: new Date().toISOString() }
    persist([entry, ...log])
    setForm({ ...EMPTY_FORM, date: new Date().toISOString().slice(0,10) })
    setShowForm(false)
  }

  const deleteEntry = (id) => persist(log.filter(e => e.id !== id))

  const toggleEmotion = (e) => setForm(f => ({
    ...f, emotions: f.emotions.includes(e) ? f.emotions.filter(x => x !== e) : [...f.emotions, e]
  }))

  const filtered = filter === 'ALL' ? log : log.filter(e => e.type === filter)

  const total = log.length
  const closed = log.filter(e => e.conclusion === 'CLOSED').length
  const lost   = log.filter(e => e.conclusion === 'LOST').length
  const winRate = total > 0 ? Math.round((closed / total) * 100) : 0

  const conclusionCounts = CONCLUSIONS.map(c => ({ ...c, count: log.filter(e => e.conclusion === c.id).length }))
  const maxCount = Math.max(...conclusionCounts.map(c => c.count), 1)

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={H1}>CALL LOG</h1>
          <p style={{ ...BODY, marginTop: '4px' }}>Track every call. Emotions. Conclusions. Objections.</p>
        </div>
        <button onClick={() => setShowForm(f => !f)} style={{ ...BTN_PRIMARY, padding: '10px 18px', fontSize: '9px', letterSpacing: '0.18em' }}>
          {showForm ? '— CANCEL' : '+ LOG CALL'}
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
        {[
          { label: 'TOTAL LOGGED', value: total,         color: '#0ea5e9' },
          { label: 'CLOSED',       value: closed,        color: '#22c55e' },
          { label: 'WIN RATE',     value: `${winRate}%`, color: '#a78bfa' },
          { label: 'LOST',         value: lost,          color: '#ef4444' },
        ].map(s => (
          <HudCard key={s.label} style={{ padding: '14px', textAlign: 'center' }}>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '24px', fontWeight: 700, color: s.color, textShadow: `0 0 16px ${s.color}70` }}>{s.value}</div>
            <div style={{ ...LABEL, marginTop: '4px', fontSize: '7px' }}>{s.label}</div>
          </HudCard>
        ))}
      </div>

      {total > 0 && (
        <HudCard style={{ padding: '16px' }}>
          <div style={{ ...LABEL, marginBottom: '12px' }}>OUTCOME BREAKDOWN</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
            {conclusionCounts.filter(c => c.count > 0).map(c => (
              <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '7px', fontWeight: 700, letterSpacing: '0.14em', color: c.color, width: '110px', flexShrink: 0 }}>{c.id}</div>
                <div style={{ flex: 1, height: '6px', backgroundColor: 'rgba(14,165,233,0.06)', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${(c.count / maxCount) * 100}%`, backgroundColor: c.color, boxShadow: `0 0 8px ${c.color}80`, transition: 'width 0.6s ease', borderRadius: '2px' }} />
                </div>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', color: c.color, width: '20px', textAlign: 'right', flexShrink: 0 }}>{c.count}</div>
              </div>
            ))}
          </div>
        </HudCard>
      )}

      {showForm && (
        <HudCard active style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={LABEL}>NEW ENTRY</div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Call title or prospect name..." style={{ ...INPUT, flex: 1 }} />
            <input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} style={{ ...INPUT, width: '140px', colorScheme: 'dark' }} />
          </div>
          <div>
            <div style={{ ...LABEL, marginBottom: '8px', fontSize: '8px' }}>TYPE</div>
            <div style={{ display: 'flex', gap: '6px' }}>
              {TYPES.map(t => (
                <button key={t} onClick={() => setForm(f => ({ ...f, type: t }))} style={{
                  padding: '7px 14px', fontFamily: 'Orbitron, sans-serif', fontSize: '8px', fontWeight: 700, letterSpacing: '0.14em', cursor: 'pointer', transition: 'all 0.15s',
                  background: form.type === t ? 'rgba(14,165,233,0.15)' : 'rgba(14,165,233,0.04)',
                  border: `1px solid ${form.type === t ? 'rgba(14,165,233,0.55)' : 'rgba(14,165,233,0.12)'}`,
                  color: form.type === t ? '#38bdf8' : 'rgba(14,165,233,0.35)',
                }}>{t}</button>
              ))}
            </div>
          </div>
          <div>
            <div style={{ ...LABEL, marginBottom: '8px', fontSize: '8px' }}>EMOTIONS (multi-select)</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {EMOTIONS.map(e => {
                const sel = form.emotions.includes(e)
                return (
                  <button key={e} onClick={() => toggleEmotion(e)} style={{
                    padding: '5px 12px', fontFamily: 'Inter, sans-serif', fontSize: '11px', cursor: 'pointer', transition: 'all 0.15s',
                    background: sel ? 'rgba(167,139,250,0.15)' : 'rgba(14,165,233,0.04)',
                    border: `1px solid ${sel ? 'rgba(167,139,250,0.55)' : 'rgba(14,165,233,0.12)'}`,
                    color: sel ? '#a78bfa' : 'rgba(14,165,233,0.35)',
                  }}>{e}</button>
                )
              })}
            </div>
          </div>
          <div>
            <div style={{ ...LABEL, marginBottom: '8px', fontSize: '8px' }}>CONCLUSION</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {CONCLUSIONS.map(c => {
                const sel = form.conclusion === c.id
                return (
                  <button key={c.id} onClick={() => setForm(f => ({ ...f, conclusion: c.id }))} style={{
                    padding: '5px 12px', fontFamily: 'Orbitron, sans-serif', fontSize: '8px', fontWeight: 700, letterSpacing: '0.12em', cursor: 'pointer', transition: 'all 0.15s',
                    background: sel ? `${c.color}22` : 'rgba(14,165,233,0.04)',
                    border: `1px solid ${sel ? c.color : 'rgba(14,165,233,0.12)'}`,
                    color: sel ? c.color : 'rgba(14,165,233,0.35)',
                    boxShadow: sel ? `0 0 10px ${c.color}40` : 'none',
                  }}>{c.id}</button>
                )
              })}
            </div>
          </div>
          <div>
            <div style={{ ...LABEL, marginBottom: '6px', fontSize: '8px' }}>OBJECTIONS ENCOUNTERED</div>
            <textarea value={form.objections} onChange={e => setForm(f => ({ ...f, objections: e.target.value }))} placeholder="What objections came up? How did you handle them?" rows={2}
              style={{ width: '100%', backgroundColor: 'rgba(0,0,0,0.4)', border: '1px solid rgba(14,165,233,0.1)', color: '#bae6fd', fontFamily: 'Inter, sans-serif', fontSize: '12px', padding: '10px 14px', outline: 'none', boxSizing: 'border-box', resize: 'vertical', lineHeight: '1.6' }} />
          </div>
          <div>
            <div style={{ ...LABEL, marginBottom: '6px', fontSize: '8px' }}>NOTES</div>
            <textarea value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} placeholder="Key insights, what to improve, what worked..." rows={3}
              style={{ width: '100%', backgroundColor: 'rgba(0,0,0,0.4)', border: '1px solid rgba(14,165,233,0.1)', color: '#bae6fd', fontFamily: 'Inter, sans-serif', fontSize: '12px', padding: '10px 14px', outline: 'none', boxSizing: 'border-box', resize: 'vertical', lineHeight: '1.6' }} />
          </div>
          <button onClick={addEntry} style={{ ...BTN_PRIMARY, padding: '12px', fontSize: '10px', letterSpacing: '0.2em' }}>LOG ENTRY</button>
        </HudCard>
      )}

      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
        {FILTERS.map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            padding: '7px 14px', fontFamily: 'Orbitron, sans-serif', fontSize: '8px', fontWeight: 700, letterSpacing: '0.14em', cursor: 'pointer', transition: 'all 0.15s',
            background: filter === f ? 'rgba(14,165,233,0.12)' : 'transparent',
            border: `1px solid ${filter === f ? 'rgba(14,165,233,0.4)' : 'rgba(14,165,233,0.1)'}`,
            color: filter === f ? '#38bdf8' : 'rgba(14,165,233,0.3)',
          }}>{f} ({f === 'ALL' ? total : log.filter(e => e.type === f).length})</button>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px', color: 'rgba(14,165,233,0.2)', fontFamily: 'Orbitron, sans-serif', fontSize: '10px', letterSpacing: '0.2em' }}>NO ENTRIES YET</div>
      )}
      {filtered.map(entry => {
        const conc = CONCLUSIONS.find(c => c.id === entry.conclusion)
        return (
          <HudCard key={entry.id} style={{ padding: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '6px' }}>
                  <span style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '12px', fontWeight: 700, color: '#bae6fd' }}>{entry.title}</span>
                  <span style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '7px', fontWeight: 700, letterSpacing: '0.14em', padding: '2px 8px', border: '1px solid rgba(14,165,233,0.25)', color: 'rgba(14,165,233,0.5)' }}>{entry.type}</span>
                  {conc && <span style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '7px', fontWeight: 700, letterSpacing: '0.12em', padding: '2px 8px', border: `1px solid ${conc.color}`, color: conc.color, backgroundColor: `${conc.color}18`, boxShadow: `0 0 8px ${conc.color}30` }}>{entry.conclusion}</span>}
                </div>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: 'rgba(14,165,233,0.3)', marginBottom: '8px' }}>{entry.date}</div>
                {entry.emotions?.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '8px' }}>
                    {entry.emotions.map(e => <span key={e} style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', padding: '2px 8px', background: 'rgba(167,139,250,0.1)', border: '1px solid rgba(167,139,250,0.25)', color: 'rgba(167,139,250,0.7)' }}>{e}</span>)}
                  </div>
                )}
                {entry.objections && <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: 'rgba(249,115,22,0.7)', marginBottom: '4px', lineHeight: '1.5' }}><span style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '8px', color: 'rgba(249,115,22,0.4)', marginRight: '6px' }}>OBJECTIONS:</span>{entry.objections}</div>}
                {entry.notes && <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: 'rgba(186,230,253,0.6)', lineHeight: '1.5', whiteSpace: 'pre-line' }}>{entry.notes}</div>}
              </div>
              <button onClick={() => deleteEntry(entry.id)} style={{ background: 'none', border: 'none', color: 'rgba(14,165,233,0.15)', cursor: 'pointer', fontSize: '18px', padding: '0 0 0 12px', lineHeight: 1, flexShrink: 0 }}>×</button>
            </div>
          </HudCard>
        )
      })}
    </div>
  )
}
