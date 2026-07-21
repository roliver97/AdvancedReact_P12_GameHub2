import { GAMES_DATA } from './gamesData'

export const INITIAL_PLAYER_INFO = {
  nickname: '',
  joinDate: new Date().toLocaleDateString()
}

export const INITIAL_GAMES_STATS = Object.values(GAMES_DATA).map((game) => ({
  id: game.id,
  name: game.name,
  score: 0,
  played: 0,
  icon: game.icon,
  bestTime: {
    easy: null,
    hard: null
  }
}))

//! MOCK DATA: ARRAY INITIAL_RECENTS DE PRUEBA PARA DESARROLLO . VACIAR ANTES DEL DEPLOY
export const INITIAL_RECENTS = []
