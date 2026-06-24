import { useState, useEffect, useRef } from 'react'
import { getDrillData, saveDrillData, getTodayKey } from '../utils/storage'
import { CARD, LABEL, H1, BODY, BTN_PRIMARY, BTN_GHOST, INPUT, TEXTAREA } from '../utils/theme'

const DRILLS = [
  { day: 'MONDAY',    key: 'mon', skill: 'TONALITY',        title: 'Emotional State Recorder',  desc: 'Record your opener in 5 emotional states: confident, curious, warm, urgent, detached. Play back and compare.' },
  { day: 'TUESDAY',  key: 'tue', skill: 'PSYCHOLOGY',       title: 'Chapter Extraction',         desc: 'Read one chapter from your reading stack. Take notes on one technique to steal.' },
  { day: 'WEDNESDAY',key: 'wed', skill: 'LIVE REPS',        title: 'Real Cold Calls',            desc: 'Real cold calls only. No fake practice. Log how many you made.' },
  { day: 'THURSDAY', key: 'thu', skill: 'BREAKDOWN',        title: 'Elite Closer Dissection',    desc: 'Pick one elite closer on YouTube. Dissect their structure sentence by sentence. What did they say, why did it work, how do you steal it.' },
  { day: 'FRIDAY',   key: 'fri', skill: 'WEAK LINK ATTACK', title: 'Worst Conversion Point',     desc: "Look at your week's data. Find your worst conversion point. Drill it for the full hour." },
]

const DAY_MAP = { mon: 1, tue: 2, wed: 3, thu: 4, fri: 5 }

