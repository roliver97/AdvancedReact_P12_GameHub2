import React from 'react'
import './Dashboard.css'
import { useGameContext } from '../../../hooks/useGameContext'
import { useUserContext } from '../../../hooks/useUserContext'

const Dashboard = () => {
  const { playerInfo } = useUserContext()
  const { gamesStats, recents } = useGameContext()
  const totalGamesPlayed = gamesStats.reduce(
    (acc, game) => acc + game.played,
    0
  )
  const totalScore = gamesStats.reduce((acc, game) => acc + game.score, 0)
  return (
    <section className='dashboard main-child custom-scrollbar'>
      <div className='dashboard-header'>
        <h1>Hey {playerInfo.nickname},</h1>
        <p>
          Your personal arcade room is ready. Choose your favorite game from the
          menu and start breaking records
        </p>
      </div>
      <div className='dashboard-content custom-scrollbar'>
        <div className='dashboard-markers'>
          <div className='dashboard-games-marker'>
            <img
              className='dashboard-icon'
              src='/assets/icons/dashboard/controller.webp'
              alt=''
            />
            <div className='dashboard-marker-info'>
              <h3>Games Played</h3>
              <span>{totalGamesPlayed}</span>
            </div>
          </div>
          <div className='dashboard-score-marker'>
            <img
              className='dashboard-icon'
              src='/assets/icons/dashboard/trophy.webp'
              alt=''
            />
            <div className='dashboard-marker-info'>
              <h3>Total Score</h3>
              <span>{totalScore}</span>
            </div>
          </div>
        </div>
        <div className='dashboard-recents'>
          <h2 className='dashboard-recents-title'>Recent Matches</h2>

          <div className='dashboard-recent-cards custom-scrollbar'>
            {recents.length === 0 ? (
              <p className='no-data-text'>No matches played yet.</p>
            ) : (
              recents.map((game, index) => (
                <div key={index} className='recent-card'>
                  <img
                    className='recent-card-icon'
                    src={game.icon}
                    alt={game.name}
                  />
                  <div className='recent-card-info'>
                    <h4 className='recent-card-game'>{game.name}</h4>
                    <span className='recent-card-date'>{game.date}</span>
                  </div>
                  <div className='recent-card-points'>
                    <span>+{game.points} pts</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Dashboard
