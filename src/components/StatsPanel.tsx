import { motion } from 'framer-motion'
import useLotteryStore from '../store'

export default function StatsPanel() {
  const { prizes, participants, history } = useLotteryStore()

  return (
    <motion.div
      className="glass-effect rounded-2xl p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
    >
      <h2 className="text-xl font-semibold mb-4">统计信息</h2>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>剩余奖品</span>
          <span>{prizes.length}</span>
        </div>
        <div className="flex justify-between">
          <span>剩余参与者</span>
          <span>{participants.length}</span>
        </div>
        <div className="flex justify-between">
          <span>已抽奖次数</span>
          <span>{history.length}</span>
        </div>
      </div>
    </motion.div>
  )
}
