import React from 'react'
import './GameMenu.css'
import { useUserContext } from '../../../hooks/useUserContext'

const GameMenu = ({ gameDifficulty, gameData }) => {
  const { selectGameMode, selectGameDifficulty } = useUserContext()

  return (
    <>
      {!gameDifficulty || gameDifficulty !== 'pending' ? (
        <div className='game-menu'>
          <h3>Select Game Mode</h3>
          <div className='menu-buttons'>
            <button
              className='btn-menu btn-gameBoard'
              onClick={() => {
                selectGameMode(gameData.modeOptions.firstMode.value)
                selectGameDifficulty('pending')
              }}
            >
              <span className='menu-icon'>
                {gameData.modeOptions.firstMode.icon}
              </span>
              <span className='menu-text'>
                {gameData.modeOptions.firstMode.text}
              </span>
            </button>
            <button
              className='btn-menu btn-gameBoard'
              onClick={() => {
                selectGameMode(gameData.modeOptions.secondMode.value)
              }}
            >
              <span className='menu-icon'>
                {gameData.modeOptions.secondMode.icon}
              </span>
              <span className='menu-text'>
                {gameData.modeOptions.secondMode.text}
              </span>
            </button>
          </div>
        </div>
      ) : (
        <div className='game-menu'>
          <h3>Select Game Difficulty</h3>
          <div className='menu-buttons'>
            <button
              className='btn-menu btn-gameBoard'
              onClick={() => {
                selectGameDifficulty('easy')
              }}
            >
              <span className='menu-icon'>
                {gameData.difficultyOptions.easy.icon}
              </span>
              <span className='menu-text'>
                {gameData.difficultyOptions.easy.text}
              </span>
            </button>
            <button
              className='btn-menu btn-gameBoard'
              onClick={() => {
                selectGameDifficulty('hard')
              }}
            >
              <span className='menu-icon'>
                {gameData.difficultyOptions.hard.icon}
              </span>
              <span className='menu-text'>
                {gameData.difficultyOptions.hard.text}
              </span>
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default GameMenu
