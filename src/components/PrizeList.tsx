import { motion } from 'framer-motion'
import useLotteryStore from '../store'

export default function PrizeList() {
  const { prizes } = useLotteryStore()

  return (
    <motion.div
      className="glass-effect rounded-2xl p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h2 className="text-xl font-semibold mb-4">奖品列表</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {prizes.map((prize, index) => (
          <motion.div
            key={index}
            className="p-4 rounded-lg bg-white/50 backdrop-blur-sm shadow-sm"
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full" />
              <span>{prize}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
