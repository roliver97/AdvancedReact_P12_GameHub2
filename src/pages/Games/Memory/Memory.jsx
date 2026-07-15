import React from 'react'
import './Memory.css'
import GameBoard from '../../../components/GameBoard/GameBoard'
import { GAMES_DATA } from '../../../constants/gamesData'
import { useUserContext } from '../../../hooks/useUserContext'
import GameMenu from '../../../components/GameBoard/GameMenu/GameMenu'
import ScoreBoard from '../../../components/GameBoard/ScoreBoard/ScoreBoard'
import MemoryGrid from './MemoryGrid/MemoryGrid'
import useMemory from '../../../hooks/useMemory'

const Memory = () => {
  const gameData = GAMES_DATA.memory
  const { cards, handleReset, handleClick } = useMemory()
  const { gameMode, gameDifficulty } = useUserContext()

  console.log(
    'GameMode:',
    gameMode,
    ' and GameDifficulty:',
    gameDifficulty,
    ' and cards number are:',
    cards
  )

  let scoreboardData =
    gameMode === 'memo-timeAttack'
      ? [
          { label: 'Moves', value: '?', className: 'memo-moves' },
          { label: 'Matches', value: '?', className: 'memo-matches' },
          { label: 'Time', value: '?', className: 'memo-time' },
          { label: 'Best Time', value: '?', className: 'memo-bestTime' }
        ]
      : [
          { label: 'Moves', value: '?', className: 'memo-moves' },
          { label: 'Matches', value: '?', className: 'memo-matches' }
        ]

  return (
    <GameBoard gameData={gameData} onReset={handleReset}>
      {!gameMode || gameDifficulty === 'pending' ? (
        <GameMenu gameDifficulty={gameDifficulty} gameData={gameData} />
      ) : (
        <>
          <ScoreBoard data={scoreboardData} />
          <MemoryGrid cards={cards} onCardClick={handleClick} />
        </>
      )}
    </GameBoard>
  )
}

export default Memory
