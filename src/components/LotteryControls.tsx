import { motion } from 'framer-motion'
import useLotteryStore from '../store'

interface LotteryControlsProps {
  isDrawing: boolean
  setIsDrawing: (drawing: boolean) => void
}

export default function LotteryControls({ isDrawing, setIsDrawing }: LotteryControlsProps) {
  const { draw, reset, prizes, participants } = useLotteryStore()

  const handleDraw = () => {
    setIsDrawing(true)
    setTimeout(() => {
      draw()
      setIsDrawing(false)
    }, 2000)
  }

  return (
    <motion.div
      className="glass-effect rounded-2xl p-6 space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center space-y-2">
        <h2 className="text-xl font-semibold">抽奖控制</h2>
        <p className="text-sm text-gray-600">
          剩余奖品: {prizes.length} | 剩余参与者: {participants.length}
        </p>
      </div>
      <div className="flex justify-center gap-4">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleDraw}
          disabled={isDrawing || prizes.length === 0 || participants.length === 0}
          className="bg-primary text-white px-6 py-2 rounded-full disabled:opacity-50"
        >
          {isDrawing ? '抽奖中...' : '开始抽奖'}
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={reset}
          className="bg-gray-500 text-white px-6 py-2 rounded-full"
        >
          重置
        </motion.button>
      </div>
    </motion.div>
  )
}
