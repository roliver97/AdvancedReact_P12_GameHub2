import React from 'react'
import './GameBoard.css'

const GameBoard = ({ gameData, onReset, children }) => {
  return (
    <div className='game-layout'>
      <div className='game-header'>
        <div className='game-title-container'>
          <img className='game-icon' src={gameData.icon} />
          <h2>{gameData.name}</h2>
        </div>
        <p>{gameData.subtitle}</p>
      </div>
      <div className='game-board'>{children}</div>
      <div className='game-footer'>
        <div className='game-controls'>
          {' '}
          <button onClick={onReset} className='btn-reset-game'>
            Reset Game
          </button>
        </div>
        <div className='game-instructions'>
          <h4>How To Play</h4>
          <ol>
            {gameData.howToPlay.map((value, index) => (
              <li className='instruction-item' key={index}>
                {value}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  )
}

export default GameBoard
