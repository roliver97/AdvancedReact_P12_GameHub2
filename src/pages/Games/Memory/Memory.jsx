import React from 'react'
import './Memory.css'
import GameBoard from '../../../components/GameBoard/GameBoard'
import { GAMES_DATA } from '../../../constants/gamesData'
import MemoryMenu from './MemoryMenu/MemoryMenu'

const Memory = () => {
  const gameData = GAMES_DATA.memory
  return (
    <GameBoard gameData={gameData}>
      <MemoryMenu />
    </GameBoard>
  )
}

export default Memory
