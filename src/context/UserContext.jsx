import { createContext, useState } from 'react'

/* eslint-disable-next-line react-refresh/only-export-components */
export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [nickname, setNickname] = useState('')
  const [gamesStats, setGamesStats] = useState([
    {
      id: 'tictactoe',
      name: 'Tic Tac Toe',
      score: 100,
      played: 0,
      icon: '/assets/icons/sidebar/tictactoe.svg'
    },
    {
      id: 'memory',
      name: 'Memory',
      score: 10,
      played: 0,
      icon: '/assets/icons/sidebar/memory.png'
    },
    {
      id: 'rockpaperscissors',
      name: 'Rock Paper Scissors',
      score: 50,
      played: 0,
      icon: '/assets/icons/sidebar/rock_paper_scissors.png'
    },
    {
      id: 'prueba',
      name: 'Prueba',
      score: 0,
      played: 0,
      icon: '/assets/icons/sidebar/rock_paper_scissors.png'
    }
  ])

  const [recents, setRecents] = useState([
    {
      name: 'Tic Tac Toe',
      date: '21/11/2025',
      points: 100,
      icon: '/assets/icons/sidebar/tictactoe.svg'
    },
    {
      name: 'Memory',
      date: '20/11/2025',
      points: 250,
      icon: '/assets/icons/sidebar/memory.png'
    },
    {
      name: 'Memory',
      date: '20/11/2025',
      points: 250,
      icon: '/assets/icons/sidebar/memory.png'
    },
    {
      name: 'Memory',
      date: '20/11/2025',
      points: 250,
      icon: '/assets/icons/sidebar/memory.png'
    },
    {
      name: 'Memory',
      date: '20/11/2025',
      points: 250,
      icon: '/assets/icons/sidebar/memory.png'
    }
  ])

  return (
    <UserContext.Provider
      value={{
        nickname,
        setNickname,
        gamesStats,
        setGamesStats,
        recents,
        setRecents
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

//* Para evitar la doble importación (useContext + UserContext) dentro de cada componente donde queramos utilizar el contexto, he creado un custom hook: useUserContext.js.
