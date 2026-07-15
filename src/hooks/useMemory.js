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
        isFlipped: false
      })
    )

    const cardsShuffled = [...duplicatedCards].sort(() => Math.random() - 0.5)

    dispatch({ type: 'INITIALIZE_GAME', payload: cardsShuffled })
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
    initializeGame
  }
}

export default useMemory
