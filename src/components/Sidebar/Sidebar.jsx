import React from 'react'
import './Sidebar.css'
import { useUserContext } from '../../hooks/useUserContext'
import { NavLink } from 'react-router-dom'

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { playerInfo } = useUserContext()
  console.log('Soy Sidebar y me renderizo')

  return (
    <aside
      className={`sidebar ${!isOpen ? 'sidebar-collapsed' : ''} custom-scrollbar-inverted`}
    >
      <button className='close-sidebar-btn' onClick={toggleSidebar}>
        <img
          src='./assets/icons/arrow-left.svg'
          alt='Close Sidebar Arrow Icon'
        />
        <span>HIDE</span>
        <span>MENU</span>
      </button>
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
          <NavLink className='sidebar-link' to='tictactoe'>
            {' '}
            <img src='./assets/icons/sidebar/tictactoe.svg' alt='TicTacToe' />
            <span>Tic Tac Toe</span>
          </NavLink>
        </div>
        <div className='sidebar-nav-group'>
          <h2 className='sidebar-group-title'>Menu</h2>
          <NavLink className='sidebar-link' to='/'>
            <img src='./assets/icons/sidebar/home.png' alt='Dashboard' />
            <span>Dashboard</span>
          </NavLink>
          <NavLink className='sidebar-link' to='/leaderboard'>
            <img src='./assets/icons/dashboard/trophy.webp' alt='Leaderboard' />
            <span>Leaderboard</span>
          </NavLink>
          <NavLink className='sidebar-link' to='/profile'>
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
