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

  return (
    <UserContext.Provider
      value={{
        playerInfo,
        setPlayerInfo,
        gamesStats,
        recents,
        saveGameResults
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

//* Para evitar la doble importación (useContext + UserContext) dentro de cada componente donde queramos utilizar el contexto, he creado un custom hook: useUserContext.js
