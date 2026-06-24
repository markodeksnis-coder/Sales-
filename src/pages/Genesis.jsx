import { useState } from 'react'
import { getGenesisModules, saveGenesisModules, getGenesisWeek, saveGenesisWeek } from '../utils/storage'
import { LABEL, H1, BODY, BTN_PRIMARY, INPUT } from '../utils/theme'
import HudCard from '../components/HudCard'

const CAT_COLOR = {
  FOUNDATION: '#0ea5e9',
  DISCOVERY:  '#22d3ee',
  FRAME:      '#a78bfa',
  OBJECTIONS: '#f97316',
  CLOSING:    '#22c55e',
}

const ALL_SKILLS = ['Tonality','Discovery','Frame Control','Objection Handling','Closing','Pattern Interrupt','Future Pacing','Trial Closes','Pain Discovery','Trust Building','Urgency','Assumptive Language']

export default function Genesis() {
  const [modules, setModules] = useState(getGenesisModules)
  const [weekData, setWeekData] = useState(getGenesisWeek)
  const [expanded, setExpanded] = useState(null)
  const [weekSaved, setWeekSaved] = useState(false)

  const toggleModule = (id) => {
    const next = modules.map(m => m.id === id
      ? { ...m, completed: !m.completed, completedDate: !m.completed ? new Date().toISOString().slice(0,10) : null }
      : m
    )
    setModules(next); saveGenesisModules(next)
  }

  const updateNotes = (id, notes) => {
    const next = modules.map(m => m.id === id ? { ...m, notes } : m)
    setModules(next); saveGenesisModules(next)
  }

  const toggleSkill = (sk) => setWeekData(w => ({
    ...w, skills: w.skills.includes(sk) ? w.skills.filter(s => s !== sk) : [...w.skills, sk]
  }))

  const saveWeek = () => {
    saveGenesisWeek(weekData)
    setWeekSaved(true); setTimeout(() => setWeekSaved(false), 2000)
  }

  const categories = [...new Set(modules.map(m => m.category))]
  const completedCount = modules.filter(m => m.completed).length
  const total = modules.length
  const pct = Math.round((completedCount / total) * 100)

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h1 style={H1}>GENESIS</h1>
        <p style={{ ...BODY, marginTop: '4px' }}>Sales mastery curriculum. Complete each module. Build the stack.</p>
      </div>

      <HudCard style={{ padding: '18px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <div style={LABEL}>CURRICULUM PROGRESS</div>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '20px', fontWeight: 700, color: '#22c55e', textShadow: '0 0 14px rgba(34,197,94,0.5)' }}>{completedCount}/{total}</div>
        </div>
        <div style={{ height: '8px', backgroundColor: 'rgba(14,165,233,0.06)', borderRadius: '4px', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${pct}%`, background: 'linear-gradient(90deg, #0ea5e9, #22c55e)', boxShadow: '0 0 12px rgba(34,197,94,0.4)', transition: 'width 0.8s ease', borderRadius: '4px' }} />
        </div>
        <div style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '8px', color: 'rgba(14,165,233,0.3)', letterSpacing: '0.2em', marginTop: '8px', textAlign: 'right' }}>{pct}% COMPLETE</div>
      </HudCard>

      <HudCard style={{ padding: '18px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div style={LABEL}>WEEKLY SKILL ROTATION</div>
        <div>
          <div style={{ ...LABEL, fontSize: '8px', marginBottom: '8px' }}>FOCUS SKILLS THIS WEEK (pick up to 3)</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {ALL_SKILLS.map(sk => {
              const sel = weekData.skills.includes(sk)
              const disabled = !sel && weekData.skills.length >= 3
              return (
                <button key={sk} onClick={() => !disabled && toggleSkill(sk)} style={{
                  padding: '5px 12px', fontFamily: 'Inter, sans-serif', fontSize: '11px', cursor: disabled ? 'not-allowed' : 'pointer', transition: 'all 0.15s',
                  background: sel ? 'rgba(14,165,233,0.15)' : 'rgba(14,165,233,0.04)',
                  border: `1px solid ${sel ? 'rgba(14,165,233,0.55)' : 'rgba(14,165,233,0.12)'}`,
                  color: sel ? '#38bdf8' : disabled ? 'rgba(14,165,233,0.18)' : 'rgba(14,165,233,0.4)',
                  opacity: disabled ? 0.5 : 1,
                }}>{sk}</button>
              )
            })}
          </div>
        </div>
        <div>
          <div style={{ ...LABEL, fontSize: '8px', marginBottom: '6px' }}>WEEKLY GOAL</div>
          <input value={weekData.goal || ''} onChange={e => setWeekData(w => ({ ...w, goal: e.target.value }))}
            placeholder="What's your main objective this week?" style={{ ...INPUT }} />
        </div>
        <div>
          <div style={{ ...LABEL, fontSize: '8px', marginBottom: '6px' }}>WEEK NOTES</div>
          <textarea value={weekData.notes || ''} onChange={e => setWeekData(w => ({ ...w, notes: e.target.value }))}
            placeholder="Insights, observations, adjustments..." rows={2}
            style={{ width: '100%', backgroundColor: 'rgba(0,0,0,0.4)', border: '1px solid rgba(14,165,233,0.1)', color: '#bae6fd', fontFamily: 'Inter, sans-serif', fontSize: '12px', padding: '10px 14px', outline: 'none', boxSizing: 'border-box', resize: 'vertical', lineHeight: '1.6' }} />
        </div>
        <button onClick={saveWeek} style={{
          ...BTN_PRIMARY, padding: '10px 20px', fontSize: '9px', letterSpacing: '0.2em', alignSelf: 'flex-start',
          ...(weekSaved ? { background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.55)', color: '#22c55e' } : {}),
        }}>{weekSaved ? '✓ SAVED' : 'SAVE WEEK'}</button>
      </HudCard>

      {categories.map(cat => {
        const catModules = modules.filter(m => m.category === cat)
        const catDone = catModules.filter(m => m.completed).length
        const color = CAT_COLOR[cat] || '#0ea5e9'
        return (
          <div key={cat}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', paddingLeft: '4px' }}>
              <div style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '9px', fontWeight: 700, letterSpacing: '0.22em', color, textShadow: `0 0 8px ${color}80` }}>{cat}</div>
              <div style={{ flex: 1, height: '1px', backgroundColor: `${color}25` }} />
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: `${color}70` }}>{catDone}/{catModules.length}</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {catModules.map(m => (
                <HudCard key={m.id} green={m.completed} style={{ padding: '0' }}>
                  <div style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                      <button onClick={() => toggleModule(m.id)} style={{
                        width: '20px', height: '20px', flexShrink: 0, marginTop: '1px',
                        border: `1px solid ${m.completed ? 'rgba(34,197,94,0.6)' : `${color}50`}`,
                        background: m.completed ? 'rgba(34,197,94,0.15)' : 'transparent',
                        color: '#22c55e', fontSize: '12px', cursor: 'pointer', display: 'flex',
                        alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s',
                        boxShadow: m.completed ? '0 0 8px rgba(34,197,94,0.3)' : 'none',
                      }}>{m.completed ? '✓' : ''}</button>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '12px', fontWeight: 700, color: m.completed ? '#22c55e' : '#bae6fd', letterSpacing: '0.03em', textDecoration: m.completed ? 'line-through' : 'none', opacity: m.completed ? 0.7 : 1 }}>{m.title}</div>
                          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                            {m.completed && m.completedDate && <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', color: 'rgba(34,197,94,0.4)' }}>{m.completedDate}</span>}
                            <button onClick={() => setExpanded(expanded === m.id ? null : m.id)} style={{ background: 'none', border: 'none', color: 'rgba(14,165,233,0.3)', cursor: 'pointer', fontSize: '11px', fontFamily: 'Orbitron, sans-serif', letterSpacing: '0.1em', padding: '2px 6px' }}>{expanded === m.id ? '▲' : '▼'}</button>
                          </div>
                        </div>
                        <div style={{ ...BODY, marginTop: '3px' }}>{m.desc}</div>
                      </div>
                    </div>
                    {expanded === m.id && (
                      <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid rgba(14,165,233,0.08)' }}>
                        <div style={{ ...LABEL, fontSize: '8px', marginBottom: '6px' }}>MODULE NOTES</div>
                        <textarea value={m.notes || ''} onChange={e => updateNotes(m.id, e.target.value)}
                          placeholder="Personal notes, practice drills, key insights..." rows={3}
                          style={{ width: '100%', backgroundColor: 'rgba(0,0,0,0.4)', border: '1px solid rgba(14,165,233,0.1)', color: '#bae6fd', fontFamily: 'Inter, sans-serif', fontSize: '12px', padding: '10px 14px', outline: 'none', boxSizing: 'border-box', resize: 'vertical', lineHeight: '1.6' }} />
                      </div>
                    )}
                  </div>
                </HudCard>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
