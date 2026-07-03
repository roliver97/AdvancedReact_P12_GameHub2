import React from 'react'
import './Leaderboard.css'
import { useUserContext } from '../../../hooks/useUserContext'
import LeaderboardCard from './components/LeaderboardCard'

const Leaderboard = () => {
  const { nickname, gamesStats, recents } = useUserContext()
  const orderedGames = [...gamesStats].sort((a, b) => b.score - a.score)

  return (
    <section className='leaderboard main-child custom-scrollbar'>
      <div className='leaderboard-header'>
        <div className='leaderboard-header-title-container'>
          <img src='/assets/icons/dashboard/trophy.webp' alt='Trophy icon' />
          <h1>Leaderboard</h1>
        </div>
        <p>
          Your ultimate gaming scores are locked in. Track your progress across
          all classic games and keep breaking your own records to stay on top.
        </p>
      </div>

      <div className='leaderboard-grid'>
        <div className='leaderboard-grid-title-container'>
          <h2 className='leaderboard-grid-title'>Top Scores</h2>
        </div>

        <div className='leaderboard-grid-cards custom-scrollbar'>
          {orderedGames.map((game, index) => {
            const lastGame = recents.find(
              (recentgame) => recentgame.name === game.name
            )
            const lastGameDate = lastGame ? lastGame.date : 'Never played'

            return (
              <LeaderboardCard
                nickname={nickname}
                key={game.id}
                game={game}
                leaderboardPosition={
                  index + 1
                } /* sin el +1 index sería 0,1,2, pero para las cards queremos 1,2,3 */
                lastGameDate={lastGameDate}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Leaderboard
