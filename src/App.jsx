import { useState } from 'react'
import Layout from './components/Layout'
import Today from './pages/Today'
import Calls from './pages/Calls'
import Insights from './pages/Insights'
import Drills from './pages/Drills'
import Settings from './pages/Settings'
import CallLog from './pages/CallLog'
import Genesis from './pages/Genesis'
import Knowledge from './pages/Knowledge'

export default function App() {
  const [page, setPage] = useState('today')
  const pages = {
    today:     <Today setPage={setPage} />,
    calls:     <Calls />,
    insights:  <Insights />,
    drills:    <Drills />,
    calllog:   <CallLog />,
    genesis:   <Genesis />,
    knowledge: <Knowledge />,
    settings:  <Settings />,
  }
  return (
    <div style={{ backgroundColor: '#020c1a', minHeight: '100vh' }}>
      <Layout page={page} setPage={setPage}>
        {pages[page]}
      </Layout>
    </div>
  )
}
