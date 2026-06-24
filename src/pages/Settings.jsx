import { useState } from 'react'
import { getSettings, saveSettings } from '../utils/storage'
import { LABEL, H1, BODY, BTN_PRIMARY, BTN_GHOST, INPUT } from '../utils/theme'
import HudCard from '../components/HudCard'

const SKILLS = ['Tonality','Discovery','Objection Handling','Frame Control','Closing']

export default function Settings() {
  const [s, setS]   = useState(getSettings)
  const [ok, setOk] = useState({})
  const [book, setBook]     = useState('')
  const [closer, setCloser] = useState('')
  const [fathomTest, setFathomTest] = useState({ ok: null, msg: '' })
  const [testing, setTesting] = useState(false)

  const persist = (section) => {
    saveSettings(s)
    setOk(p => ({ ...p, [section]: true }))
    setTimeout(() => setOk(p => ({ ...p, [section]: false })), 2000)
  }

  const upd = (patch) => setS(p => ({ ...p, ...patch }))

  const addBook   = () => { if (!book.trim()) return; upd({ readingStack: [...(s.readingStack||[]), book.trim()] }); setBook('') }
  const rmBook    = (i) => upd({ readingStack: s.readingStack.filter((_,idx) => idx !== i) })
  const addCloser = () => { if (!closer.trim()) return; upd({ closers: [...(s.closers||[]), closer.trim()] }); setCloser('') }
  const rmCloser  = (i) => upd({ closers: s.closers.filter((_,idx) => idx !== i) })

  const testFathom = async () => {
    if (!s.fathomKey?.trim()) { setFathomTest({ ok: false, msg: 'No API key entered.' }); return }
    setTesting(true); setFathomTest({ ok: null, msg: 'Testing connection...' })
    try {
      const res = await fetch('https://api.fathom.video/v1/calls?limit=5', {
        headers: { Authorization: `Bearer ${s.fathomKey.trim()}` }
      })
      if (res.ok) {
        const data = await res.json()
        const count = data?.data?.length ?? 0
        setFathomTest({ ok: true, msg: `Connected — ${count} recent call${count !== 1 ? 's' : ''} found.` })
      } else {
        setFathomTest({ ok: false, msg: `Auth failed (${res.status}). Check your API key.` })
      }
    } catch {
      setFathomTest({ ok: false, msg: 'Network error. Check your connection.' })
    }
    setTesting(false)
  }

  const saveBtn = (section) => (
    <button onClick={() => persist(section)} style={ok[section]
      ? { fontFamily: 'Orbitron, sans-serif', fontSize: '9px', fontWeight: 700, letterSpacing: '0.18em', padding: '9px 20px', background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.55)', color: '#22c55e', boxShadow: '0 0 16px rgba(34,197,94,0.2)', cursor: 'pointer', alignSelf: 'flex-start', transition: 'all 0.2s' }
      : { ...BTN_PRIMARY, padding: '9px 20px', alignSelf: 'flex-start' }
    }>{ok[section] ? '✓ SAVED' : 'SAVE'}</button>
  )

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h1 style={{ ...H1, margin: 0 }}>CONFIG</h1>
        <p style={{ ...BODY, marginTop: '4px' }}>System parameters.</p>
      </div>

      <HudCard style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
          <div style={LABEL}>FATHOM API KEY</div>
          {fathomTest.msg && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: fathomTest.ok === true ? '#22c55e' : fathomTest.ok === false ? '#f97316' : '#0ea5e9', boxShadow: `0 0 6px ${fathomTest.ok === true ? '#22c55e' : fathomTest.ok === false ? '#f97316' : '#0ea5e9'}` }} />
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: fathomTest.ok === true ? '#22c55e' : fathomTest.ok === false ? '#f97316' : '#38bdf8' }}>{fathomTest.msg}</span>
            </div>
          )}
        </div>
        <input type="password" value={s.fathomKey || ''} onChange={e => upd({ fathomKey: e.target.value })} placeholder="Enter your Fathom API key..." style={{ ...INPUT }} />
        <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: 'rgba(14,165,233,0.3)', lineHeight: '1.5' }}>Used to pull your call recordings. Find it at fathom.video → Settings → API.</div>
        <div style={{ display: 'flex', gap: '10px' }}>
          {saveBtn('fathom')}
          <button onClick={testFathom} disabled={testing} style={{
            fontFamily: 'Orbitron, sans-serif', fontSize: '9px', fontWeight: 700, letterSpacing: '0.18em',
            padding: '9px 20px', background: 'rgba(14,165,233,0.06)', border: '1px solid rgba(14,165,233,0.25)',
            color: testing ? 'rgba(14,165,233,0.4)' : '#38bdf8', cursor: testing ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s', alignSelf: 'flex-start',
          }}>{testing ? 'TESTING...' : 'TEST CONNECTION'}</button>
        </div>
      </HudCard>

      <HudCard style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div style={LABEL}>ANTHROPIC API KEY</div>
        <input type="password" value={s.anthropicKey || ''} onChange={e => upd({ anthropicKey: e.target.value })} placeholder="Enter your Anthropic API key..." style={{ ...INPUT }} />
        <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: 'rgba(14,165,233,0.3)', lineHeight: '1.5' }}>Used to analyze your calls with AI. Find it at console.anthropic.com.</div>
        {saveBtn('anthropic')}
      </HudCard>

      <HudCard style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div style={LABEL}>SKILL OF THE WEEK</div>
        <select value={s.skillOfWeek || 'Tonality'} onChange={e => upd({ skillOfWeek: e.target.value })}
          style={{ ...INPUT, fontFamily: 'Orbitron, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', appearance: 'none', cursor: 'pointer' }}>
          {SKILLS.map(sk => <option key={sk} value={sk}>{sk.toUpperCase()}</option>)}
        </select>
        {saveBtn('skill')}
      </HudCard>

      <HudCard style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div style={LABEL}>INTEL LIBRARY</div>
        {(s.readingStack || []).map((b, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 0', borderBottom: '1px solid rgba(14,165,233,0.06)' }}>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#bae6fd', flex: 1 }}>{b}</span>
            <button onClick={() => rmBook(i)} style={{ background: 'none', border: 'none', color: 'rgba(14,165,233,0.25)', cursor: 'pointer', fontSize: '18px', padding: '0 4px', lineHeight: 1 }}>×</button>
          </div>
        ))}
        <div style={{ display: 'flex', gap: '8px' }}>
          <input value={book} onChange={e => setBook(e.target.value)} onKeyDown={e => e.key === 'Enter' && addBook()} placeholder="Add a book..." style={{ ...INPUT, flex: 1, width: 'auto' }} />
          <button onClick={addBook} style={{ ...BTN_GHOST, padding: '10px 14px', whiteSpace: 'nowrap' }}>ADD</button>
        </div>
        {saveBtn('reading')}
      </HudCard>

      <HudCard style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div style={LABEL}>OPERATORS TO STUDY</div>
        {(s.closers || []).map((c, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 0', borderBottom: '1px solid rgba(14,165,233,0.06)' }}>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#bae6fd', flex: 1 }}>{c}</span>
            <button onClick={() => rmCloser(i)} style={{ background: 'none', border: 'none', color: 'rgba(14,165,233,0.25)', cursor: 'pointer', fontSize: '18px', padding: '0 4px', lineHeight: 1 }}>×</button>
          </div>
        ))}
        <div style={{ display: 'flex', gap: '8px' }}>
          <input value={closer} onChange={e => setCloser(e.target.value)} onKeyDown={e => e.key === 'Enter' && addCloser()} placeholder="Add a closer..." style={{ ...INPUT, flex: 1, width: 'auto' }} />
          <button onClick={addCloser} style={{ ...BTN_GHOST, padding: '10px 14px', whiteSpace: 'nowrap' }}>ADD</button>
        </div>
        {saveBtn('closers')}
      </HudCard>
    </div>
  )
}
