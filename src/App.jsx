import React, { useState } from 'react'
import './App.css'

import { Route, Routes } from 'react-router-dom'
import Sidebar from './components/Sidebar/Sidebar'
import { useUserContext } from './hooks/useUserContext'
import Welcome from './components/Welcome/Welcome'
import Dashboard from './pages/Menu/Dashboard/Dashboard'
import Leaderboard from './pages/Menu/Leaderboard/Leaderboard'
import Profile from './pages/Menu/Profile/Profile'
import TicTacToe from './pages/Games/TicTacToe/TicTacToe'
import Memory from './pages/Games/Memory/Memory'

const App = () => {
  const { playerInfo } = useUserContext()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  console.log('Soy App y me renderizo')

  if (!playerInfo.nickname) return <Welcome />

  return (
    <>
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <main>
        {!isSidebarOpen && (
          <button
            className='open-sidebar-btn'
            onClick={() => setIsSidebarOpen(true)}
          >
            <img
              src='./assets/icons/arrow-right.svg'
              alt='Open Sidebar Arrow Icon'
            />
            <span>OPEN</span>
            <span>MENU</span>
          </button>
        )}
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/leaderboard' element={<Leaderboard />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/tictactoe' element={<TicTacToe />} />
          <Route path='/memory' element={<Memory />} />
        </Routes>
      </main>
    </>
  )
}

export default App
