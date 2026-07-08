import React from 'react'
import './TicTacToeGrid.css'

const TicTacToeGrid = ({ cells, currentPlayer, onCellClick }) => {
  return (
    <div className={`tictactoe-grid current-${currentPlayer.toLowerCase()}`}>
      {cells.map((value, index) => (
        <button
          key={index}
          onClick={() => onCellClick(index)}
          className={`tictactoe-cell ${value !== null ? `${value.toLowerCase()}` : ''}`}
        >
          {value}
        </button>
      ))}
    </div>
  )
}

export default TicTacToeGrid
