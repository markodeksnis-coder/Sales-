import { useState } from 'react'
import { getSettings, getStreak, saveStreak, getWeek, saveWeek, getDaily, saveDaily, getWeekKey, getTodayKey, storage } from '../utils/storage'
import { LABEL, H1, BODY, BTN_PRIMARY, BTN_GHOST } from '../utils/theme'
import HudCard from '../components/HudCard'

const DAYS = ['mon','tue','wed','thu','fri']
const DAY_LABELS = ['MON','TUE','WED','THU','FRI']
const DRILL_BY_DAY = {
  1: { name: 'TONALITY',         desc: 'Record your opener in 5 emotional states: confident, curious, warm, urgent, detached.' },
  2: { name: 'PSYCHOLOGY',       desc: 'Read one chapter from your reading stack. Take notes on one technique to steal.' },
  3: { name: 'LIVE REPS',        desc: 'Real cold calls only. No fake practice. Log how many you made.' },
  4: { name: 'BREAKDOWN',        desc: 'Pick one elite closer on YouTube. Dissect their structure sentence by sentence.' },
  5: { name: 'WEAK LINK ATTACK', desc: "Find your worst conversion point from this week. Drill it for the full hour." },
}

function RadialGauge({ value = 0, max = 10, label = '', color = '#0ea5e9', size = 100 }) {
  const r = 36, cx = size / 2, cy = size / 2
  const circ = 2 * Math.PI * r
  const pct = Math.min(Math.max(value / max, 0), 1)
  return (
    <div style={{ textAlign: 'center', flexShrink: 0 }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={cx} cy={cy} r={r + 8} fill="none" stroke="rgba(14,165,233,0.04)" strokeWidth="1" />
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(14,165,233,0.07)" strokeWidth="5" />
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth="5"
          strokeDasharray={`${circ * pct} ${circ * (1 - pct)}`} strokeLinecap="round"
          transform={`rotate(-90 ${cx} ${cy})`}
          style={{ filter: `drop-shadow(0 0 5px ${color})`, transition: 'stroke-dasharray 0.8s cubic-bezier(0.4,0,0.2,1)' }} />
        <text x={cx} y={cy - 4} textAnchor="middle" fill={color} fontFamily="Orbitron" fontSize="18" fontWeight="700">{value}</text>
        <text x={cx} y={cy + 13} textAnchor="middle" fill="rgba(14,165,233,0.3)" fontFamily="Orbitron" fontSize="7">/{max}</text>
      </svg>
      <div style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '8px', fontWeight: 700, letterSpacing: '0.22em', color: 'rgba(14,165,233,0.38)', marginTop: '2px' }}>{label}</div>
    </div>
  )
}