function Timer({ defaultMins }) {
  const [secs,      setSecs]      = useState(defaultMins * 60)
  const [running,   setRunning]   = useState(false)
  const [inputMins, setInputMins] = useState(defaultMins)
  const ref = useRef(null)

  useEffect(() => {
    if (running) {
      ref.current = setInterval(() => {
        setSecs(s => {
          if (s <= 1) { setRunning(false); clearInterval(ref.current); return 0 }
          return s - 1
        })
      }, 1000)
    } else {
      clearInterval(ref.current)
    }
    return () => clearInterval(ref.current)
  }, [running])

  const m = Math.floor(secs / 60)
  const s = secs % 60
  const done = secs === 0

  const timeColor = done
    ? 'linear-gradient(135deg, #22d3ee, #0ea5e9)'
    : running
    ? 'linear-gradient(135deg, #ef4444, #f97316)'
    : 'linear-gradient(135deg, #f1f5f9, #94a3b8)'

  return (
    <div style={{
      ...CARD,
      padding: '16px',
      backgroundColor: 'rgba(0,0,0,0.3)',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
        <span style={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontSize: '36px',
          fontWeight: 800,
          fontVariantNumeric: 'tabular-nums',
          letterSpacing: '0.04em',
          background: timeColor,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          textShadow: 'none',
          filter: running ? 'drop-shadow(0 0 8px rgba(239,68,68,0.5))' : 'none',
          transition: 'filter 0.3s',
        }}>
          {String(m).padStart(2,'0')}:{String(s).padStart(2,'0')}
        </span>
        <button
          onClick={() => !done && setRunning(r => !r)}
          style={{
            ...BTN_PRIMARY,
            padding: '8px 18px',
            opacity: done ? 0.5 : 1,
            cursor: done ? 'default' : 'pointer',
            background: running
              ? 'transparent'
              : 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
            border: running ? '1px solid rgba(239,68,68,0.5)' : 'none',
            color: running ? '#ef4444' : '#fff',
            boxShadow: running ? 'none' : '0 0 20px rgba(239,68,68,0.35)',
          }}
        >{running ? 'PAUSE' : done ? 'DONE' : 'START'}</button>
        <button
          onClick={() => { setRunning(false); setSecs(inputMins * 60) }}
          style={{ ...BTN_GHOST, padding: '8px 14px' }}
        >RESET</button>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <label style={{ ...LABEL }}>MINUTES:</label>
        <input
          type="number"
          value={inputMins}
          min={1}
          max={120}
          onChange={e => {
            const v = Math.max(1, parseInt(e.target.value) || 1)
            setInputMins(v)
            if (!running) setSecs(v * 60)
          }}
          style={{ ...INPUT, width: '70px', padding: '6px 10px' }}
        />
      </div>
    </div>
  )
}

function DrillCard({ drill, dateKey }) {
  const saved0   = getDrillData(dateKey)?.[drill.key] || { notes: '', done: false }
  const [notes,  setNotes]  = useState(saved0.notes)
  const [done,   setDone]   = useState(saved0.done)
  const [saved,  setSaved]  = useState(false)
  const isToday  = DAY_MAP[drill.key] === new Date().getDay()

  const handleSave = () => {
    const existing = getDrillData(dateKey) || {}
    saveDrillData(dateKey, { ...existing, [drill.key]: { notes, done } })
    setSaved(true); setTimeout(() => setSaved(false), 2000)
  }

  const cardStyle = done
    ? { ...CARD, border: '1px solid rgba(34,197,94,0.3)', boxShadow: '0 0 20px rgba(34,197,94,0.06)' }
    : isToday
    ? { ...CARD, border: '1px solid rgba(239,68,68,0.4)', boxShadow: '0 0 28px rgba(239,68,68,0.12)' }
    : { ...CARD }

  const tagColor = done ? '#22c55e' : isToday ? '#ef4444' : 'rgba(255,255,255,0.3)'
  const tagBg    = done ? 'rgba(34,197,94,0.08)' : isToday ? 'rgba(239,68,68,0.08)' : 'transparent'

  return (
    <div style={{ ...cardStyle, display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
            <span style={{ ...LABEL }}>{drill.day}</span>
            <span style={{
              fontFamily: 'Space Grotesk, sans-serif', fontSize: '10px', fontWeight: 700,
              letterSpacing: '0.14em', padding: '3px 8px',
              border: `1px solid ${tagColor}55`, color: tagColor, backgroundColor: tagBg,
            }}>{done ? 'COMPLETE' : isToday ? 'TODAY' : drill.skill}</span>
          </div>
          <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '15px', fontWeight: 700, color: '#f1f5f9', letterSpacing: '-0.01em' }}>{drill.title}</div>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#64748b', marginTop: '5px', lineHeight: '1.6' }}>{drill.desc}</div>
        </div>
        <button
          onClick={() => setDone(d => !d)}
          style={{
            flexShrink: 0, width: '34px', height: '34px',
            border: `2px solid ${done ? '#22c55e' : 'rgba(255,255,255,0.12)'}`,
            backgroundColor: done ? 'rgba(34,197,94,0.15)' : 'transparent',
            color: done ? '#22c55e' : 'transparent',
            fontSize: '16px', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.2s',
          }}
        >{done ? '✓' : ''}</button>
      </div>

      <Timer defaultMins={60} />

      <textarea
        value={notes}
        onChange={e => setNotes(e.target.value)}
        placeholder="Notes from this session..."
        rows={3}
        style={{ ...TEXTAREA }}
      />

      <button
        onClick={handleSave}
        style={saved
          ? { ...BTN_PRIMARY, padding: '9px 18px', background: 'linear-gradient(135deg, #22c55e, #16a34a)', boxShadow: '0 0 20px rgba(34,197,94,0.35)', alignSelf: 'flex-start' }
          : { ...BTN_PRIMARY, padding: '9px 18px', alignSelf: 'flex-start' }
        }
      >{saved ? '✓ SAVED' : 'SAVE NOTES'}</button>
    </div>
  )
}

export default function Drills() {
  const dateKey = getTodayKey()
  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h1 style={{ ...H1, margin: 0 }}>DRILL SCHEDULE</h1>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#64748b', marginTop: '4px' }}>Monday through Friday. No excuses.</p>
      </div>
      {DRILLS.map(d => <DrillCard key={d.key} drill={d} dateKey={dateKey} />)}
    </div>
  )
}
