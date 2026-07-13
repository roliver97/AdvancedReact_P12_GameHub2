import { createContext, useState } from 'react'
import {
  INITIAL_PLAYER_INFO,
  INITIAL_GAMES_STATS,
  INITIAL_RECENTS
} from '../constants/initialStates'

/* eslint-disable-next-line react-refresh/only-export-components */
export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [playerInfo, setPlayerInfo] = useState(INITIAL_PLAYER_INFO)
  const [gamesStats, setGamesStats] = useState(INITIAL_GAMES_STATS)
  const [recents, setRecents] = useState(INITIAL_RECENTS)

  const [activeGame, setActiveGame] = useState(null)
  const [gameMode, setGameMode] = useState(null) // null = Menú inicial / '1P' = vs CPU / '2P' = 1vs1
  const [gameDifficulty, setGameDifficulty] = useState(null) // for Player vs CPU === easy or hard
  const [lastGameModePlayed, setLastGameModePlayed] = useState(null)

  const saveGameResults = (gameId, pointsGained) => {
    const today = new Date().toLocaleDateString()
    const targetGame = gamesStats.find((g) => g.id === gameId)
    if (!targetGame) return

    setRecents((prev) =>
      [
        {
          gameId,
          name: targetGame.name,
          date: today,
          points: pointsGained,
          icon: targetGame.icon
        },
        ...prev
      ].slice(0, 5)
    )

    setGamesStats((prev) =>
      prev.map((game) => {
        if (game.id === gameId) {
          return {
            ...game,
            score: game.score + pointsGained,
            played: game.played + 1
          }
        }
        return game
      })
    )
  }

  const navigateToGame = (gameName) => {
    setActiveGame(gameName)
    setGameMode(null)
    setGameDifficulty(null)
    setLastGameModePlayed(null)
  }

  const selectGameMode = (mode) => {
    setGameMode(mode)
    setLastGameModePlayed(mode)
  }

  const selectGameDifficulty = (difficulty) => {
    setGameDifficulty(difficulty)
  }

  const changeGameMode = (callbackFunction) => {
    setGameMode('pending')
    setGameDifficulty(null)

    if (callbackFunction && typeof callbackFunction === 'function') {
      callbackFunction()
    }
  }

  return (
    <UserContext.Provider
      value={{
        playerInfo,
        setPlayerInfo,
        gamesStats,
        recents,
        saveGameResults,

        activeGame,
        gameMode,
        setGameMode,
        gameDifficulty,
        setGameDifficulty,
        lastGameModePlayed,
        setLastGameModePlayed,

        navigateToGame,
        selectGameMode,
        selectGameDifficulty,
        changeGameMode
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

//* Para evitar la doble importación (useContext + UserContext) dentro de cada componente donde queramos utilizar el contexto, he creado un custom hook: useUserContext.js
