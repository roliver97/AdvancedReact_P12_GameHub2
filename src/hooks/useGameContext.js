//! Sin este customHook, cada componente que necesitara leer datos del contexto deberia usar la siguiente sintaxis: "const { valorDeEjemplo } = useContext(GameContext)"
//! la cual requeriría de una doble importación en cada arxivo:
// import { useContext } from 'react'
// import { GameContext } from './context/GameContext'

import { useContext } from 'react'
import { GameContext } from '../context/GameContext'

export const useGameContext = () => {
  return useContext(GameContext)
}
