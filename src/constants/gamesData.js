export const GAMES_DATA = {
  tictactoe: {
    id: 'tictactoe',
    name: 'Tic Tac Toe',
    subtitle:
      'Align 3 symbols in a row before your opponent does to win the match.',
    icon: '/assets/icons/sidebar/tictactoe.svg',
    howToPlay: [
      'The game is played on a grid that is 3 squares by 3 squares.',
      'You are X, your friend (or the computer) is O. Players take turns putting their marks in empty squares.',
      'The first player to get 3 of their marks in a row (up, down, across, or diagonally) is the winner.',
      'When all 9 squares are full, the game is over. If no player has 3 marks, the game ends in a tie.'
    ],
    modeOptions: {
      firstMode: {
        icon: '🤖',
        text: '1 Player (vs CPU)',
        value: 'tictactoe-1P'
      },
      secondMode: {
        icon: '👥',
        text: '2 Players (Local)',
        value: 'tictactoe-2P'
      }
    },
    difficultyOptions: {
      easy: { icon: '🟩', text: 'Easy' },
      hard: { icon: '🟥', text: 'Hard' }
    }
  },
  memory: {
    id: 'memory',
    name: 'Memory',
    subtitle: 'Find all matching pairs of cards in the fewest moves possible.',
    icon: '/assets/icons/sidebar/memory.png',
    howToPlay: [
      'The cards start mixed up and face down on the board.',
      'Turn over any two cards. If they match, they stay face up.',
      "If they don't match, the cards will turn face down again automatically. Remember what was on each card and where it was.",
      'The game ends when all the pairs have been found. Try to do it in the fewest turns!'
    ],
    modeOptions: {
      firstMode: { icon: '⏱️', text: 'Time Attack', value: 'memo-timeAttack' },
      secondMode: { icon: '🧘', text: 'Zen Mode', value: 'memo-zenMode' }
    },
    difficultyOptions: {
      easy: { icon: '🟩', text: 'Easy' },
      hard: { icon: '🟥', text: 'Hard' }
    }
  },
  rockpaperscissors: {
    id: 'rockpaperscissors',
    name: 'Rock Paper Scissors',
    subtitle:
      'Outsmart your opponent in a classic hand-battle of strategy and prediction.',
    icon: '/assets/icons/sidebar/rock_paper_scissors.png',
    howToPlay: [
      'Both players choose one of three shapes simultaneously: Rock, Paper, or Scissors.',
      'Rock crushes Scissors (Rock wins).',
      'Scissors cuts Paper (Scissors wins).',
      'Paper covers Rock (Paper wins).',
      'If both players choose the same shape, the round is a tie.'
    ]
  }
}
