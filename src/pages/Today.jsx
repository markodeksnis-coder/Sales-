import { useState } from 'react'
import { getSettings, getStreak, saveStreak, getWeek, saveWeek, getDaily, saveDaily, getWeekKey, getTodayKey, storage } from '../utils/storage'
import { CARD, CARD_RED, CARD_ACTIVE, CARD_GREEN, LABEL, H1, H2, BODY, BTN_PRIMARY, BTN_GHOST, TEXTAREA, TAG } from '../utils/theme'

const DAYS = ['mon','tue','wed','thu','fri']
const DAY_LABELS = ['MON','TUE','WED','THU','FRI']
const DRILL_BY_DAY = {
  1: { name: 'TONALITY',         desc: 'Record your opener in 5 emotional states: confident, curious, warm, urgent, detached.' },
  2: { name: 'PSYCHOLOGY',       desc: 'Read one chapter from your reading stack. Take notes on one technique to steal.' },
  3: { name: 'LIVE REPS',        desc: 'Real cold calls only. No fake practice. Log how many you made.' },
  4: { name: 'BREAKDOWN',        desc: 'Pick one elite closer on YouTube. Dissect their structure sentence by sentence.' },
  5: { name: 'WEAK LINK ATTACK', desc: "Find your worst conversion point from this week. Drill it for the full hour." },
}

