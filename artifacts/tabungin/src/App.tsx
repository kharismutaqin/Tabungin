import { useState, useEffect } from 'react'
import { GroupEntry } from './pages/GroupEntry'
import { SavingsBoard } from './pages/SavingsBoard'
import { creatorMarkerKey } from './lib/crypto'

const SESSION_KEY = 'tabungin_group_key'
const THEME_KEY   = 'tabungin_theme'

function App() {
  const [groupKey,  setGroupKey]  = useState<string | null>(null)

  useEffect(() => {
    const stored = sessionStorage.getItem(SESSION_KEY)
    if (stored) {
      setGroupKey(stored)
    }

    const theme = localStorage.getItem(THEME_KEY) || 'pink'
    if (theme !== 'pink') {
      document.body.setAttribute('data-theme', theme)
    }
  }, [])

  const handleEnter = (key: string) => {
    sessionStorage.setItem(SESSION_KEY, key)
    const flag = creatorMarkerKey(key)
    if (!localStorage.getItem(flag)) {
      localStorage.setItem(flag, 'creator')
    }
    setGroupKey(key)
  }

  const handleLogout = () => {
    sessionStorage.removeItem(SESSION_KEY)
    setGroupKey(null)
  }

  const isCreator = groupKey ? localStorage.getItem(creatorMarkerKey(groupKey)) === 'creator' : false

  if (!groupKey) return <GroupEntry onEnter={handleEnter} />
  return <SavingsBoard groupKey={groupKey} isCreator={isCreator} onLogout={handleLogout} />
}

export default App
