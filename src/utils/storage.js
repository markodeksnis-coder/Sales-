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
