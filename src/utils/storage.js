export const storage = {
  get: (key, def = null) => {
    try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : def } catch { return def }
  },
  set: (key, value) => {
    try { localStorage.setItem(key, JSON.stringify(value)) } catch {}
  },
}

export const getSettings = () => storage.get('sgs_settings', {
  fathomKey: '',
  anthropicKey: '',
  skillOfWeek: 'Tonality',
  readingStack: ['Never Split the Difference', 'Influence', 'Way of the Wolf', 'Fanatical Prospecting'],
  closers: ['Jeremy Miner', 'Andy Elliott', 'Alex Hormozi'],
})
export const saveSettings  = (s) => storage.set('sgs_settings', s)

export const getStreak     = ()    => storage.get('sgs_streak', 0)
export const saveStreak    = (n)   => storage.set('sgs_streak', n)

export const getWeek       = (k)   => storage.get(`sgs_week_${k}`, { mon:false, tue:false, wed:false, thu:false, fri:false })
export const saveWeek      = (k,d) => storage.set(`sgs_week_${k}`, d)

export const getDaily      = (k)   => storage.get(`sgs_daily_${k}`, null)
export const saveDaily     = (k,d) => storage.set(`sgs_daily_${k}`, d)

export const getAnalysis   = (id)  => storage.get(`sgs_analyses_${id}`, null)
export const saveAnalysis  = (id,d)=> storage.set(`sgs_analyses_${id}`, d)

export const getDrillData  = (k)   => storage.get(`sgs_drill_${k}`, null)
export const saveDrillData = (k,d) => storage.set(`sgs_drill_${k}`, d)

export const getAllAnalyses = () => {
  const out = []
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key && key.startsWith('sgs_analyses_')) {
      try { const d = JSON.parse(localStorage.getItem(key)); if (d) out.push(d) } catch {}
    }
  }
  return out
}

export const getWeekKey = () => {
  const now = new Date()
  const d = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()))
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7))
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
  const wn = Math.ceil((((d - yearStart) / 86400000) + 1) / 7)
  return `${d.getUTCFullYear()}-${String(wn).padStart(2, '0')}`
}

export const getTodayKey = () => {
  const n = new Date()
  return `${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,'0')}-${String(n.getDate()).padStart(2,'0')}`
}

export const getCallLog  = ()  => storage.get('sgs_call_log', [])
export const saveCallLog = (d) => storage.set('sgs_call_log', d)

export const getKnowledge  = ()  => storage.get('sgs_knowledge', [])
export const saveKnowledge = (d) => storage.set('sgs_knowledge', d)

const DEFAULT_GENESIS_MODULES = [
  { id:'g1',  category:'FOUNDATION',  title:'Psychology of Buying',       desc:'Why people say yes and no. Emotion vs logic. The buying trance.',         completed:false, completedDate:null, notes:'' },
  { id:'g2',  category:'FOUNDATION',  title:'Tonality Mastery',           desc:'The 5 emotional states: confident, curious, warm, urgent, detached.',      completed:false, completedDate:null, notes:'' },
  { id:'g3',  category:'FOUNDATION',  title:'The Perfect Opener',         desc:'Pattern interrupt. First 30 seconds. Control the frame from the start.',   completed:false, completedDate:null, notes:'' },
  { id:'g4',  category:'DISCOVERY',   title:'Deep Pain Discovery',        desc:'Dig 3 levels deep. "What makes you say that?" loop. Find the real why.',   completed:false, completedDate:null, notes:'' },
  { id:'g5',  category:'DISCOVERY',   title:'Future Pacing',              desc:'Pull them into the vision of the outcome they want. Make it real.',         completed:false, completedDate:null, notes:'' },
  { id:'g6',  category:'DISCOVERY',   title:'The Gap Question',           desc:'Connect current pain to desired future. Quantify the gap in their mind.',   completed:false, completedDate:null, notes:'' },
  { id:'g7',  category:'FRAME',       title:'Frame Control',              desc:'Maintain your frame when they push back. Never break. Never chase.',        completed:false, completedDate:null, notes:'' },
  { id:'g8',  category:'FRAME',       title:'Taking the One-Up Position', desc:'You are the expert. They need you more than you need them.',                completed:false, completedDate:null, notes:'' },
  { id:'g9',  category:'OBJECTIONS',  title:'Objection Handling System',  desc:'Categorize every objection: price, timing, trust, spouse, authority.',     completed:false, completedDate:null, notes:'' },
  { id:'g10', category:'OBJECTIONS',  title:'The Price Objection',        desc:'"The money is the easiest part to figure out." Strip the frame and reset.', completed:false, completedDate:null, notes:'' },
  { id:'g11', category:'OBJECTIONS',  title:'"Let Me Think About It"',    desc:'Flush out the real objection. Never let them leave in the fog.',            completed:false, completedDate:null, notes:'' },
  { id:'g12', category:'CLOSING',     title:'Trial Closes',               desc:'Micro-commitments throughout the call. Assumptive language from the start.',completed:false, completedDate:null, notes:'' },
  { id:'g13', category:'CLOSING',     title:'The Final Close',            desc:'Assumptive close. Alternative close. Remove buyer remorse immediately.',    completed:false, completedDate:null, notes:'' },
]
export const getGenesisModules  = ()  => storage.get('sgs_genesis_modules', DEFAULT_GENESIS_MODULES)
export const saveGenesisModules = (d) => storage.set('sgs_genesis_modules', d)

export const getGenesisWeek  = ()  => storage.get('sgs_genesis_week', { skills: [], goal: '', notes: '' })
export const saveGenesisWeek = (d) => storage.set('sgs_genesis_week', d)
