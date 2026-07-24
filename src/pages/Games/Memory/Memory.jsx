import React from 'react'
import './Memory.css'
import GameBoard from '../../../components/GameBoard/GameBoard'
import { GAMES_DATA } from '../../../constants/gamesData'
import { useGameContext } from '../../../hooks/useGameContext'
import GameMenu from '../../../components/GameBoard/GameMenu/GameMenu'
import ScoreBoard from '../../../components/GameBoard/ScoreBoard/ScoreBoard'
import MemoryGrid from './MemoryGrid/MemoryGrid'
import useMemory from '../../../hooks/useMemory'
import GameOverlay from '../../../components/GameBoard/GameOverlay/GameOverlay'
import Timer from '../../../components/GameBoard/Timer/Timer'
import { formatTime } from '../../../utils/formatTime'

const Memory = () => {
  console.log('RENDER PAGE <Memory/>')

  const gameData = GAMES_DATA.memory
  const {
    cards,
    handleReset,
    handleClick,
    handleTimeOut,
    moves,
    winner,
    matches,
    isGameActive,
    TIMER_BY_DIFFICULTY
  } = useMemory()
  const { gameMode, gameDifficulty, gamesStats, resetBestTime } =
    useGameContext()

  const initialTime = TIMER_BY_DIFFICULTY[gameDifficulty] || 0
  const memoryStats = gamesStats.find((game) => game.id === 'memory')
  const currentBestTime = memoryStats?.bestTime?.[gameDifficulty] ?? null

  const gameOverStatus = winner ? 'win' : 'timeout'

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
          {
            label: 'Best Time',
            value:
              currentBestTime !== null ? formatTime(currentBestTime) : '--:--',
            className: 'memo-bestTime'
          }
        ]
      : [
          { label: 'Moves', value: moves, className: 'memo-moves' },
          { label: 'Matches', value: matches, className: 'memo-matches' }
        ]

  const handleResetScoreboard = () => {
    ;(resetBestTime('memory', gameDifficulty), handleReset())
  }

  return (
    <GameBoard
      gameData={gameData}
      onReset={handleReset}
      onResetScoreboard={handleResetScoreboard}
    >
      {!gameMode || gameDifficulty === 'pending' ? (
        <GameMenu gameDifficulty={gameDifficulty} gameData={gameData} />
      ) : (
        <>
          <ScoreBoard data={scoreboardData} />
          <MemoryGrid cards={cards} onCardClick={handleClick} />
          {winner !== null && (
            <GameOverlay
              onReset={handleReset}
              gameOverStatus={gameOverStatus}
            />
          )}
        </>
      )}
    </GameBoard>
  )
}

export default Memory
