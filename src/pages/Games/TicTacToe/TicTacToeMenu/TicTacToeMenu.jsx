import React from 'react'
import './TicTacToeMenu.css'

const TicTacToeMenu = ({ onSelectMode }) => {
  return (
    <div className='tictactoe-menu'>
      <h3>Select Game Mode</h3>
      <div className='menu-buttons'>
        <button className='btn-menu' onClick={() => onSelectMode('1P')}>
          <span className='menu-icon'>🤖</span>
          <span className='menu-text'>1 Player (vs CPU)</span>
        </button>
        <button className='btn-menu' onClick={() => onSelectMode('2P')}>
          <span className='menu-icon'>👥</span>
          <span className='menu-text'>2 Players (Local)</span>
        </button>
      </div>
    </div>
  )
}

export default TicTacToeMenu
