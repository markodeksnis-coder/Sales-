import { useState } from 'react'
import Layout from './components/Layout'
import StreakBar from './components/StreakBar'
import Today from './pages/Today'
import Calls from './pages/Calls'
import Insights from './pages/Insights'
import Drills from './pages/Drills'
import Settings from './pages/Settings'

export default function App() {
  const [page, setPage] = useState('today')

  const pages = {
    today:    <Today setPage={setPage} />,
    calls:    <Calls />,
    insights: <Insights />,
    drills:   <Drills />,
    settings: <Settings />,
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0a0a0a' }}>
      <StreakBar />
      <Layout page={page} setPage={setPage}>
        {pages[page]}
      </Layout>
    </div>
  )
}
