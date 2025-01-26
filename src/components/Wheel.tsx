import { motion, useAnimation } from 'framer-motion'
import { useEffect, useState } from 'react'
import useLotteryStore from '../store'

const colors = [
  '#FF6B6B',
  '#4ECDC4',
  '#FFE66D',
  '#45B7D5',
  '#D4A5A5',
  '#9BC53D',
  '#F45B69',
  '#6B5B95',
  '#88D8B0',
  '#FFCC5C'
]

export default function Wheel() {
  const { prizes, participants, draw, history } = useLotteryStore()
  const [isSpinning, setIsSpinning] = useState(false)
  const controls = useAnimation()
  const [winnerIndex, setWinnerIndex] = useState<number | null>(null)
  const [showWinner, setShowWinner] = useState(false)

  const handleSpin = async () => {
    if (isSpinning || prizes.length === 0 || participants.length === 0) return
    
    setIsSpinning(true)
    setShowWinner(false)
    const randomSpins = Math.floor(Math.random() * 5) + 5
    const totalDegrees = 360 * randomSpins
    const segmentAngle = 360 / prizes.length
    const randomOffset = Math.random() * segmentAngle
    
    // Calculate winner index before spinning
    const winnerIdx = Math.floor(Math.random() * prizes.length)
    setWinnerIndex(winnerIdx)
    
    // Calculate final rotation
    const finalRotation = totalDegrees + (winnerIdx * segmentAngle) + randomOffset
    
    await controls.start({
      rotate: finalRotation,
      transition: {
        duration: 5,
        ease: [0.16, 1, 0.3, 1]
      }
    })
    
    // After animation completes
    draw()
    setIsSpinning(false)
    setShowWinner(true)
  }

  useEffect(() => {
    if (showWinner) {
      const timer = setTimeout(() => {
        setShowWinner(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [showWinner])

  const latestWinner = history.length > 0 ? history[history.length - 1] : null

  return (
    <div className="relative w-full max-w-[500px] mx-auto">
      {/* Wheel Container */}
      <div className="relative w-full aspect-square">
        {/* Wheel */}
        <motion.div
          animate={controls}
          className="w-full h-full rounded-full relative overflow-hidden"
          style={{
            background: `conic-gradient(
              ${colors.slice(0, prizes.length).map((color, i) => 
                `${color} ${(360 / prizes.length) * i}deg ${(360 / prizes.length) * (i + 1)}deg`
              ).join(', ')}
            )`,
            boxShadow: '0 0 20px rgba(0,0,0,0.2)'
          }}
        >
          {/* Labels */}
          {prizes.map((prize, index) => (
            <div
              key={index}
              className="absolute top-0 left-1/2 h-1/2 origin-bottom"
              style={{
                transform: `rotate(${(360 / prizes.length) * index + (360 / prizes.length / 2)}deg)`
              }}
            >
              <div
                className="text-white text-sm font-medium absolute top-4"
                style={{
                  transform: 'translateX(-50%) rotate(90deg)',
                  whiteSpace: 'nowrap'
                }}
              >
                {prize}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Center Circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
            <span className="text-white text-lg font-bold">抽</span>
          </div>
        </div>

        {/* Pointer */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 
          border-l-[20px] border-l-transparent 
          border-r-[20px] border-r-transparent 
          border-t-[40px] border-t-primary" />
      </div>

      {/* Spin Button */}
      <div className="mt-8 text-center">
        <button
          onClick={handleSpin}
          disabled={isSpinning || prizes.length === 0 || participants.length === 0}
          className="bg-primary text-white px-8 py-3 rounded-full text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSpinning ? '抽奖中...' : '开始抽奖'}
        </button>
      </div>

      {/* Winner Display */}
      {showWinner && latestWinner && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 p-6 bg-white rounded-lg shadow-lg text-center"
        >
          <h3 className="text-xl font-bold mb-2">恭喜中奖！</h3>
          <p className="text-lg">
            <span className="text-primary font-medium">{latestWinner.winner}</span> 获得了{' '}
            <span className="text-primary font-medium">{latestWinner.prize}</span>
          </p>
        </motion.div>
      )}
    </div>
  )
}
