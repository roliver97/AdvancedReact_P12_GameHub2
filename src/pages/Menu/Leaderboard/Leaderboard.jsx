import React, { useMemo } from 'react'
import './Leaderboard.css'
import { useGameContext } from '../../../hooks/useGameContext'
import LeaderboardCard from './components/LeaderboardCard'
import { useUserContext } from '../../../hooks/useUserContext'

const Leaderboard = () => {
  console.log('RENDER PAGE <Leaderboard/>')
  const { playerInfo } = useUserContext()
  const { gamesStats, recents } = useGameContext()

  const leaderBoardData = useMemo(() => {
    return [...gamesStats]
      .sort((a, b) => b.score - a.score)
      .map((game, index) => {
        const lastGame = recents.find(
          (recentgame) => recentgame.name === game.name
        )
        return {
          ...game,
          position:
            index +
            1 /* sin el +1 index sería 0,1,2, pero para las cards queremos 1,2,3 */,
          lastGameDate: lastGame ? lastGame.date : 'Never played'
        }
      })
  }, [gamesStats, recents])

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

        <div className='leaderboard-grid-cards'>
          {leaderBoardData.map((gameData) => {
            return (
              <LeaderboardCard
                nickname={playerInfo.nickname}
                key={gameData.id}
                game={gameData}
                leaderboardPosition={gameData.position}
                lastGameDate={gameData.lastGameDate}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Leaderboard
