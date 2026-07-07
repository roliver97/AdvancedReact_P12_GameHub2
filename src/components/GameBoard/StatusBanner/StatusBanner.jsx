import React from 'react'
import './StatusBanner.css'

const StatusBanner = ({ content, bannerClassName }) => {
  return (
    <div className={`game-status-banner ${bannerClassName || ''}`}>
      <p className='status-message'>{content}</p>
    </div>
  )
}

export default StatusBanner
