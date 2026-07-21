import React, { useCallback, useEffect, useReducer } from 'react'
import { GAMES_DATA } from '../constants/gamesData'
import { useUserContext } from './useUserContext'

const initialState = {
  cards: [],
  moves: 0,
  matches: 0,
  isGameActive: false,
  winner: null
}

const memoryReducer = (state, action) => {
  switch (action.type) {
    case 'INITIALIZE_GAME':
      return {
        cards: action.payload.cardsShuffled,
        moves: 0,
        matches: 0,
        isGameActive: false,
        winner: null
      }

    case 'START_GAME':
      return {
        ...state,
        isGameActive: true
      }

    case 'FLIP_CARD': {
      const cardIndex = action.payload
      const clickedCard = state.cards[cardIndex]

      if (clickedCard.isFlipped) return state

      const waitingCardIndex = state.cards.findIndex(
        (card) => card.isFlipped && !card.isMatched
      )

      const newCards = [...state.cards]

      if (waitingCardIndex === -1) {
        //! Si no encuentra ninguna, findIndex devuelve -1
        //* Entonces, esto significa que no hay una primera carta esperando...
        newCards[cardIndex] = { ...clickedCard, isFlipped: true }
        return {
          ...state,
          cards: newCards
        }
      }

      newCards[cardIndex] = { ...clickedCard, isFlipped: true }

      const isMatch = newCards[waitingCardIndex].id === clickedCard.id

      if (isMatch) {
        newCards[cardIndex].isMatched = true
        newCards[waitingCardIndex] = {
          ...newCards[waitingCardIndex],
          isMatched: true
        }

        return {
          ...state,
          moves: state.moves + 1,
          matches: state.matches + 1,
          cards: newCards
        }
      } else {
        return {
          ...state,
          moves: state.moves + 1,
          cards: newCards
        }
      }
    }

    case 'UNFLIP_CARDS': {
      const resetedCards = state.cards.map((card) =>
        card.isMatched ? card : { ...card, isFlipped: false }
      )
      return {
        ...state,
        cards: resetedCards
      }
    }

    case 'GAME_OVER': {
      const isWinner = action.payload

      return {
        ...state,
        isGameActive: false,
        winner: isWinner ?? false
      }
    }

    default:
      return state
  }
}

const useMemory = () => {
  const [gameState, dispatch] = useReducer(memoryReducer, initialState)
  const { gameDifficulty, gameMode, saveGameResults } = useUserContext()

  const initializeGame = () => {
    const catalog = GAMES_DATA.memory.cardsCatalog
    const randomizedCatalog = [...catalog].sort(() => Math.random() - 0.5)

    const cardsNeeded =
      gameDifficulty === 'hard' || gameMode === 'memo-zenMode' ? 12 : 6
    const selectedCards = randomizedCatalog.slice(0, cardsNeeded)

    const duplicatedCards = [...selectedCards, ...selectedCards].map(
      (card, index) => ({
        ...card,
        uniqueId: `${card.id}-${index}`,
        isFlipped: false,
        isMatched: false
      })
    )

    const cardsShuffled = [...duplicatedCards].sort(() => Math.random() - 0.5)

    dispatch({
      type: 'INITIALIZE_GAME',
      payload: { cardsShuffled }
    })
  }

  const handleReset = () => {
    initializeGame()
  }

  const handleTimeOut = useCallback(() => {
    //? Usamos useCallback para mantener la misma referencia de memoria de esta función.
    //? Sin esto, cada clic en una carta recrearía la función, provocando que el useEffect del Timer destruyera y reiniciara el setInterval constantemente (congelando el tiempo).
    dispatch({ type: 'GAME_OVER', payload: false })
  }, [])

  const handleClick = (cardIndex) => {
    if (!gameState.isGameActive && gameState.moves > 0) return

    const activeFlips = gameState.cards.filter(
      (card) => card.isFlipped && !card.isMatched
    ).length

    if (activeFlips >= 2) return

    if (!gameState.isGameActive) {
      dispatch({ type: 'START_GAME' })
    }

    dispatch({ type: 'FLIP_CARD', payload: cardIndex })

    if (activeFlips === 1) {
      const firstCard = gameState.cards.find(
        (card) => card.isFlipped && !card.isMatched
      )
      const secondCard = gameState.cards[cardIndex]

      if (firstCard && firstCard.id !== secondCard.id) {
        setTimeout(() => {
          dispatch({ type: 'UNFLIP_CARDS' })
        }, 900)
      }
    }
  }

  useEffect(() => {
    const pairsNeededToWin =
      gameDifficulty === 'hard' || gameMode === 'memo-zenMode' ? 12 : 6

    if (gameState.isGameActive && gameState.matches === pairsNeededToWin) {
      dispatch({ type: 'GAME_OVER', payload: true })
      const score = gameDifficulty === 'hard' ? 150 : 100
      saveGameResults('memory', score)
      saveGameResults('memory', score)
    }
  }, [
    gameState.matches,
    gameState.isGameActive,
    gameDifficulty,
    gameMode,
    saveGameResults
  ])

  useEffect(() => {
    if (!gameMode || (gameMode && gameDifficulty === 'pending')) return
    initializeGame()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameDifficulty, gameMode])

  return {
    cards: gameState.cards,
    moves: gameState.moves,
    matches: gameState.matches,
    isGameActive: gameState.isGameActive,
    winner: gameState.winner,
    initializeGame,
    handleReset,
    handleTimeOut,
    handleClick
  }
}

export default useMemory
