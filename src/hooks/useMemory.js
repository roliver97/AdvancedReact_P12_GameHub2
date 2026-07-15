import React, { useEffect, useReducer } from 'react'
import { GAMES_DATA } from '../constants/gamesData'
import { useUserContext } from './useUserContext'

const initialState = {
  cards: [],
  moves: 0,
  matches: 0,
  isGameActive: false
}

const memoryReducer = (state, action) => {
  switch (action.type) {
    case 'INITIALIZE_GAME':
      return {
        cards: action.payload,
        moves: 0,
        matches: 0,
        isGameActive: false
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
        newCards[waitingCardIndex].isMatched = true

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

    default:
      return state
  }
}

const useMemory = () => {
  const [gameState, dispatch] = useReducer(memoryReducer, initialState)
  const { gameDifficulty, gameMode } = useUserContext()

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

    dispatch({ type: 'INITIALIZE_GAME', payload: cardsShuffled })
  }

  const handleReset = () => {
    initializeGame()
  }

  const handleClick = (cardIndex) => {
    if (!gameState.isGameActive) {
      dispatch({ type: 'START_GAME' })
    }

    dispatch({ type: 'FLIP_CARD', payload: cardIndex })
  }

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
    initializeGame,
    handleReset,
    handleClick
  }
}

export default useMemory