export default function Today({ setPage }) {
  const today     = new Date()
  const dow       = today.getDay()
  const weekKey   = getWeekKey()
  const dateKey   = getTodayKey()
  const settings  = getSettings()

  const [streak,   setStreak]   = useState(getStreak)
  const [week,     setWeek]     = useState(() => getWeek(weekKey))
  const [hours,    setHours]    = useState(() => getDaily(dateKey)?.hours || Array(4).fill(null).map(() => ({ done: false, notes: '' })))
  const [dailyLog, setDailyLog] = useState(() => getDaily(dateKey)?.log || '')
  const [tonality, setTonality] = useState(() => getDaily(dateKey)?.score || 0)
  const [saved,    setSaved]    = useState(false)

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

  const doneCount = hours.filter(h => h.done).length

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
        <div>
          <h1 style={H1}>DASHBOARD</h1>
          <p style={{ ...BODY, marginTop: '5px' }}>{today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
        </div>
        <RadialGauge value={streak} max={30} label="STREAK" color="#22d3ee" size={90} />
      </div>

      <div style={{ display: 'flex', gap: '10px' }}>
        <HudCard style={{ flex: 1, padding: '14px', textAlign: 'center' }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '28px', fontWeight: 700, color: '#0ea5e9', textShadow: '0 0 20px rgba(14,165,233,0.5)' }}>{doneCount}</div>
          <div style={LABEL}>HOURS DONE</div>
        </HudCard>
        <HudCard style={{ flex: 1, padding: '14px', textAlign: 'center' }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '28px', fontWeight: 700, color: tonality > 0 ? '#a78bfa' : 'rgba(14,165,233,0.2)', textShadow: tonality > 0 ? '0 0 20px rgba(167,139,250,0.5)' : 'none' }}>{tonality > 0 ? tonality : '—'}</div>
          <div style={LABEL}>TONALITY</div>
        </HudCard>
        <HudCard style={{ flex: 1, padding: '14px', textAlign: 'center' }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '28px', fontWeight: 700, color: '#22c55e', textShadow: '0 0 20px rgba(34,197,94,0.5)' }}>{Object.values(week).filter(Boolean).length}</div>
          <div style={LABEL}>DAYS THIS WEEK</div>
        </HudCard>
      </div>

      <HudCard style={{ padding: '16px' }}>
        <div style={{ ...LABEL, marginBottom: '14px' }}>WEEKLY GRID</div>
        <div style={{ display: 'flex', gap: '6px' }}>
          {DAYS.map((day, i) => (
            <button key={day} onClick={() => toggleDay(day)} style={{
              flex: 1, padding: '9px 0',
              fontFamily: 'Orbitron, sans-serif', fontSize: '9px', fontWeight: 700, letterSpacing: '0.12em',
              border: `1px solid ${week[day] ? 'rgba(14,165,233,0.55)' : 'rgba(14,165,233,0.1)'}`,
              cursor: 'pointer', transition: 'all 0.15s',
              background: week[day] ? 'rgba(14,165,233,0.15)' : 'rgba(14,165,233,0.03)',
              color: week[day] ? '#38bdf8' : 'rgba(14,165,233,0.25)',
              boxShadow: week[day] ? '0 0 14px rgba(14,165,233,0.2)' : 'none',
              textShadow: week[day] ? '0 0 10px rgba(14,165,233,0.6)' : 'none',
            }}>{DAY_LABELS[i]}</button>
          ))}
          {['SAT','SUN'].map(d => (
            <button key={d} style={{ flex: 1, padding: '9px 0', fontFamily: 'Orbitron, sans-serif', fontSize: '9px', background: 'transparent', border: '1px solid rgba(14,165,233,0.04)', color: 'rgba(14,165,233,0.1)', cursor: 'default' }}>{d}</button>
          ))}
        </div>
      </HudCard>

      {hourConfigs.map((cfg, i) => {
        const active = isActive(i) && !hours[i].done
        return (
          <HudCard key={i} active={active} green={hours[i].done} style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <span style={LABEL}>{cfg.label}</span>
                  {active && <span style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '8px', fontWeight: 700, letterSpacing: '0.18em', padding: '3px 8px', border: '1px solid rgba(14,165,233,0.55)', color: '#38bdf8', backgroundColor: 'rgba(14,165,233,0.1)', animation: 'apexPulse 2s ease-in-out infinite' }}>ACTIVE</span>}
                  {hours[i].done && <span style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '8px', fontWeight: 700, letterSpacing: '0.18em', padding: '3px 8px', border: '1px solid rgba(34,197,94,0.55)', color: '#22c55e', backgroundColor: 'rgba(34,197,94,0.08)' }}>COMPLETE</span>}
                </div>
                <div style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '14px', fontWeight: 700, color: '#bae6fd', letterSpacing: '0.04em' }}>{cfg.title}</div>
                <div style={{ ...BODY, marginTop: '3px' }}>{cfg.desc}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginLeft: '16px', flexShrink: 0 }}>
                {cfg.action && (
                  <button onClick={() => setPage?.(cfg.action.page)} style={{ ...BTN_GHOST, fontSize: '9px', letterSpacing: '0.12em', padding: '7px 12px', whiteSpace: 'nowrap' }}>
                    {cfg.action.label}
                  </button>
                )}
                <button onClick={() => updHour(i, 'done', !hours[i].done)} style={{
                  width: '32px', height: '32px', border: `1px solid ${hours[i].done ? 'rgba(34,197,94,0.6)' : 'rgba(14,165,233,0.2)'}`,
                  background: hours[i].done ? 'rgba(34,197,94,0.15)' : 'rgba(14,165,233,0.05)',
                  color: '#22c55e', fontSize: '14px', cursor: 'pointer', display: 'flex',
                  alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.15s',
                  boxShadow: hours[i].done ? '0 0 12px rgba(34,197,94,0.3)' : 'none',
                }}>{hours[i].done ? '✓' : ''}</button>
              </div>
            </div>
            <textarea value={hours[i].notes} onChange={e => updHour(i,'notes',e.target.value)} placeholder="Mission notes..." rows={2}
              style={{ width: '100%', backgroundColor: 'rgba(0,0,0,0.4)', border: '1px solid rgba(14,165,233,0.1)', color: '#bae6fd', fontFamily: 'Inter, sans-serif', fontSize: '12px', padding: '10px 14px', outline: 'none', boxSizing: 'border-box', resize: 'vertical', lineHeight: '1.6' }} />
          </HudCard>
        )
      })}

      <HudCard style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={LABEL}>DAILY LOG</div>
        <textarea value={dailyLog} onChange={e => setDailyLog(e.target.value)}
          placeholder="One thing I'll do differently tomorrow..."
          rows={3} style={{ width: '100%', backgroundColor: 'rgba(0,0,0,0.4)', border: '1px solid rgba(14,165,233,0.1)', color: '#bae6fd', fontFamily: 'Inter, sans-serif', fontSize: '12px', padding: '10px 14px', outline: 'none', boxSizing: 'border-box', resize: 'vertical', lineHeight: '1.6' }} />
      </HudCard>

      <HudCard style={{ padding: '16px' }}>
        <div style={{ ...LABEL, marginBottom: '14px' }}>TONALITY SELF-SCORE</div>
        <div style={{ display: 'flex', gap: '4px' }}>
          {Array.from({ length: 10 }, (_, i) => i + 1).map(s => (
            <button key={s} onClick={() => setTonality(s)} style={{
              flex: 1, padding: '9px 0', fontFamily: 'Orbitron, sans-serif', fontSize: '11px', fontWeight: 700,
              border: `1px solid ${tonality >= s ? 'rgba(167,139,250,0.4)' : 'rgba(14,165,233,0.1)'}`,
              cursor: 'pointer', transition: 'all 0.15s',
              background: tonality === s ? 'rgba(167,139,250,0.2)' : tonality > s ? 'rgba(167,139,250,0.08)' : 'rgba(14,165,233,0.03)',
              color: tonality >= s ? (tonality === s ? '#a78bfa' : 'rgba(167,139,250,0.6)') : 'rgba(14,165,233,0.2)',
              boxShadow: tonality === s ? '0 0 14px rgba(167,139,250,0.3)' : 'none',
              textShadow: tonality === s ? '0 0 8px rgba(167,139,250,0.6)' : 'none',
            }}>{s}</button>
          ))}
        </div>
      </HudCard>

      <button onClick={handleSave} style={{
        ...BTN_PRIMARY,
        width: '100%', padding: '16px',
        fontSize: '11px', letterSpacing: '0.22em',
        background: saved ? 'rgba(34,197,94,0.15)' : 'rgba(14,165,233,0.12)',
        border: saved ? '1px solid rgba(34,197,94,0.55)' : '1px solid rgba(14,165,233,0.55)',
        color: saved ? '#22c55e' : '#38bdf8',
        boxShadow: saved ? '0 0 30px rgba(34,197,94,0.2)' : '0 0 30px rgba(14,165,233,0.15)',
        textShadow: saved ? '0 0 10px rgba(34,197,94,0.6)' : '0 0 10px rgba(14,165,233,0.5)',
      }}>{saved ? '✓ DAY LOGGED' : 'COMMIT TO LOG'}</button>
    </div>
  )
}
