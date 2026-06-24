import { useState, useEffect, useRef } from 'react'
import { getDrillData, saveDrillData, getTodayKey } from '../utils/storage'
import { LABEL, H1, BODY, BTN_PRIMARY, BTN_GHOST } from '../utils/theme'
import HudCard from '../components/HudCard'

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

  const timeColor = done ? '#22d3ee' : running ? '#f97316' : 'rgba(14,165,233,0.5)'
  const timeShadow = done ? '0 0 20px rgba(34,211,238,0.6)' : running ? '0 0 20px rgba(249,115,22,0.6)' : 'none'

  return (
    <HudCard active={running} warn={done} style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
        <span style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '36px', fontWeight: 800, fontVariantNumeric: 'tabular-nums', letterSpacing: '0.04em', color: timeColor, textShadow: timeShadow, transition: 'color 0.3s, text-shadow 0.3s' }}>
          {String(m).padStart(2,'0')}:{String(s).padStart(2,'0')}
        </span>
        <button
          onClick={() => !done && setRunning(r => !r)}
          style={{
            fontFamily: 'Orbitron, sans-serif', fontSize: '9px', fontWeight: 700, letterSpacing: '0.18em',
            padding: '8px 18px', cursor: done ? 'default' : 'pointer', transition: 'all 0.2s', opacity: done ? 0.5 : 1,
            background: running ? 'transparent' : 'rgba(14,165,233,0.12)',
            border: `1px solid ${running ? 'rgba(249,115,22,0.5)' : 'rgba(14,165,233,0.45)'}`,
            color: running ? '#f97316' : '#38bdf8',
            boxShadow: running ? '0 0 16px rgba(249,115,22,0.2)' : '0 0 16px rgba(14,165,233,0.15)',
          }}
        >{running ? 'PAUSE' : done ? 'COMPLETE' : 'INITIATE'}</button>
        <button onClick={() => { setRunning(false); setSecs(inputMins * 60) }} style={{ ...BTN_GHOST, padding: '8px 14px' }}>RESET</button>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <label style={LABEL}>DURATION:</label>
        <input type="number" value={inputMins} min={1} max={120}
          onChange={e => { const v = Math.max(1, parseInt(e.target.value) || 1); setInputMins(v); if (!running) setSecs(v * 60) }}
          style={{ width: '70px', backgroundColor: 'rgba(0,0,0,0.5)', border: '1px solid rgba(14,165,233,0.18)', color: '#bae6fd', fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', padding: '6px 10px', outline: 'none', boxSizing: 'border-box' }}
        />
        <span style={LABEL}>MIN</span>
      </div>
    </HudCard>
  )
}

function DrillCard({ drill, dateKey }) {
  const saved0  = getDrillData(dateKey)?.[drill.key] || { notes: '', done: false }
  const [notes, setNotes] = useState(saved0.notes)
  const [done,  setDone]  = useState(saved0.done)
  const [saved, setSaved] = useState(false)
  const isToday = DAY_MAP[drill.key] === new Date().getDay()

  const handleSave = () => {
    const existing = getDrillData(dateKey) || {}
    saveDrillData(dateKey, { ...existing, [drill.key]: { notes, done } })
    setSaved(true); setTimeout(() => setSaved(false), 2000)
  }

  return (
    <HudCard active={isToday && !done} green={done} style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
            <span style={LABEL}>{drill.day}</span>
            <span style={{
              fontFamily: 'Orbitron, sans-serif', fontSize: '8px', fontWeight: 700, letterSpacing: '0.14em',
              padding: '3px 8px',
              border: `1px solid ${done ? 'rgba(34,197,94,0.55)' : isToday ? 'rgba(14,165,233,0.55)' : 'rgba(14,165,233,0.15)'}`,
              color: done ? '#22c55e' : isToday ? '#38bdf8' : 'rgba(14,165,233,0.3)',
              backgroundColor: done ? 'rgba(34,197,94,0.08)' : isToday ? 'rgba(14,165,233,0.08)' : 'transparent',
            }}>{done ? 'COMPLETE' : isToday ? 'TODAY' : drill.skill}</span>
          </div>
          <div style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '14px', fontWeight: 700, color: '#bae6fd', letterSpacing: '0.04em' }}>{drill.title}</div>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: 'rgba(186,230,253,0.45)', marginTop: '5px', lineHeight: '1.6' }}>{drill.desc}</div>
        </div>
        <button onClick={() => setDone(d => !d)} style={{
          flexShrink: 0, width: '34px', height: '34px',
          border: `1px solid ${done ? 'rgba(34,197,94,0.6)' : 'rgba(14,165,233,0.2)'}`,
          backgroundColor: done ? 'rgba(34,197,94,0.15)' : 'rgba(14,165,233,0.05)',
          color: done ? '#22c55e' : 'transparent', fontSize: '16px', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s',
          boxShadow: done ? '0 0 12px rgba(34,197,94,0.3)' : 'none',
        }}>{done ? '✓' : ''}</button>
      </div>

      <Timer defaultMins={60} />

      <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Session data..." rows={3}
        style={{ width: '100%', backgroundColor: 'rgba(0,0,0,0.4)', border: '1px solid rgba(14,165,233,0.1)', color: '#bae6fd', fontFamily: 'Inter, sans-serif', fontSize: '12px', padding: '10px 14px', outline: 'none', boxSizing: 'border-box', resize: 'vertical', lineHeight: '1.6', minHeight: '64px' }} />

      <button onClick={handleSave} style={saved
        ? { fontFamily: 'Orbitron, sans-serif', fontSize: '9px', fontWeight: 700, letterSpacing: '0.18em', padding: '9px 18px', background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.55)', color: '#22c55e', boxShadow: '0 0 16px rgba(34,197,94,0.2)', cursor: 'pointer', alignSelf: 'flex-start', transition: 'all 0.2s' }
        : { ...BTN_PRIMARY, padding: '9px 18px', alignSelf: 'flex-start' }
      }>{saved ? '✓ LOGGED' : 'LOG SESSION'}</button>
    </HudCard>
  )
}

export default function Drills() {
  const dateKey = getTodayKey()
  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h1 style={{ ...H1, margin: 0 }}>REPS</h1>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: 'rgba(186,230,253,0.35)', marginTop: '4px' }}>Monday through Friday. No excuses.</p>
      </div>
      {DRILLS.map(d => <DrillCard key={d.key} drill={d} dateKey={dateKey} />)}
    </div>
  )
}
