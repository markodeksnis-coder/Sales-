import { useState, useMemo } from 'react'
import { getKnowledge, saveKnowledge, getAllAnalyses } from '../utils/storage'
import { LABEL, H1, BODY, BTN_PRIMARY, INPUT } from '../utils/theme'
import HudCard from '../components/HudCard'

const CATS = ['TECHNIQUE', 'COACHING NOTE', 'BOOK NOTE']
const CAT_COLOR = {
  'TECHNIQUE':     '#0ea5e9',
  'COACHING NOTE': '#a78bfa',
  'BOOK NOTE':     '#22d3ee',
  'AI INSIGHT':    '#22c55e',
}
const TABS = [...CATS, 'AI INSIGHT']

const EMPTY_FORM = { category: 'TECHNIQUE', title: '', content: '', tags: '' }

export default function Knowledge() {
  const [entries, setEntries] = useState(getKnowledge)
  const [form, setForm] = useState({ ...EMPTY_FORM })
  const [tab, setTab] = useState('ALL')
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)

  const aiInsights = useMemo(() => {
    const analyses = getAllAnalyses()
    const insights = []
    analyses.forEach(a => {
      if (a.drill_this_week) insights.push({ id:`ai_${a.id}_drill`, category:'AI INSIGHT', title:'Drill This Week', content: a.drill_this_week, tags:['AI','drill'], isAuto:true, createdAt: a.createdAt || a.date || new Date().toISOString() })
      if (a.wrong && Array.isArray(a.wrong)) a.wrong.forEach((w, i) => {
        insights.push({ id:`ai_${a.id}_wrong_${i}`, category:'AI INSIGHT', title:'Area to Improve', content: w, tags:['AI','improvement'], isAuto:true, createdAt: a.createdAt || a.date || new Date().toISOString() })
      })
      if (a.right && Array.isArray(a.right)) a.right.forEach((r, i) => {
        insights.push({ id:`ai_${a.id}_right_${i}`, category:'AI INSIGHT', title:'What Worked', content: r, tags:['AI','strength'], isAuto:true, createdAt: a.createdAt || a.date || new Date().toISOString() })
      })
    })
    return insights
  }, [])

  const persist = (next) => { setEntries(next); saveKnowledge(next) }

  const addEntry = () => {
    if (!form.title.trim() || !form.content.trim()) return
    const entry = {
      ...form,
      id: Date.now().toString(),
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
      createdAt: new Date().toISOString(),
      isAuto: false,
    }
    persist([entry, ...entries])
    setForm({ ...EMPTY_FORM })
    setShowForm(false)
  }

  const deleteEntry = (id) => persist(entries.filter(e => e.id !== id))

  const allEntries = tab === 'AI INSIGHT'
    ? aiInsights
    : tab === 'ALL'
      ? [...entries, ...aiInsights]
      : entries.filter(e => e.category === tab)

  const filtered = search.trim()
    ? allEntries.filter(e => (e.title + ' ' + e.content + ' ' + (e.tags||[]).join(' ')).toLowerCase().includes(search.toLowerCase()))
    : allEntries

  const tabCounts = {
    ALL: entries.length + aiInsights.length,
    ...Object.fromEntries(CATS.map(c => [c, entries.filter(e => e.category === c).length])),
    'AI INSIGHT': aiInsights.length,
  }

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={H1}>KNOWLEDGE</h1>
          <p style={{ ...BODY, marginTop: '4px' }}>Techniques. Coaching notes. Book insights. AI-generated intel.</p>
        </div>
        <button onClick={() => setShowForm(f => !f)} style={{ ...BTN_PRIMARY, padding: '10px 18px', fontSize: '9px', letterSpacing: '0.18em' }}>
          {showForm ? '— CANCEL' : '+ ADD ENTRY'}
        </button>
      </div>

      <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search knowledge base..." style={{ ...INPUT }} />

      <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
        {['ALL', ...TABS].map(t => {
          const color = CAT_COLOR[t]
          const active = tab === t
          return (
            <button key={t} onClick={() => setTab(t)} style={{
              padding: '7px 14px', fontFamily: 'Orbitron, sans-serif', fontSize: '7.5px', fontWeight: 700, letterSpacing: '0.14em', cursor: 'pointer', transition: 'all 0.15s',
              background: active ? `${color || 'rgba(14,165,233,1)'}18` : 'transparent',
              border: `1px solid ${active ? (color || 'rgba(14,165,233,0.6)') : 'rgba(14,165,233,0.1)'}`,
              color: active ? (color || '#38bdf8') : 'rgba(14,165,233,0.3)',
            }}>{t} ({tabCounts[t] ?? 0})</button>
          )
        })}
      </div>

      {showForm && (
        <HudCard active style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={LABEL}>NEW ENTRY</div>
          <div>
            <div style={{ ...LABEL, fontSize: '8px', marginBottom: '8px' }}>CATEGORY</div>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {CATS.map(c => {
                const sel = form.category === c
                const color = CAT_COLOR[c]
                return (
                  <button key={c} onClick={() => setForm(f => ({ ...f, category: c }))} style={{
                    padding: '7px 14px', fontFamily: 'Orbitron, sans-serif', fontSize: '8px', fontWeight: 700, letterSpacing: '0.12em', cursor: 'pointer', transition: 'all 0.15s',
                    background: sel ? `${color}18` : 'rgba(14,165,233,0.04)',
                    border: `1px solid ${sel ? color : 'rgba(14,165,233,0.12)'}`,
                    color: sel ? color : 'rgba(14,165,233,0.35)',
                  }}>{c}</button>
                )
              })}
            </div>
          </div>
          <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Title..." style={{ ...INPUT }} />
          <textarea value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} placeholder="Content, details, notes..." rows={4}
            style={{ width: '100%', backgroundColor: 'rgba(0,0,0,0.4)', border: '1px solid rgba(14,165,233,0.1)', color: '#bae6fd', fontFamily: 'Inter, sans-serif', fontSize: '12px', padding: '10px 14px', outline: 'none', boxSizing: 'border-box', resize: 'vertical', lineHeight: '1.6' }} />
          <input value={form.tags} onChange={e => setForm(f => ({ ...f, tags: e.target.value }))} placeholder="Tags (comma-separated): tonality, closing, frame..." style={{ ...INPUT }} />
          <button onClick={addEntry} style={{ ...BTN_PRIMARY, padding: '10px', fontSize: '10px', letterSpacing: '0.2em' }}>ADD TO BASE</button>
        </HudCard>
      )}

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px', color: 'rgba(14,165,233,0.2)', fontFamily: 'Orbitron, sans-serif', fontSize: '10px', letterSpacing: '0.2em' }}>NO ENTRIES FOUND</div>
      )}
      {filtered.map(entry => {
        const color = CAT_COLOR[entry.category] || '#0ea5e9'
        return (
          <HudCard key={entry.id} style={{ padding: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '6px' }}>
                  <span style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '7.5px', fontWeight: 700, letterSpacing: '0.14em', padding: '2px 8px', border: `1px solid ${color}`, color, backgroundColor: `${color}15` }}>{entry.category}</span>
                  {entry.isAuto && <span style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '7px', letterSpacing: '0.12em', color: 'rgba(34,197,94,0.5)', border: '1px solid rgba(34,197,94,0.2)', padding: '1px 6px' }}>AUTO</span>}
                  <span style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '12px', fontWeight: 700, color: '#bae6fd' }}>{entry.title}</span>
                </div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: 'rgba(186,230,253,0.65)', lineHeight: '1.6', whiteSpace: 'pre-line', marginBottom: '8px' }}>{entry.content}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', color: 'rgba(14,165,233,0.25)' }}>{entry.createdAt?.slice(0,10)}</span>
                  {(entry.tags||[]).map(t => <span key={t} style={{ fontFamily: 'Inter, sans-serif', fontSize: '9px', padding: '1px 6px', background: 'rgba(14,165,233,0.06)', border: '1px solid rgba(14,165,233,0.15)', color: 'rgba(14,165,233,0.4)' }}>{t}</span>)}
                </div>
              </div>
              {!entry.isAuto && (
                <button onClick={() => deleteEntry(entry.id)} style={{ background: 'none', border: 'none', color: 'rgba(14,165,233,0.15)', cursor: 'pointer', fontSize: '18px', padding: '0 0 0 12px', lineHeight: 1, flexShrink: 0 }}>×</button>
              )}
            </div>
          </HudCard>
        )
      })}
    </div>
  )
}
