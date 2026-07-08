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
    lastGameModePlayed,
    selectGameMode,
    gameDifficulty,
    selectGameDifficulty,
    changeGameMode,
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

  const isBoardDisabled = gameMode === '1P' && currentPlayer === 'O'

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

  console.log('game mode', gameMode)
  console.log('last game mode', lastGameModePlayed)
  console.log('game difficulty', gameDifficulty)

  return (
    <GameBoard
      gameData={gameData}
      onReset={handleReset}
      onResetScoreboard={handleResetScoreboard}
      onChangeMode={changeGameMode}
    >
      {!gameMode || gameDifficulty === 'pending' || gameMode === 'pending' ? (
        <TicTacToeMenu
          lastGameModePlayed={lastGameModePlayed}
          onSelectMode={selectGameMode}
          gameDifficulty={gameDifficulty}
          onSelectDifficulty={selectGameDifficulty}
          onResetScoreboard={handleResetScoreboard}
        />
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
