import React from 'react'
import './TicTacToe.css'
import GameBoard from '../../../components/GameBoard/GameBoard'
import { GAMES_DATA } from '../../../constants/gamesData'
import useTicTacToe from '../../../hooks/useTicTacToe'
import ScoreBoard from '../../../components/GameBoard/ScoreBoard/ScoreBoard'
import StatusBanner from '../../../components/GameBoard/StatusBanner/StatusBanner'

const TicTacToe = () => {
  const gameData = GAMES_DATA.tictactoe
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
      <ScoreBoard data={scoreboardData} />
      <StatusBanner content={statusContent} bannerClassName={bannerClass} />

      <div className={`tictactoe-grid current-${currentPlayer.toLowerCase()}`}>
        {cells.map((value, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            className={`tictactoe-cell ${value !== null ? `${value.toLowerCase()}` : ''}`}
          >
            {value}
          </button>
        ))}
      </div>
    </GameBoard>
  )
}

export default TicTacToe
