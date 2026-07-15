import React from 'react'

const MemoryGrid = ({ cards, onCardClick }) => {
  return (
    <div className={`memory-grid-${cards.length}`}>
      {cards.map((card, index) => (
        <button
          key={card.uniqueId}
          onClick={() => onCardClick(index)}
          /*disabled={isFieldsDisabled || value !== null} */
          className={`memory-card ${card.uniqueId !== null ? `${card.uniqueId.toLowerCase()}` : ''} ${card.isFlipped ? 'flipped' : ''}`}
        >
          <img src={card.icon} alt={card.id} />
        </button>
      ))}
    </div>
  )
}

export default MemoryGrid
