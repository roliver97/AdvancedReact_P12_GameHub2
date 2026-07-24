import React from 'react'
import './TicTacToe.css'
import GameBoard from '../../../components/GameBoard/GameBoard'
import { GAMES_DATA } from '../../../constants/gamesData'
import useTicTacToe from '../../../hooks/useTicTacToe'
import ScoreBoard from '../../../components/GameBoard/ScoreBoard/ScoreBoard'
import StatusBanner from '../../../components/GameBoard/StatusBanner/StatusBanner'
import TicTacToeGrid from './TicTacToeGrid/TicTacToeGrid'
import { useGameContext } from '../../../hooks/useGameContext'
import GameMenu from '../../../components/GameBoard/GameMenu/GameMenu'

const TicTacToe = () => {
  const gameData = GAMES_DATA.tictactoe
  const { gameMode, gameDifficulty, changeGameMode } = useGameContext()
  const {
    cells,
    currentPlayer,
    winner,
    scores,
    handleClick,
    handleReset,
    handleResetScoreboard
  } = useTicTacToe()

  const scoreboardData = [
    { label: 'X Wins', value: scores.xWins, className: 'x-wins' },
    { label: 'Draws', value: scores.draws, className: 'draws' },
    { label: 'O Wins', value: scores.oWins, className: 'o-wins' }
  ]

  const isBoardDisabled = gameMode === 'tictactoe-1P' && currentPlayer === 'O'

  //! Los archivos .jsx (React) nos permiten guardar código HTML directamente dentro de una variable
  let statusContent = currentPlayer ? (
    <>
      Current Player:{' '}
      <span className={`player-highlight ${currentPlayer.toLowerCase()}`}>
        {currentPlayer}
      </span>
    </>
  ) : null
  let bannerClass = currentPlayer
    ? `current-${currentPlayer.toLowerCase()}`
    : ''

  if (winner) {
    if (winner === 'Tie') {
      statusContent = <>It's a tie! 🤝</>
      bannerClass = 'game-over tie'
    } else {
      statusContent = (
        <>
          Player
          <span className={`player-highlight ${winner.toLowerCase()}`}>
            {winner}
          </span>{' '}
          wins! 👑
        </>
      )
      bannerClass = `game-over winner-${winner.toLowerCase()}`
    }
  }

  return (
    <GameBoard
      gameData={gameData}
      onReset={handleReset}
      onResetScoreboard={handleResetScoreboard}
      onChangeMode={() => {
        changeGameMode(handleReset)
        handleResetScoreboard()
      }}
    >
      {!gameMode || gameDifficulty === 'pending' || gameMode === 'pending' ? (
        <GameMenu gameDifficulty={gameDifficulty} gameData={gameData} />
      ) : (
        <>
          <ScoreBoard data={scoreboardData} />
          <StatusBanner content={statusContent} bannerClassName={bannerClass} />

          <TicTacToeGrid
            cells={cells}
            currentPlayer={currentPlayer}
            onCellClick={handleClick}
            isFieldsDisabled={isBoardDisabled}
          />
        </>
      )}
    </GameBoard>
  )
}

export default TicTacToe
