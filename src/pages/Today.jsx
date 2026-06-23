import { useState, useEffect } from 'react'
import {
  getSettings, getStreak, saveStreak,
  getWeek, saveWeek, getDaily, saveDaily,
  getWeekKey, getTodayKey, storage,
} from '../utils/storage'

const DAYS = ['mon','tue','wed','thu','fri']
const DAY_LABELS = ['MON','TUE','WED','THU','FRI']

const DRILL_BY_DAY = {
  1: { name: 'TONALITY',        desc: 'Record your opener in 5 emotional states: confident, curious, warm, urgent, detached. Play back and compare.' },
  2: { name: 'PSYCHOLOGY',      desc: 'Read one chapter from your reading stack. Take notes on one technique to steal.' },
  3: { name: 'LIVE REPS',       desc: 'Real cold calls only. No fake practice. Log how many you made.' },
  4: { name: 'BREAKDOWN',       desc: 'Pick one elite closer on YouTube. Dissect their structure sentence by sentence.' },
  5: { name: 'WEAK LINK ATTACK',desc: "Look at your week's data. Find your worst conversion point. Drill it for the full hour." },
}

const S = (obj) => ({
  ...{
    fontFamily: 'Space Grotesk, sans-serif',
    letterSpacing: '0.14em',
    fontSize: '11px',
    fontWeight: 700,
    textTransform: 'uppercase',
    color: '#737373',
  },
  ...obj
})

