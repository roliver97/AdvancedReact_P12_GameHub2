import React, { useEffect, useState } from 'react'
import { useUserContext } from './useUserContext'
import { findBestMove } from '../utils/ticTacToeAI'

export const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

const useTicTacToe = () => {
  const [cells, setCells] = useState(Array(9).fill(null))
  const [isGameActive, setIsGameActive] = useState(false)
  const [currentPlayer, setCurrentPlayer] = useState('X')
  const [winner, setWinner] = useState(null)
  const [scores, setScores] = useState({
    xWins: 0,
    oWins: 0,
    draws: 0
  })
  const { gameMode, gameDifficulty, saveGameResults } = useUserContext()

  const checkWinner = (board) => {
    for (const combination of WINNING_COMBINATIONS) {
      const [a, b, c] = combination
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a]
      }
    }

    if (!board.includes(null)) {
      return 'Tie'
    }

    return null
  }

  const randomizeFirstPlayer = () => {
    const options = ['X', 'O']
    const firstPlayer = options[Math.floor(Math.random() * options.length)]
    setCurrentPlayer(firstPlayer)
  }

  const handleReset = () => {
    setCells(Array(9).fill(null))
    setIsGameActive(false)
    setCurrentPlayer(null)
    setWinner(null)

    randomizeFirstPlayer()
  }

  const handleResetScoreboard = () => {
    handleReset()
    setScores({ xWins: 0, oWins: 0, draws: 0 })
  }

  const handleClick = (cellIndex) => {
    if (cells[cellIndex] !== null || winner) return
    if (!isGameActive) {
      setIsGameActive(true)
    }
    const newBoard = [...cells]
    newBoard[cellIndex] = currentPlayer
    setCells(newBoard)

    const gameWinner = checkWinner(newBoard)

    if (gameWinner) {
      setWinner(gameWinner)
      setIsGameActive(false)
      setScores((prevScores) => {
        if (gameWinner === 'X')
          return { ...prevScores, xWins: prevScores.xWins + 1 }
        if (gameWinner === 'O')
          return { ...prevScores, oWins: prevScores.oWins + 1 }
        return { ...prevScores, draws: prevScores.draws + 1 }
      })
      if (gameWinner === 'X' && gameDifficulty === 'easy') {
        saveGameResults('tictactoe', 100)
      } else if (gameWinner === 'X' && gameDifficulty === 'hard') {
        saveGameResults('tictactoe', 150)
      } else if (gameWinner === 'Tie') {
        saveGameResults('tictactoe', 20)
      }
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X')
    }
  }

  useEffect(() => {
    if (gameMode !== 'tictactoe-1P' || currentPlayer !== 'O' || winner) return

    const availableCells = cells
      .map((cell, index) => (cell === null ? index : null))
      .filter((value) => value !== null)

    if (availableCells.length === 0) return

    let nextMoveIndex = null
    const randomMove =
      availableCells[Math.floor(Math.random() * availableCells.length)]

    if (gameDifficulty === 'easy') {
      nextMoveIndex = randomMove
    } else if (gameDifficulty === 'hard') {
      const shouldPlayPerfect = Math.random() < 0.85 // Un 80% de probabilidad
      if (shouldPlayPerfect) {
        nextMoveIndex = findBestMove([...cells])
      } else {
        nextMoveIndex = randomMove
      }
    }

    if (nextMoveIndex !== null) {
      const timer = setTimeout(() => {
        handleClick(nextMoveIndex)
      }, 600)

      return () => clearTimeout(timer)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPlayer, gameMode, gameDifficulty, winner, cells])

  return {
    cells,
    isGameActive,
    currentPlayer,
    winner,
    scores,
    handleClick,
    handleReset,
    handleResetScoreboard
  }
}

export default useTicTacToe
