import React, { useEffect, useState } from 'react'
import { useUserContext } from './useUserContext'

const WINNING_COMBINATIONS = [
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
  const [gameMode, setGameMode] = useState(null) // null = Menú inicial / '1P' = vs CPU / '2P' = 1vs1
  const [gameDifficulty, setGameDifficulty] = useState(null) // for Player vs CPU === easy or hard
  const [lastGameModePlayed, setLastGameModePlayed] = useState(null)

  const [cells, setCells] = useState(Array(9).fill(null))
  const [isGameActive, setIsGameActive] = useState(false)
  const [currentPlayer, setCurrentPlayer] = useState('X')
  const [winner, setWinner] = useState(null)
  const [scores, setScores] = useState({
    xWins: 0,
    oWins: 0,
    draws: 0
  })
  const { saveGameResults } = useUserContext()

  const selectGameMode = (mode) => {
    setGameMode(mode)
    setLastGameModePlayed(mode)
    handleReset()
  }

  const selectGameDifficulty = (difficulty) => {
    setGameDifficulty(difficulty)
  }

  const changeGameMode = () => {
    setGameMode('pending')
    setGameDifficulty(null)

    setCells(Array(9).fill(null))
    setIsGameActive(false)
    setWinner(null)
  }

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

  const handleReset = () => {
    setCells(Array(9).fill(null))
    setIsGameActive(false)
    setCurrentPlayer(null)
    setWinner(null)

    const options = ['X', 'O']
    const firstPlayer = options[Math.floor(Math.random() * options.length)]
    setCurrentPlayer(firstPlayer)
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
      if (gameWinner === 'X') {
        saveGameResults('tictactoe', 100)
      } else if (gameWinner === 'Tie') {
        saveGameResults('tictactoe', 20)
      }
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X')
    }
  }

  useEffect(() => {
    if (gameMode !== '1P' || currentPlayer !== 'O' || winner) return

    const availableCells = cells
      .map((cell, index) => (cell === null ? index : null))
      .filter((value) => value !== null)

    if (availableCells.length === 0) return

    if (gameDifficulty === 'easy') {
      const randomIndex =
        availableCells[Math.floor(Math.random() * availableCells.length)]

      const timer = setTimeout(() => {
        handleClick(randomIndex)
      }, 600)

      return () => clearTimeout(timer)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPlayer, gameMode, winner, cells])

  return {
    gameMode,
    lastGameModePlayed,
    selectGameMode,
    gameDifficulty,
    selectGameDifficulty,
    changeGameMode,
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