export default function Today({ setPage }) {
  const today     = new Date()
  const dow       = today.getDay()
  const weekKey   = getWeekKey()
  const dateKey   = getTodayKey()
  const settings  = getSettings()

  const [streak,       setStreak]       = useState(getStreak)
  const [week,         setWeek]         = useState(() => getWeek(weekKey))
  const [hours,        setHours]        = useState(() => getDaily(dateKey)?.hours || Array(4).fill(null).map(() => ({ done: false, notes: '' })))
  const [dailyLog,     setDailyLog]     = useState(() => getDaily(dateKey)?.log || '')
  const [tonality,     setTonality]     = useState(() => getDaily(dateKey)?.score || 0)
  const [saved,        setSaved]        = useState(false)

  const toggleDay = (day) => { const u = { ...week, [day]: !week[day] }; setWeek(u); saveWeek(weekKey, u) }
  const updHour   = (i, f, v) => setHours(h => h.map((x, idx) => idx === i ? { ...x, [f]: v } : x))

  const handleSave = () => {
    saveDaily(dateKey, { hours, log: dailyLog, score: tonality })
    const dk = { 1:'mon',2:'tue',3:'wed',4:'thu',5:'fri' }[dow]
    if (dk) { const u = { ...week, [dk]: true }; setWeek(u); saveWeek(weekKey, u) }
    const last = storage.get('sgs_last_trained', null)
    const yest = (() => { const d = new Date(today); d.setDate(d.getDate()-1); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}` })()
    if (last !== dateKey) {
      const ns = last === yest ? streak + 1 : 1
      saveStreak(ns); setStreak(ns); storage.set('sgs_last_trained', dateKey)
    }
    window.dispatchEvent(new Event('sgs-streak-updated'))
    setSaved(true); setTimeout(() => setSaved(false), 2500)
  }

  const drill = DRILL_BY_DAY[dow]
  const isActive = (i) => Math.abs(today.getHours() - (9 + i)) <= 1

  const hourConfigs = [
    { label: 'HOUR 01', title: 'COACHING CALL',        desc: 'Live coaching or roleplay session', action: null },
    { label: 'HOUR 02', title: 'CALL REVIEW',          desc: 'Pull a call from your library and break it down', action: { label: 'OPEN LIBRARY', page: 'calls' } },
    { label: 'HOUR 03', title: 'SALES GENESIS MODULE', desc: `SKILL OF THE WEEK: ${(settings.skillOfWeek||'Tonality').toUpperCase()}`, action: null },
    { label: 'HOUR 04', title: drill?.name || 'REST DAY', desc: drill?.desc || 'No drill today. Rest and recover.', action: null },
  ]

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
        <div>
          <h1 style={H1}>TODAY'S TRAINING</h1>
          <p style={{ ...BODY, marginTop: '5px' }}>{today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
        </div>
        <div style={{ ...CARD, padding: '12px 20px', textAlign: 'center', minWidth: '90px' }}>
          <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '36px', fontWeight: 800, lineHeight: 1, background: 'linear-gradient(135deg, #ef4444, #f97316)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{streak}</div>
          <div style={{ ...LABEL, marginTop: '4px' }}>DAY STREAK</div>
        </div>
      </div>

      {/* Weekly Tracker */}
      <div style={CARD}>
        <div style={{ ...LABEL, marginBottom: '14px' }}>THIS WEEK</div>
        <div style={{ display: 'flex', gap: '6px' }}>
          {DAYS.map((day, i) => (
            <button key={day} onClick={() => toggleDay(day)} style={{
              flex: 1, padding: '9px 0',
              fontFamily: 'Space Grotesk, sans-serif', fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em',
              border: 'none', cursor: 'pointer', transition: 'all 0.15s',
              background: week[day] ? 'linear-gradient(135deg, #ef4444, #dc2626)' : 'rgba(255,255,255,0.04)',
              color: week[day] ? '#fff' : 'rgba(255,255,255,0.3)',
              boxShadow: week[day] ? '0 0 16px rgba(239,68,68,0.35)' : 'none',
            }}>{DAY_LABELS[i]}</button>
          ))}
          {['SAT','SUN'].map(d => (
            <button key={d} style={{ flex: 1, padding: '9px 0', fontFamily: 'Space Grotesk, sans-serif', fontSize: '10px', background: 'rgba(255,255,255,0.01)', border: 'none', color: 'rgba(255,255,255,0.1)', cursor: 'default' }}>{d}</button>
          ))}
        </div>
      </div>

      {/* Hour Blocks */}
      {hourConfigs.map((cfg, i) => {
        const active = isActive(i) && !hours[i].done
        const cardStyle = hours[i].done ? CARD_GREEN : active ? CARD_ACTIVE : CARD
        return (
          <div key={i} style={{ ...cardStyle, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <span style={LABEL}>{cfg.label}</span>
                  {active && <span style={{ ...TAG('#ef4444'), animation: 'pulse-glow 2s infinite' }}>ACTIVE</span>}
                  {hours[i].done && <span style={TAG('#22c55e', 'rgba(34,197,94,0.08)')}>DONE</span>}
                </div>
                <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '15px', fontWeight: 700, color: '#f1f5f9', letterSpacing: '-0.01em' }}>{cfg.title}</div>
                <div style={{ ...BODY, marginTop: '3px' }}>{cfg.desc}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginLeft: '16px', flexShrink: 0 }}>
                {cfg.action && (
                  <button onClick={() => setPage?.(cfg.action.page)} style={{ ...BTN_GHOST, fontSize: '10px', letterSpacing: '0.12em', padding: '7px 12px', whiteSpace: 'nowrap' }}>
                    {cfg.action.label}
                  </button>
                )}
                <button onClick={() => updHour(i, 'done', !hours[i].done)} style={{
                  width: '32px', height: '32px', border: `1px solid ${hours[i].done ? '#22c55e' : 'rgba(255,255,255,0.12)'}`,
                  background: hours[i].done ? 'rgba(34,197,94,0.15)' : 'rgba(255,255,255,0.03)',
                  color: '#22c55e', fontSize: '14px', cursor: 'pointer', display: 'flex',
                  alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.15s',
                  boxShadow: hours[i].done ? '0 0 12px rgba(34,197,94,0.25)' : 'none',
                }}>{hours[i].done ? '✓' : ''}</button>
              </div>
            </div>
            <textarea value={hours[i].notes} onChange={e => updHour(i,'notes',e.target.value)} placeholder="Notes..." rows={2}
              style={{ ...TEXTAREA, backgroundColor: 'rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.06)' }} />
          </div>
        )
      })}

      {/* Daily Log */}
      <div style={{ ...CARD, display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={LABEL}>DAILY LOG</div>
        <textarea value={dailyLog} onChange={e => setDailyLog(e.target.value)}
          placeholder="One thing I'll do differently tomorrow..."
          rows={3} style={{ ...TEXTAREA, backgroundColor: 'rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.06)' }} />
      </div>

      {/* Tonality Score */}
      <div style={CARD}>
        <div style={{ ...LABEL, marginBottom: '14px' }}>TONALITY SELF-SCORE</div>
        <div style={{ display: 'flex', gap: '4px' }}>
          {Array.from({ length: 10 }, (_, i) => i + 1).map(s => (
            <button key={s} onClick={() => setTonality(s)} style={{
              flex: 1, padding: '9px 0', fontFamily: 'Space Grotesk, sans-serif', fontSize: '12px', fontWeight: 700,
              border: 'none', cursor: 'pointer', transition: 'all 0.15s',
              background: tonality === s
                ? 'linear-gradient(135deg,#ef4444,#f97316)'
                : tonality > s
                  ? 'rgba(239,68,68,0.15)'
                  : 'rgba(255,255,255,0.04)',
              color: tonality >= s ? (tonality === s ? '#fff' : '#ef4444') : 'rgba(255,255,255,0.25)',
              boxShadow: tonality === s ? '0 0 14px rgba(239,68,68,0.4)' : 'none',
            }}>{s}</button>
          ))}
        </div>
      </div>

      {/* Save */}
      <button onClick={handleSave} style={{
        ...BTN_PRIMARY,
        width: '100%', padding: '16px',
        fontSize: '12px', letterSpacing: '0.22em',
        background: saved
          ? 'linear-gradient(135deg,#22c55e,#16a34a)'
          : 'linear-gradient(135deg,#ef4444,#dc2626)',
        boxShadow: saved
          ? '0 0 30px rgba(34,197,94,0.35)'
          : '0 0 30px rgba(239,68,68,0.35)',
      }}>{saved ? '✓ DAY SAVED' : 'SAVE DAY'}</button>
    </div>
  )
}
