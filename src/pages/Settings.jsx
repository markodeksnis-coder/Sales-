import { useState } from 'react'
import { getSettings, saveSettings } from '../utils/storage'

const SKILLS = ['Tonality','Discovery','Objection Handling','Frame Control','Closing']

export default function Settings() {
  const [s, setS]     = useState(getSettings)
  const [ok, setOk]   = useState({})
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

  const box = () => ({ backgroundColor: '#111111', border: '1px solid #1a1a1a', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' })
  const label = (text) => <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '10px', fontWeight: 700, letterSpacing: '0.15em', color: '#737373' }}>{text}</div>
  const inp = (val, onChange, placeholder, type='text') => (
    <input type={type} value={val} onChange={onChange} placeholder={placeholder} style={{ width: '100%', backgroundColor: '#0a0a0a', border: '1px solid #1a1a1a', color: '#f5f5f5', fontFamily: 'Inter, sans-serif', fontSize: '13px', padding: '8px 10px', outline: 'none', boxSizing: 'border-box' }} />
  )
  const saveBtn = (section) => (
    <button onClick={() => persist(section)} style={{
      fontFamily: 'Space Grotesk, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em',
      padding: '8px 16px', border: 'none', cursor: 'pointer',
      backgroundColor: ok[section] ? '#22c55e' : '#ef4444', color: '#fff', alignSelf: 'flex-start',
    }}>{ok[section] ? '✓ SAVED' : 'SAVE'}</button>
  )

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '22px', fontWeight: 800, color: '#f5f5f5', letterSpacing: '-0.02em', margin: 0 }}>SETTINGS</h1>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#737373', marginTop: '4px' }}>Configure your weapons.</p>
      </div>

      <div style={box()}>
        {label('FATHOM API KEY')}
        {inp(s.fathomKey || '', e => upd({ fathomKey: e.target.value }), 'Enter your Fathom API key...', 'password')}
        {saveBtn('fathom')}
      </div>

      <div style={box()}>
        {label('ANTHROPIC API KEY')}
        {inp(s.anthropicKey || '', e => upd({ anthropicKey: e.target.value }), 'Enter your Anthropic API key...', 'password')}
        {saveBtn('anthropic')}
      </div>

      <div style={box()}>
        {label('SKILL OF THE WEEK')}
        <select value={s.skillOfWeek || 'Tonality'} onChange={e => upd({ skillOfWeek: e.target.value })}
          style={{ backgroundColor: '#0a0a0a', border: '1px solid #1a1a1a', color: '#f5f5f5', fontFamily: 'Space Grotesk, sans-serif', fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', padding: '8px 10px', outline: 'none', width: '100%', appearance: 'none', cursor: 'pointer' }}>
          {SKILLS.map(sk => <option key={sk} value={sk}>{sk.toUpperCase()}</option>)}
        </select>
        {saveBtn('skill')}
      </div>

      <div style={box()}>
        {label('READING STACK')}
        {(s.readingStack || []).map((b, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#f5f5f5', flex: 1 }}>{b}</span>
            <button onClick={() => rmBook(i)} style={{ background: 'none', border: 'none', color: '#737373', cursor: 'pointer', fontSize: '14px', padding: '2px 6px', lineHeight: 1 }}>×</button>
          </div>
        ))}
        <div style={{ display: 'flex', gap: '6px' }}>
          <input value={book} onChange={e => setBook(e.target.value)} onKeyDown={e => e.key === 'Enter' && addBook()} placeholder="Add book..."
            style={{ flex: 1, backgroundColor: '#0a0a0a', border: '1px solid #1a1a1a', color: '#f5f5f5', fontFamily: 'Inter, sans-serif', fontSize: '13px', padding: '8px 10px', outline: 'none' }} />
          <button onClick={addBook} style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', padding: '8px 12px', border: '1px solid #1a1a1a', backgroundColor: 'transparent', color: '#737373', cursor: 'pointer', whiteSpace: 'nowrap' }}>ADD</button>
        </div>
        {saveBtn('reading')}
      </div>

      <div style={box()}>
        {label('CLOSERS TO STUDY')}
        {(s.closers || []).map((c, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#f5f5f5', flex: 1 }}>{c}</span>
            <button onClick={() => rmCloser(i)} style={{ background: 'none', border: 'none', color: '#737373', cursor: 'pointer', fontSize: '14px', padding: '2px 6px', lineHeight: 1 }}>×</button>
          </div>
        ))}
        <div style={{ display: 'flex', gap: '6px' }}>
          <input value={closer} onChange={e => setCloser(e.target.value)} onKeyDown={e => e.key === 'Enter' && addCloser()} placeholder="Add closer..."
            style={{ flex: 1, backgroundColor: '#0a0a0a', border: '1px solid #1a1a1a', color: '#f5f5f5', fontFamily: 'Inter, sans-serif', fontSize: '13px', padding: '8px 10px', outline: 'none' }} />
          <button onClick={addCloser} style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', padding: '8px 12px', border: '1px solid #1a1a1a', backgroundColor: 'transparent', color: '#737373', cursor: 'pointer', whiteSpace: 'nowrap' }}>ADD</button>
        </div>
        {saveBtn('closers')}
      </div>
    </div>
  )
}
