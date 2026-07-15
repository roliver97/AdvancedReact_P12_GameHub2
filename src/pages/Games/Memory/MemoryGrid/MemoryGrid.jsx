import React from 'react'

const MemoryGrid = ({ cards }) => {
  return (
    <div className={`memory-grid-${cards.length}`}>
      {cards.map((card, index) => (
        <button
          key={index}
          /* onClick={() => onCellClick(index)}
          disabled={isFieldsDisabled || value !== null} */
          className={`memory-card ${card.uniqueId !== null ? `${card.uniqueId.toLowerCase()}` : ''}`}
        >
          <img src={card.icon} alt={card.id} />
        </button>
      ))}
    </div>
  )
}

export default MemoryGrid
