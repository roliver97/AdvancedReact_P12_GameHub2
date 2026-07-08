import React from 'react'
import './TicTacToeMenu.css'

const TicTacToeMenu = ({
  lastGameModePlayed,
  onSelectMode,
  gameDifficulty,
  onSelectDifficulty,
  onResetScoreboard
}) => {
  return (
    <>
      {!gameDifficulty || gameDifficulty !== 'pending' ? (
        <div className='tictactoe-menu'>
          <h3>Select Game Mode</h3>
          <div className='menu-buttons'>
            <button
              className='btn-menu'
              onClick={() => {
                onSelectMode('1P')
                onSelectDifficulty('pending')
              }}
            >
              <span className='menu-icon'>🤖</span>
              <span className='menu-text'>1 Player (vs CPU)</span>
            </button>
            <button
              className='btn-menu'
              onClick={() => {
                if (lastGameModePlayed !== '2P') {
                  onResetScoreboard()
                }
                onSelectMode('2P')
              }}
            >
              <span className='menu-icon'>👥</span>
              <span className='menu-text'>2 Players (Local)</span>
            </button>
          </div>
        </div>
      ) : (
        <div className='tictactoe-menu'>
          <h3>Select Game Difficulty</h3>
          <div className='menu-buttons'>
            <button
              className='btn-menu'
              onClick={() => {
                if (lastGameModePlayed !== '1P') {
                  onResetScoreboard()
                }
                onSelectDifficulty('easy')
              }}
            >
              <span className='menu-icon'>🟩</span>
              <span className='menu-text'>Easy</span>
            </button>
            <button
              className='btn-menu'
              onClick={() => {
                if (lastGameModePlayed !== '1P') {
                  onResetScoreboard()
                }
                onSelectDifficulty('hard')
              }}
            >
              <span className='menu-icon'>🟥</span>
              <span className='menu-text'>Hard</span>
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default TicTacToeMenu
