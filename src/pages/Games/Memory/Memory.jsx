import React from 'react'
import './Memory.css'
import GameBoard from '../../../components/GameBoard/GameBoard'
import { GAMES_DATA } from '../../../constants/gamesData'
import { useUserContext } from '../../../hooks/useUserContext'
import GameMenu from '../../../components/GameBoard/GameMenu/GameMenu'

const Memory = () => {
  const { gameMode, gameDifficulty } = useUserContext()
  const gameData = GAMES_DATA.memory
  return (
    <GameBoard gameData={gameData}>
      {!gameMode || gameDifficulty === 'pending' || gameMode === 'pending' ? (
        <GameMenu gameDifficulty={gameDifficulty} gameData={gameData} />
      ) : (
        ''
      )}
    </GameBoard>
  )
}

export default Memory
