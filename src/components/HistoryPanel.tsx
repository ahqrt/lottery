import { motion } from 'framer-motion'
import useLotteryStore from '../store'

export default function HistoryPanel() {
  const { history } = useLotteryStore()

  return (
    <motion.div
      className="glass-effect rounded-2xl p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      <h2 className="text-xl font-semibold mb-4">中奖历史</h2>
      <div className="space-y-2">
        {history.map((record, index) => (
          <motion.div
            key={index}
            className="p-3 rounded-lg bg-white/50 backdrop-blur-sm shadow-sm"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="flex justify-between">
              <span>{record.winner}</span>
              <span className="text-primary">{record.prize}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