export default function Today({ setPage }) {
  const today      = new Date()
  const dayOfWeek  = today.getDay()
  const weekKey    = getWeekKey()
  const dateKey    = getTodayKey()
  const settings   = getSettings()

  const [streak, setStreak]           = useState(getStreak)
  const [week,   setWeek]             = useState(() => getWeek(weekKey))
  const [hours,  setHours]            = useState(() => {
    const saved = getDaily(dateKey)
    return saved?.hours || Array(4).fill(null).map(() => ({ done: false, notes: '' }))
  })
  const [dailyLog,      setDailyLog]      = useState(() => getDaily(dateKey)?.log || '')
  const [tonalityScore, setTonalityScore] = useState(() => getDaily(dateKey)?.score || 0)
  const [saved,         setSaved]         = useState(false)

  const toggleDay = (day) => {
    const updated = { ...week, [day]: !week[day] }
    setWeek(updated)
    saveWeek(weekKey, updated)
  }

  const updateHour = (i, field, val) => {
    const updated = hours.map((h, idx) => idx === i ? { ...h, [field]: val } : h)
    setHours(updated)
  }

  const handleSave = () => {
    saveDaily(dateKey, { hours, log: dailyLog, score: tonalityScore })

    const DAY_TO_KEY = { 1:'mon', 2:'tue', 3:'wed', 4:'thu', 5:'fri' }
    const dk = DAY_TO_KEY[dayOfWeek]
    if (dk) {
      const updatedWeek = { ...week, [dk]: true }
      setWeek(updatedWeek)
      saveWeek(weekKey, updatedWeek)
    }

    const lastTrained = storage.get('sgs_last_trained', null)
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)
    const yKey = `${yesterday.getFullYear()}-${String(yesterday.getMonth()+1).padStart(2,'0')}-${String(yesterday.getDate()).padStart(2,'0')}`
    let newStreak = streak
    if (lastTrained !== dateKey) {
      newStreak = lastTrained === yKey ? streak + 1 : 1
      saveStreak(newStreak)
      setStreak(newStreak)
      storage.set('sgs_last_trained', dateKey)
    }
    window.dispatchEvent(new Event('sgs-streak-updated'))
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const drill = DRILL_BY_DAY[dayOfWeek]

  const hourConfigs = [
    { label: 'HOUR 1', title: 'COACHING CALL',         desc: 'Live coaching or roleplay session', action: null },
    { label: 'HOUR 2', title: 'CALL REVIEW',           desc: 'Analyze a call from your library',  action: { label: 'GO TO CALLS', page: 'calls' } },
    { label: 'HOUR 3', title: 'SALES GENESIS MODULE',  desc: `SKILL OF THE WEEK: ${(settings.skillOfWeek || 'Tonality').toUpperCase()}`, action: null },
    { label: 'HOUR 4', title: drill?.name || 'REST DAY', desc: drill?.desc || 'Rest and recover. No drill today.', action: null },
  ]

  const isActiveHour = (i) => {
    const h = today.getHours()
    return Math.abs(h - (9 + i)) <= 1
  }

  const card = (extra = {}) => ({
    backgroundColor: '#111111',
    border: '1px solid #1a1a1a',
    padding: '16px',
    ...extra,
  })

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '22px', fontWeight: 800, color: '#f5f5f5', letterSpacing: '-0.02em', margin: 0 }}>
            TODAY'S TRAINING
          </h1>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#737373', marginTop: '4px' }}>
            {today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '32px', fontWeight: 800, color: '#ef4444', lineHeight: 1 }}>{streak}</div>
          <div style={S({ marginTop: '2px' })}>DAY STREAK</div>
        </div>
      </div>

      {/* Weekly Tracker */}
      <div style={card()}>
        <div style={S({ marginBottom: '10px' })}>THIS WEEK</div>
        <div style={{ display: 'flex', gap: '6px' }}>
          {DAYS.map((day, i) => (
            <button key={day} onClick={() => toggleDay(day)} style={{
              flex: 1, padding: '8px 0', fontSize: '11px', fontWeight: 700,
              fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '0.1em',
              border: `1px solid ${week[day] ? '#ef4444' : '#1a1a1a'}`,
              backgroundColor: week[day] ? '#ef4444' : 'transparent',
              color: week[day] ? '#fff' : '#737373', cursor: 'pointer', transition: 'all 0.15s',
            }}>{DAY_LABELS[i]}</button>
          ))}
          {['SAT','SUN'].map(d => (
            <button key={d} style={{
              flex: 1, padding: '8px 0', fontSize: '11px', fontFamily: 'Space Grotesk, sans-serif',
              border: '1px solid #111', backgroundColor: 'transparent', color: '#333', cursor: 'not-allowed',
            }}>{d}</button>
          ))}
        </div>
      </div>

      {/* Hour Blocks */}
      {hourConfigs.map((cfg, i) => {
        const active = isActiveHour(i) && !hours[i].done
        const borderColor = hours[i].done ? '#22c55e' : active ? '#ef4444' : '#1a1a1a'
        return (
          <div key={i} style={{ ...card({ border: `1px solid ${borderColor}`, boxShadow: active ? '0 0 14px rgba(239,68,68,0.15)' : 'none' }), display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span style={S({})}>{cfg.label}</span>
                  {active && <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', backgroundColor: '#ef4444', color: '#fff', padding: '2px 6px' }}>ACTIVE</span>}
                  {hours[i].done && <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', backgroundColor: '#22c55e', color: '#fff', padding: '2px 6px' }}>DONE</span>}
                </div>
                <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '14px', fontWeight: 700, color: '#f5f5f5', letterSpacing: '-0.01em' }}>{cfg.title}</div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#737373', marginTop: '2px' }}>{cfg.desc}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginLeft: '12px', flexShrink: 0 }}>
                {cfg.action && (
                  <button onClick={() => setPage && setPage(cfg.action.page)}
                    style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', border: '1px solid #ef4444', color: '#ef4444', backgroundColor: 'transparent', padding: '6px 10px', cursor: 'pointer', transition: 'all 0.15s', whiteSpace: 'nowrap' }}>
                    {cfg.action.label}
                  </button>
                )}
                <button onClick={() => updateHour(i, 'done', !hours[i].done)}
                  style={{ width: '32px', height: '32px', border: `2px solid ${hours[i].done ? '#22c55e' : '#1a1a1a'}`, backgroundColor: hours[i].done ? '#22c55e' : 'transparent', color: '#fff', fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.15s' }}>
                  {hours[i].done ? '✓' : ''}
                </button>
              </div>
            </div>
            <textarea
              value={hours[i].notes}
              onChange={e => updateHour(i, 'notes', e.target.value)}
              placeholder="Notes..."
              rows={2}
              style={{ width: '100%', backgroundColor: '#0a0a0a', border: '1px solid #1a1a1a', color: '#f5f5f5', fontFamily: 'Inter, sans-serif', fontSize: '13px', padding: '8px', resize: 'vertical', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>
        )
      })}

      {/* Daily Log */}
      <div style={card({ display: 'flex', flexDirection: 'column', gap: '10px' })}>
        <div style={S({})}>DAILY LOG</div>
        <textarea
          value={dailyLog}
          onChange={e => setDailyLog(e.target.value)}
          placeholder="One thing I'll do differently tomorrow..."
          rows={3}
          style={{ width: '100%', backgroundColor: '#0a0a0a', border: '1px solid #1a1a1a', color: '#f5f5f5', fontFamily: 'Inter, sans-serif', fontSize: '13px', padding: '10px', resize: 'vertical', outline: 'none', boxSizing: 'border-box' }}
        />
      </div>

      {/* Tonality Score */}
      <div style={card()}>
        <div style={S({ marginBottom: '10px' })}>TONALITY SELF-SCORE</div>
        <div style={{ display: 'flex', gap: '4px' }}>
          {Array.from({ length: 10 }, (_, i) => i + 1).map(s => (
            <button key={s} onClick={() => setTonalityScore(s)} style={{
              flex: 1, padding: '8px 0', fontSize: '12px', fontWeight: 700,
              fontFamily: 'Space Grotesk, sans-serif',
              border: `1px solid ${tonalityScore >= s ? '#ef4444' : '#1a1a1a'}`,
              backgroundColor: tonalityScore === s ? '#ef4444' : tonalityScore > s ? '#2a0a0a' : 'transparent',
              color: tonalityScore >= s ? (tonalityScore === s ? '#fff' : '#ef4444') : '#737373',
              cursor: 'pointer', transition: 'all 0.1s',
            }}>{s}</button>
          ))}
        </div>
      </div>

      {/* Save */}
      <button onClick={handleSave} style={{
        width: '100%', padding: '14px',
        fontFamily: 'Space Grotesk, sans-serif', fontSize: '13px', fontWeight: 800,
        letterSpacing: '0.18em', border: 'none', cursor: 'pointer', transition: 'all 0.2s',
        backgroundColor: saved ? '#22c55e' : '#ef4444', color: '#fff',
      }}>
        {saved ? '✓ SAVED' : 'SAVE DAY'}
      </button>
    </div>
  )
}
