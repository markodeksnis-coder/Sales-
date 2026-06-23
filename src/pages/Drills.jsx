import { useState, useEffect, useRef } from 'react'
import { getDrillData, saveDrillData, getTodayKey } from '../utils/storage'

const DRILLS = [
  { day: 'MONDAY',    key: 'mon', skill: 'TONALITY',         title: 'Emotional State Recorder',   desc: 'Record your opener in 5 emotional states: confident, curious, warm, urgent, detached. Play back and compare.' },
  { day: 'TUESDAY',   key: 'tue', skill: 'PSYCHOLOGY',        title: 'Chapter Extraction',          desc: 'Read one chapter from your reading stack. Take notes on one technique to steal.' },
  { day: 'WEDNESDAY', key: 'wed', skill: 'LIVE REPS',         title: 'Real Cold Calls',             desc: 'Real cold calls only. No fake practice. Log how many you made.' },
  { day: 'THURSDAY',  key: 'thu', skill: 'BREAKDOWN',         title: 'Elite Closer Dissection',     desc: 'Pick one elite closer on YouTube. Dissect their structure sentence by sentence. What did they say, why did it work, how do you steal it.' },
  { day: 'FRIDAY',    key: 'fri', skill: 'WEAK LINK ATTACK',  title: 'Worst Conversion Point',      desc: "Look at your week's data. Find your worst conversion point. Drill it for the full hour." },
]

const DAY_MAP = { mon: 1, tue: 2, wed: 3, thu: 4, fri: 5 }

function Timer({ defaultMins }) {
  const [secs,       setSecs]       = useState(defaultMins * 60)
  const [running,    setRunning]    = useState(false)
  const [inputMins,  setInputMins]  = useState(defaultMins)
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
  const timeColor = done ? '#22c55e' : running ? '#ef4444' : '#f5f5f5'

  return (
    <div style={{ backgroundColor: '#0a0a0a', border: '1px solid #1a1a1a', padding: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '32px', fontWeight: 800, color: timeColor, fontVariantNumeric: 'tabular-nums', letterSpacing: '0.05em' }}>
          {String(m).padStart(2,'0')}:{String(s).padStart(2,'0')}
        </span>
        <button onClick={() => !done && setRunning(r => !r)} style={{
          fontFamily: 'Space Grotesk, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em',
          padding: '7px 14px', border: `1px solid ${running ? '#ef4444' : '#ef4444'}`,
          backgroundColor: running ? 'transparent' : '#ef4444',
          color: running ? '#ef4444' : '#fff', cursor: done ? 'default' : 'pointer',
          opacity: done ? 0.5 : 1,
        }}>{running ? 'PAUSE' : done ? 'DONE' : 'START'}</button>
        <button onClick={() => { setRunning(false); setSecs(inputMins * 60) }} style={{
          fontFamily: 'Space Grotesk, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em',
          padding: '7px 14px', border: '1px solid #1a1a1a', backgroundColor: 'transparent',
          color: '#737373', cursor: 'pointer',
        }}>RESET</button>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <label style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', color: '#737373' }}>MINUTES:</label>
        <input type="number" value={inputMins} min={1} max={120} onChange={e => {
          const v = Math.max(1, parseInt(e.target.value) || 1)
          setInputMins(v)
          if (!running) setSecs(v * 60)
        }} style={{ width: '60px', backgroundColor: '#111111', border: '1px solid #1a1a1a', color: '#f5f5f5', fontFamily: 'Inter, sans-serif', fontSize: '13px', padding: '4px 8px', outline: 'none' }} />
      </div>
    </div>
  )
}

function DrillCard({ drill, dateKey }) {
  const saved0     = getDrillData(dateKey)?.[drill.key] || { notes: '', done: false }
  const [notes,    setNotes]    = useState(saved0.notes)
  const [done,     setDone]     = useState(saved0.done)
  const [saved,    setSaved]    = useState(false)
  const isToday = DAY_MAP[drill.key] === new Date().getDay()

  const handleSave = () => {
    const existing = getDrillData(dateKey) || {}
    saveDrillData(dateKey, { ...existing, [drill.key]: { notes, done } })
    setSaved(true); setTimeout(() => setSaved(false), 2000)
  }

  const borderColor = done ? '#22c55e' : isToday ? '#ef4444' : '#1a1a1a'

  return (
    <div style={{ backgroundColor: '#111111', border: `1px solid ${borderColor}`, padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px', boxShadow: isToday && !done ? '0 0 14px rgba(239,68,68,0.12)' : 'none' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '10px', fontWeight: 700, letterSpacing: '0.15em', color: '#737373' }}>{drill.day}</span>
            <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', padding: '2px 6px', border: `1px solid ${done ? '#22c55e' : isToday ? '#ef4444' : '#1a1a1a'}`, color: done ? '#22c55e' : isToday ? '#ef4444' : '#737373', backgroundColor: done ? '#0a1a0a' : isToday ? '#1a0a0a' : 'transparent' }}>
              {done ? 'DONE' : isToday ? 'TODAY' : drill.skill}
            </span>
          </div>
          <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '14px', fontWeight: 700, color: '#f5f5f5' }}>{drill.title}</div>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#737373', marginTop: '4px', lineHeight: '1.5' }}>{drill.desc}</div>
        </div>
        <button onClick={() => setDone(d => !d)} style={{
          marginLeft: '12px', flexShrink: 0, width: '32px', height: '32px',
          border: `2px solid ${done ? '#22c55e' : '#1a1a1a'}`,
          backgroundColor: done ? '#22c55e' : 'transparent',
          color: '#fff', fontSize: '14px', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>{done ? '✓' : ''}</button>
      </div>

      <Timer defaultMins={60} />

      <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Notes from this session..." rows={3}
        style={{ width: '100%', backgroundColor: '#0a0a0a', border: '1px solid #1a1a1a', color: '#f5f5f5', fontFamily: 'Inter, sans-serif', fontSize: '13px', padding: '10px', resize: 'vertical', outline: 'none', boxSizing: 'border-box' }} />

      <button onClick={handleSave} style={{
        fontFamily: 'Space Grotesk, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em',
        padding: '8px', border: `1px solid ${saved ? '#22c55e' : '#1a1a1a'}`,
        backgroundColor: saved ? '#22c55e' : 'transparent', color: saved ? '#fff' : '#737373', cursor: 'pointer',
      }}>{saved ? '✓ SAVED' : 'SAVE NOTES'}</button>
    </div>
  )
}

export default function Drills() {
  const dateKey = getTodayKey()
  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '22px', fontWeight: 800, color: '#f5f5f5', letterSpacing: '-0.02em', margin: 0 }}>DRILL SCHEDULE</h1>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#737373', marginTop: '4px' }}>Monday through Friday. No excuses.</p>
      </div>
      {DRILLS.map(d => <DrillCard key={d.key} drill={d} dateKey={dateKey} />)}
    </div>
  )
}
