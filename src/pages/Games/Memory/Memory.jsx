import React from 'react'
import './Memory.css'
import GameBoard from '../../../components/GameBoard/GameBoard'
import { GAMES_DATA } from '../../../constants/gamesData'
import { useUserContext } from '../../../hooks/useUserContext'
import GameMenu from '../../../components/GameBoard/GameMenu/GameMenu'
import ScoreBoard from '../../../components/GameBoard/ScoreBoard/ScoreBoard'
import MemoryGrid from './MemoryGrid/MemoryGrid'
import useMemory from '../../../hooks/useMemory'
import GameOverlay from '../../../components/GameBoard/GameOverlay/GameOverlay'
import Timer from '../../../components/GameBoard/Timer/Timer'

const TIMER_BY_DIFFICULTY = {
  easy: 60,
  hard: 45
}

const Memory = () => {
  const gameData = GAMES_DATA.memory
  const {
    cards,
    handleReset,
    handleClick,
    handleTimeOut,
    moves,
    matches,
    isGameActive
  } = useMemory()
  const { gameMode, gameDifficulty } = useUserContext()

  console.log(
    'GameMode:',
    gameMode,
    ' and GameDifficulty:',
    gameDifficulty,
    ' and cards number are:',
    cards
  )

  const initialTime = TIMER_BY_DIFFICULTY[gameDifficulty] || 0

  const totalPairs = cards.length / 2
  const isTimeOut = !isGameActive && moves > 0 && matches < totalPairs

  let scoreboardData =
    gameMode === 'memo-timeAttack'
      ? [
          { label: 'Moves', value: moves, className: 'memo-moves' },
          { label: 'Matches', value: matches, className: 'memo-matches' },
          {
            label: 'Time',
            value: (
              <Timer
                key={`${gameDifficulty}-${cards[0]?.uniqueId || 'empty'}`}
                //? Usamos key para reiniciar el componente Timer si cambia alguno de estos estados y evitar un useEffect interno que cree rerenderizados innecesarios
                //? Sin este key (o sin el reinicializado de Timer) el cronómetro se quedaría clavado en 0 al reiniciar la partida o al cambiar la dificultad
                initialTime={initialTime}
                isGameActive={isGameActive}
                onTimeOut={handleTimeOut}
              />
            ),
            className: 'memo-time'
          },
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
          {isTimeOut && <GameOverlay onReset={handleReset} />}
        </>
      )}
    </GameBoard>
  )
}

export default Memory
