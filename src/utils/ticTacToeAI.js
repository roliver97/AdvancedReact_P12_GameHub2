import { WINNING_COMBINATIONS } from '../hooks/useTicTacToe'

const checkSimulationWinner = (board) => {
  for (const combination of WINNING_COMBINATIONS) {
    const [a, b, c] = combination
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a]
    }
  }

  if (!board.includes(null)) return 'Tie'
  return null
}

const minimax = (board, depth, isMaximizing) => {
  const score = checkSimulationWinner(board)

  if (score === 'O') return 10 - depth
  if (score === 'X') return depth - 10
  if (score === 'Tie') return 0

  if (isMaximizing) {
    let bestScore = -Infinity
    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        board[i] = 'O'
        let currentScore = minimax(board, depth + 1, false)
        board[i] = null
        bestScore = Math.max(bestScore, currentScore)
      }
    }
    return bestScore
  } else {
    let bestScore = Infinity
    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        board[i] = 'X'
        let currentScore = minimax(board, depth + 1, true)
        board[i] = null
        bestScore = Math.min(bestScore, currentScore)
      }
    }
    return bestScore
  }
}

export const findBestMove = (board) => {
  let bestScore = -Infinity
  let bestMove = null

  for (let i = 0; i < board.length; i++) {
    if (board[i] === null) {
      board[i] = 'O'
      let score = minimax(board, 0, false)
      board[i] = null

      if (score > bestScore) {
        bestScore = score
        bestMove = i
      }
    }
  }
  return bestMove
}
