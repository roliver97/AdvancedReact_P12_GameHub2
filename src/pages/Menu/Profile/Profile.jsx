import React from 'react'
import './Profile.css'
import { useUserContext } from '../../../hooks/useUserContext'

const Profile = () => {
  const { playerInfo, gamesStats } = useUserContext()

  const totalGamesPlayed = gamesStats.reduce(
    (acc, game) => acc + game.played,
    0
  )

  const totalScore = gamesStats.reduce((acc, game) => acc + game.score, 0)

  const averageScore = totalGamesPlayed > 0 ? totalScore / totalGamesPlayed : 0

  const favoriteGame =
    totalGamesPlayed > 0
      ? gamesStats.reduce((prevGame, currentGame) => {
          currentGame.played > prevGame.played ? currentGame : prevGame
        }).name
      : 'Not played yet'

  return (
    <section className='profile main-child custom-scrollbar'>
      <div className='profile-header'>
        <div className='profile-header-title-container'>
          <img src='/assets/icons/sidebar/profile.webp' alt='Profile icon' />
          <h1>Player Profile</h1>
        </div>
        <p>View your stats and update your account settings.</p>
      </div>

      <div className='profile-grid'>
        <div className='profile-card'>
          <div className='profile-card-title'>
            <h2>Player Info</h2>
          </div>

          <div className='player-info-card'>
            <div className='player-nickname-container'>
              <h3>Player Name</h3>
              <span>{playerInfo.nickname}</span>
            </div>

            <div className='player-joinDate-container'>
              <h3>Member Since</h3>
              <span>{playerInfo.joinDate}</span>
            </div>

            <div className='player-favoriteGame-container'>
              <h3>Favorite Game</h3>
              <span>{favoriteGame}</span>
            </div>
          </div>
        </div>
        <div className='profile-card'>
          <div className='profile-card-title'>
            <h2>Game Statistics</h2>
          </div>

          <div className='statistics-card'>
            <div className='statistics-gamesCount-container'>
              <h3>Games Played</h3>
              <span>{totalGamesPlayed}</span>
            </div>
            <div className='statistics-totalScore-container'>
              <h3>Total Score</h3>
              <span>{totalScore}</span>
            </div>{' '}
            <div className='statistics-averageScore-container'>
              <h3>Average Score</h3>
              <span>{averageScore}</span>
            </div>{' '}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Profile
