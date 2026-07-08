import React from 'react'
import './TicTacToe.css'
import GameBoard from '../../../components/GameBoard/GameBoard'
import { GAMES_DATA } from '../../../constants/gamesData'
import useTicTacToe from '../../../hooks/useTicTacToe'
import ScoreBoard from '../../../components/GameBoard/ScoreBoard/ScoreBoard'
import StatusBanner from '../../../components/GameBoard/StatusBanner/StatusBanner'
import TicTacToeMenu from './TicTacToeMenu/TicTacToeMenu'
import TicTacToeGrid from './TicTacToeGrid/TicTacToeGrid'

const TicTacToe = () => {
  const gameData = GAMES_DATA.tictactoe
  const {
    gameMode,
    selectGameMode,
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

  //! Los archivos .jsx (React) nos permiten guardar código HTML directamente dentro de una variable
  let statusContent = (
    <>
      Current Player:{' '}
      <span className={`player-highlight ${currentPlayer.toLowerCase()}`}>
        {currentPlayer}
      </span>
    </>
  )
  let bannerClass = `current-${currentPlayer.toLowerCase()}`

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
    >
      {!gameMode ? (
        <TicTacToeMenu onSelectMode={selectGameMode} />
      ) : (
        <>
          <ScoreBoard data={scoreboardData} />
          <StatusBanner content={statusContent} bannerClassName={bannerClass} />

          <TicTacToeGrid
            cells={cells}
            currentPlayer={currentPlayer}
            onCellClick={handleClick}
          />
        </>
      )}
    </GameBoard>
  )
}

export default TicTacToe
