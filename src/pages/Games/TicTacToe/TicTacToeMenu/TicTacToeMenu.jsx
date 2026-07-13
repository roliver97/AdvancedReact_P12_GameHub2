import React from 'react'
import './TicTacToeMenu.css'
import { useUserContext } from '../../../../hooks/useUserContext'

const TicTacToeMenu = ({ gameDifficulty, onResetScoreboard }) => {
  const { lastGameModePlayed, selectGameMode, selectGameDifficulty } =
    useUserContext()

  return (
    <>
      {!gameDifficulty || gameDifficulty !== 'pending' ? (
        <div className='tictactoe-menu'>
          <h3>Select Game Mode</h3>
          <div className='menu-buttons'>
            <button
              className='btn-menu'
              onClick={() => {
                selectGameMode('1P')
                selectGameDifficulty('pending')
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
                selectGameMode('2P')
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
                selectGameDifficulty('easy')
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
                selectGameDifficulty('hard')
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
