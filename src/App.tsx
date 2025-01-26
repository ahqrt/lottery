import { useState } from 'react'
import LotteryStore from './store'
import Wheel from './components/Wheel'
import HistoryPanel from './components/HistoryPanel'
import StatsPanel from './components/StatsPanel'

export default function App() {
  const [isDrawing, setIsDrawing] = useState(false)

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Wheel />
        </div>
        <div className="space-y-8">
          <HistoryPanel />
          <StatsPanel />
        </div>
      </div>
    </div>
  )
}
