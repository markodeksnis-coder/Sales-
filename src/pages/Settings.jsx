import { useState } from 'react'
import { getSettings, saveSettings } from '../utils/storage'
import { CARD, LABEL, H1, BODY, BTN_PRIMARY, BTN_GHOST, INPUT } from '../utils/theme'

const SKILLS = ['Tonality','Discovery','Objection Handling','Frame Control','Closing']

export default function Settings() {
  const [s, setS]   = useState(getSettings)
  const [ok, setOk] = useState({})
  const [book, setBook]     = useState('')
  const [closer, setCloser] = useState('')

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

  const saveBtn = (section) => (
    <button
      onClick={() => persist(section)}
      style={ok[section]
        ? { ...BTN_PRIMARY, padding: '9px 20px', background: 'linear-gradient(135deg, #22c55e, #16a34a)', boxShadow: '0 0 20px rgba(34,197,94,0.35)', alignSelf: 'flex-start' }
        : { ...BTN_PRIMARY, padding: '9px 20px', alignSelf: 'flex-start' }
      }
    >{ok[section] ? '✓ SAVED' : 'SAVE'}</button>
  )

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h1 style={{ ...H1, margin: 0 }}>SETTINGS</h1>
        <p style={{ ...BODY, marginTop: '4px' }}>Configure your weapons.</p>
      </div>

      <div style={{ ...CARD, display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div style={{ ...LABEL }}>FATHOM API KEY</div>
        <input
          type="password"
          value={s.fathomKey || ''}
          onChange={e => upd({ fathomKey: e.target.value })}
          placeholder="Enter your Fathom API key..."
          style={{ ...INPUT }}
        />
        <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: 'rgba(255,255,255,0.25)', lineHeight: '1.5' }}>
          Used to pull your call recordings. Find it at fathom.video → Settings → API.
        </div>
        {saveBtn('fathom')}
      </div>

      <div style={{ ...CARD, display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div style={{ ...LABEL }}>ANTHROPIC API KEY</div>
        <input
          type="password"
          value={s.anthropicKey || ''}
          onChange={e => upd({ anthropicKey: e.target.value })}
          placeholder="Enter your Anthropic API key..."
          style={{ ...INPUT }}
        />
        <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: 'rgba(255,255,255,0.25)', lineHeight: '1.5' }}>
          Used to analyze your calls with AI. Find it at console.anthropic.com.
        </div>
        {saveBtn('anthropic')}
      </div>

      <div style={{ ...CARD, display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div style={{ ...LABEL }}>SKILL OF THE WEEK</div>
        <select
          value={s.skillOfWeek || 'Tonality'}
          onChange={e => upd({ skillOfWeek: e.target.value })}
          style={{
            ...INPUT,
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: '12px',
            fontWeight: 700,
            letterSpacing: '0.1em',
            appearance: 'none',
            cursor: 'pointer',
          }}
        >
          {SKILLS.map(sk => <option key={sk} value={sk}>{sk.toUpperCase()}</option>)}
        </select>
        {saveBtn('skill')}
      </div>

      <div style={{ ...CARD, display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div style={{ ...LABEL }}>READING STACK</div>
        {(s.readingStack || []).map((b, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#e2e8f0', flex: 1 }}>{b}</span>
            <button
              onClick={() => rmBook(i)}
              style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.25)', cursor: 'pointer', fontSize: '18px', padding: '0 4px', lineHeight: 1, transition: 'color 0.2s' }}
            >×</button>
          </div>
        ))}
        <div style={{ display: 'flex', gap: '8px' }}>
          <input
            value={book}
            onChange={e => setBook(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addBook()}
            placeholder="Add a book..."
            style={{ ...INPUT, flex: 1, width: 'auto' }}
          />
          <button
            onClick={addBook}
            style={{ ...BTN_GHOST, padding: '10px 14px', whiteSpace: 'nowrap' }}
          >ADD</button>
        </div>
        {saveBtn('reading')}
      </div>

      <div style={{ ...CARD, display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div style={{ ...LABEL }}>CLOSERS TO STUDY</div>
        {(s.closers || []).map((c, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#e2e8f0', flex: 1 }}>{c}</span>
            <button
              onClick={() => rmCloser(i)}
              style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.25)', cursor: 'pointer', fontSize: '18px', padding: '0 4px', lineHeight: 1, transition: 'color 0.2s' }}
            >×</button>
          </div>
        ))}
        <div style={{ display: 'flex', gap: '8px' }}>
          <input
            value={closer}
            onChange={e => setCloser(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addCloser()}
            placeholder="Add a closer..."
            style={{ ...INPUT, flex: 1, width: 'auto' }}
          />
          <button
            onClick={addCloser}
            style={{ ...BTN_GHOST, padding: '10px 14px', whiteSpace: 'nowrap' }}
          >ADD</button>
        </div>
        {saveBtn('closers')}
      </div>
    </div>
  )
}
