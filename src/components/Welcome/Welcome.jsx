import React, { useRef, useState, useEffect } from 'react'
import './Welcome.css'
import { useUserContext } from '../../hooks/useUserContext'

const Welcome = () => {
  console.log('RENDER PAGE <Welcome/>')

  const { setPlayerInfo } = useUserContext()
  const inputRef = useRef(null)
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, []) // Limpieza del timer si el componente se desmonta

  const handleSubmit = (e) => {
    e.preventDefault()
    const inputSubmited = inputRef.current.value
    if (inputSubmited.trim() !== '') {
      setPlayerInfo((prev) => ({
        ...prev,
        nickname: inputSubmited.trim()
      }))
    }
  }

  if (showSplash) {
    return (
      <div className='splash-screen'>
        <img
          className='splash-logo animate-pulse'
          src='/assets/icons/logo.svg'
          alt='GameHub Logo'
        />
      </div>
    )
  }

  return (
    <div className='welcome-overlay animate-fadeIn'>
      <div className='welcome-modal'>
        <div className='welcome-header'>
          <div className='welcome-logo-container'>
            <img
              className='welcome-logo'
              src='/assets/icons/logo.svg'
              alt="GameHub's logo"
            />
            <h1 className='welcome-title'>GameHub²</h1>
          </div>
          <h2 className='welcome-subtitle'>Play Amazing Classic Games</h2>
          <p className='welcome-text'>
            Challenge yourself with our collection of classic games — compete
            for the highest scores!
          </p>
        </div>
        <form className='welcome-form' onSubmit={handleSubmit}>
          <label className='welcome-label' htmlFor='nickname'>
            Enter Your Nickname Here
          </label>
          <input
            id='nickname'
            className='welcome-input'
            type='text'
            placeholder='Your gaming name...'
            ref={inputRef}
          />
          <button className='welcome-button' type='submit'>
            Start Gaming
          </button>
        </form>
      </div>
    </div>
  )
}

export default Welcome
