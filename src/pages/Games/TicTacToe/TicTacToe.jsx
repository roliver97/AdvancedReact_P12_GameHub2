import React, { useState } from 'react'
import './TicTacToe.css'
import GameBoard from '../../../components/GameBoard/GameBoard'
import { GAMES_DATA } from '../../../constants/gamesData'

const TicTacToe = () => {
  const [cells, setCells] = useState(Array(9).fill(null))
  const [isGameActive, setIsGameActive] = useState(false)
  const [currentPlayer, setCurrentPlayer] = useState('X')

  const gameData = GAMES_DATA.tictactoe

  const handleReset = () => {
    setCells(Array(9).fill(null))
    setIsGameActive(false)
    setCurrentPlayer('X')
  }
  const handleClick = (cellIndex) => {
    if (cells[cellIndex] !== null) return
    if (!isGameActive) {
      setIsGameActive(true)
    }
    const newBoard = [...cells]
    newBoard[cellIndex] = currentPlayer
    setCells(newBoard)

    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X')
  }

  return (
    <GameBoard gameData={gameData} onReset={handleReset}>
      <div className={`tictactoe-grid current-${currentPlayer.toLowerCase()}`}>
        {cells.map((value, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            className={`tictactoe-cell ${value !== null ? `${value.toLowerCase()}` : ''}`}
          >
            {value}
          </button>
        ))}
      </div>
    </GameBoard>
  )
}

export default TicTacToe
