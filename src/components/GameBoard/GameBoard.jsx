import React, { useState } from 'react'
import './GameBoard.css'

const GameBoard = ({
  gameData,
  onReset,
  onResetScoreboard,
  children,
  onChangeMode
}) => {
  // onChangeMode como prop opcional, solo para juegos que lo requieran
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <div className='game-layout main-child custom-scrollbar'>
      <div className='game-header'>
        <div className='game-title-container'>
          <img className='game-icon' src={gameData.icon} />
          <h2>{gameData.name}</h2>
        </div>
        <p>{gameData.subtitle}</p>
      </div>

      <div className='game-board'>{children}</div>

      <div className='game-footer'>
        <div className='game-controls'>
          <button onClick={openModal} className='btn-instructions-game'>
            Show Instructions
          </button>
          <button onClick={onReset} className='btn-reset-game'>
            Reset Game
          </button>
          <button onClick={onResetScoreboard} className='btn-reset-scoreboard'>
            Reset Scoreboard
          </button>
          {onChangeMode && (
            <button className='btn-change-mode' onClick={onChangeMode}>
              Change Game Mode
            </button>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className='modal-overlay' onClick={closeModal}>
          <div className='modal-content' onClick={(e) => e.stopPropagation()}>
            <div className='modal-header'>
              <h4>How To Play {gameData.name} </h4>{' '}
              <img
                className='modal-header-icon'
                src={gameData.icon}
                alt={`${gameData.name} icon`}
              />
              <button className='btn-close-modal' onClick={closeModal}>
                X
              </button>
            </div>
            <ol className='modal-instructions-list'>
              {gameData.howToPlay.map((value, index) => (
                <li className='instruction-item' key={index}>
                  {value}
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </div>
  )
}

export default GameBoard
