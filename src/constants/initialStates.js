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
  icon: game.icon
}))

//! MOCK DATA: ARRAY INITIAL_RECENTS DE PRUEBA PARA DESARROLLO . VACIAR ANTES DEL DEPLOY
export const INITIAL_RECENTS = [
  {
    gameId: 'tictactoe',
    name: 'Tic Tac Toe',
    date: '21/11/2025',
    points: 100,
    icon: '/assets/icons/sidebar/tictactoe.svg'
  },
  {
    gameId: 'memory',
    name: 'Memory',
    date: '20/11/2025',
    points: 250,
    icon: '/assets/icons/sidebar/memory.png'
  },
  {
    gameId: 'memory',
    name: 'Memory',
    date: '20/11/2025',
    points: 250,
    icon: '/assets/icons/sidebar/memory.png'
  },
  {
    gameId: 'memory',
    name: 'Memory',
    date: '20/11/2025',
    points: 250,
    icon: '/assets/icons/sidebar/memory.png'
  },
  {
    gameId: 'memory',
    name: 'Memory',
    date: '20/11/2025',
    points: 250,
    icon: '/assets/icons/sidebar/memory.png'
  }
]
