export const INITIAL_PLAYER_INFO = {
  nickname: '',
  joinDate: new Date().toLocaleDateString()
}

export const INITIAL_GAMES_STATS = [
  {
    id: 'tictactoe',
    name: 'Tic Tac Toe',
    score: 100,
    played: 1,
    icon: '/assets/icons/sidebar/tictactoe.svg'
  },
  {
    id: 'memory',
    name: 'Memory',
    score: 1000,
    played: 4,
    icon: '/assets/icons/sidebar/memory.png'
  },
  {
    id: 'rockpaperscissors',
    name: 'Rock Paper Scissors',
    score: 0,
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
]

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
