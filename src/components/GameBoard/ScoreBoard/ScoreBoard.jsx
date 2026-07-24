import React from 'react'
import './ScoreBoard.css'

const ScoreBoard = ({ data }) => {
  console.log('RENDER <ScoreBoard/>')

  return (
    <div className='game-score-board'>
      {data.map((card, index) => (
        <div key={index} className={`score-card ${card.className || ''}`}>
          <span className='score-number'>{card.value}</span>
          <span className='score-label'>{card.label}</span>
        </div>
      ))}
    </div>
  )
}

export default ScoreBoard
