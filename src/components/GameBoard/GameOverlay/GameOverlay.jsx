import React from 'react'
import './GameOverlay.css'

const OVERLAY_TITLES = {
  timeout: "⏰ Time's up!",
  win: '🏅 You Win!'
}

const GameOverlay = ({ onReset, gameOverStatus }) => {
  return (
    <div className={`game-over-overlay modal-overlay ${gameOverStatus}`}>
      <div className={`modal-content`}>
        <h2 className='game-over-title'>
          {OVERLAY_TITLES[gameOverStatus] ?? '🎮 Game Over'}
        </h2>
        <button className='btn-try-again btn-gameBoard' onClick={onReset}>
          Try Again 🔁
        </button>
      </div>
    </div>
  )
}

export default GameOverlay
