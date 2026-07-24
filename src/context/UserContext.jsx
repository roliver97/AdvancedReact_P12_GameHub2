import { createContext, useState } from 'react'
import { INITIAL_PLAYER_INFO } from '../constants/initialStates'

/* eslint-disable-next-line react-refresh/only-export-components */
export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [playerInfo, setPlayerInfo] = useState(INITIAL_PLAYER_INFO)

  return (
    <UserContext.Provider value={{ playerInfo, setPlayerInfo }}>
      {children}
    </UserContext.Provider>
  )
}
