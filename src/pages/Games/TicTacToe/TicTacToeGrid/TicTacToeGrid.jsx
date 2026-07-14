import React from 'react'

const TicTacToeGrid = ({
  cells,
  currentPlayer,
  onCellClick,
  isFieldsDisabled
}) => {
  return (
    <div className={`tictactoe-grid current-${currentPlayer.toLowerCase()}`}>
      {cells.map((value, index) => (
        <button
          key={index}
          onClick={() => onCellClick(index)}
          disabled={isFieldsDisabled || value !== null}
          className={`tictactoe-cell ${value !== null ? `${value.toLowerCase()}` : ''}`}
        >
          {value}
        </button>
      ))}
    </div>
  )
}

export default TicTacToeGrid
