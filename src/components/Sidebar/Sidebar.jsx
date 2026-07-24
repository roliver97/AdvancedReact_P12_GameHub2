import React, { useState } from 'react'
import './Sidebar.css'
import { useGameContext } from '../../hooks/useGameContext'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useUserContext } from '../../hooks/useUserContext'

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { playerInfo } = useUserContext()
  const { navigateToGame, activeGame } = useGameContext()
  const [isSlowTransition, setIsSlowTransition] = useState(false)
  const [loadingGameAnimation, setLoadingGameAnimation] = useState(null)
  console.log('Soy Sidebar y me renderizo', `MI JUEGO ACTIVO ES ${activeGame}`)

  const navigate = useNavigate()
  const location = useLocation()
  const checkIsMobileOnClick = () => window.innerWidth <= 1024

  const handleGameClick = (e, gameName) => {
    if (location.pathname === `/${gameName}`) {
      if (checkIsMobileOnClick()) toggleSidebar()
      return navigateToGame(gameName)
    }

    e.preventDefault() // Recogemos el evento (e) y hacemos preventDefault porque los Navlinks de React Router están configurados para navegar de manera instantanea, pero queremos que espere a que termine la transición visual de "Loading Game".
    setLoadingGameAnimation(gameName)
    setIsSlowTransition(true)

    setTimeout(() => {
      setLoadingGameAnimation(null)
      navigate(`/${gameName}`)
      navigateToGame(gameName)
      if (isOpen) {
        toggleSidebar()
      }
    }, 400)

    setTimeout(() => {
      setIsSlowTransition(false)
    }, 1000)
  }

  const handleMenuClick = () => {
    if (checkIsMobileOnClick()) toggleSidebar()
  }

  return (
    <aside
      className={`sidebar ${!isOpen ? 'sidebar-collapsed' : ''} ${
        isSlowTransition ? 'slow-transition' : ''
      } custom-scrollbar-inverted`}
    >
      {isOpen && (
        <button className='close-sidebar-btn' onClick={toggleSidebar}>
          <img
            src='./assets/icons/arrow-left.svg'
            alt='Close Sidebar Arrow Icon'
          />
          <span>HIDE</span>
          <span>MENU</span>
        </button>
      )}
      <header className='sidebar-header'>
        <div className='sidebar-brand'>
          <img className='sidebar-logo' src='./assets/icons/logo.svg' alt='' />
          <h1 className='sidebar-title'>GameHub²</h1>
        </div>
        <h4 className='sidebar-welcome'>
          Welcome,{' '}
          <span className='sidebar-nickname'>{playerInfo.nickname}</span> !
        </h4>
      </header>

      <nav className='sidebar-nav'>
        <div className='sidebar-nav-group'>
          <h2 className='sidebar-group-title'>Games</h2>
          <NavLink
            className={`sidebar-link ${loadingGameAnimation === 'tictactoe' ? 'game-loading-neon' : ''}`}
            to='tictactoe'
            onClick={(e) => handleGameClick(e, 'tictactoe')}
          >
            {' '}
            <img src='./assets/icons/sidebar/tictactoe.svg' alt='TicTacToe' />
            <span>Tic Tac Toe</span>
          </NavLink>
          <NavLink
            className={`sidebar-link ${loadingGameAnimation === 'memory' ? 'game-loading-neon' : ''}`}
            to='memory'
            onClick={(e) => handleGameClick(e, 'memory')}
          >
            {' '}
            <img src='./assets/icons/sidebar/memory.png' alt='Memory' />
            <span>Memory</span>
          </NavLink>
        </div>
        <div className='sidebar-nav-group'>
          <h2 className='sidebar-group-title'>Menu</h2>
          <NavLink className='sidebar-link' to='/' onClick={handleMenuClick}>
            <img src='./assets/icons/sidebar/home.png' alt='Dashboard' />
            <span>Dashboard</span>
          </NavLink>
          <NavLink
            className='sidebar-link'
            to='/leaderboard'
            onClick={handleMenuClick}
          >
            <img src='./assets/icons/dashboard/trophy.webp' alt='Leaderboard' />
            <span>Leaderboard</span>
          </NavLink>
          <NavLink
            className='sidebar-link'
            to='/profile'
            onClick={handleMenuClick}
          >
            <img src='./assets/icons/sidebar/profile.webp' alt='Profile' />
            Profile
          </NavLink>
        </div>
      </nav>
      <footer className='sidebar-footer'>GameHub² | Rock The Code | P12</footer>
    </aside>
  )
}

export default Sidebar
