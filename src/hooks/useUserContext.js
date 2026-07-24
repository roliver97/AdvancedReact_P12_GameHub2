//! Sin este customHook, cada componente que necesitara leer datos del contexto deberia usar la siguiente sintaxis: "const { valorDeEjemplo } = useContext(UserContext)"
//! la cual requeriría de una doble importación en cada arxivo:
// import { useContext } from 'react'
// import { UserContext } from './context/UserContext'

import { useContext } from 'react'
import { UserContext } from '../context/UserContext'

export const useUserContext = () => {
  return useContext(UserContext)
}
