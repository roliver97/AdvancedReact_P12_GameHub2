import React from 'react'

const LeaderboardCard = ({
  nickname,
  key,
  game,
  lastGameDate,
  leaderboardPosition
}) => {
  return (
    <div key={key} className='leaderboard-card'>
      <div className='leaderboard-card-info'>
        <div
          className={`leaderboard-card-position position-${leaderboardPosition}`}
        >
          <img
            src={game.icon}
            alt={`${game.name} icon`}
            className='leaderboard-card-icon'
          />
          <span>{leaderboardPosition}</span>
        </div>
        <div className='leaderboard-card-titles'>
          {' '}
          <h4>{game.name}</h4>
          <span>{nickname}</span>
        </div>
      </div>
      <div className='leaderboard-card-values'>
        <span>{game.score}</span>
        <div className='leaderboard-card-lastGame-container'>
          <p>Last game</p>
          <span>{lastGameDate}</span>{' '}
        </div>
      </div>
    </div>
  )
}

export default LeaderboardCard
