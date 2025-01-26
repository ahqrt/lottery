import { create } from 'zustand'

interface LotteryStore {
  prizes: string[]
  participants: string[]
  history: { winner: string; prize: string }[]
  draw: () => void
  reset: () => void
}

const initialPrizes = [
  '888元',
  '666元',
  '188元',
  '188元',
  '188元',
  '88元',
  '88元',
  '88元',
  '88元',
  '88元'
]

const initialParticipants = [
  '蒙在桥',
  '孙峰',
  '刘思危',
  '杨晓',
  '房锦源',
  '李子豪',
  '曾锐鸿',
  '刘海浪',
  '朱恒丰',
  '杨立业'
]

const useLotteryStore = create<LotteryStore>((set) => ({
  prizes: initialPrizes,
  participants: initialParticipants,
  history: [],
  draw: () => {
    set((state) => {
      if (state.prizes.length === 0 || state.participants.length === 0) {
        return state
      }

      const randomPrizeIndex = Math.floor(Math.random() * state.prizes.length)
      const randomParticipantIndex = Math.floor(
        Math.random() * state.participants.length
      )

      const winner = state.participants[randomParticipantIndex]
      const prize = state.prizes[randomPrizeIndex]

      return {
        prizes: state.prizes.filter((_, i) => i !== randomPrizeIndex),
        participants: state.participants.filter((_, i) => i !== randomParticipantIndex),
        history: [...state.history, { winner, prize }]
      }
    })
  },
  reset: () => {
    set({
      prizes: initialPrizes,
      participants: initialParticipants,
      history: []
    })
  }
}))

export default useLotteryStore
