import React from 'react'
import './GameOverlay.css'

const GameOverlay = ({ onReset }) => {
  return (
    <div className='game-over-overlay'>
      <h2 className='game-over-title'>⏰ Time's up!</h2>
      <button className='btn-try-again' onClick={onReset}>
        Try Again 🔁
      </button>
    </div>
  )
}

export default GameOverlay
