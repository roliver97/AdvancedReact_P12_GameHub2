import React, { useEffect, useRef, useState } from 'react'
import { formatTime } from '../../../utils/formatTime'

const Timer = ({ initialTime, isGameActive, onTimeOut }) => {
  console.log('RENDER <Timer/>')

  const [seconds, setSeconds] = useState(initialTime)
  const secondsRef = useRef(seconds)
  const onTimeOutRef = useRef(onTimeOut)

  useEffect(() => {
    secondsRef.current = seconds
  }, [seconds])

  useEffect(() => {
    onTimeOutRef.current = onTimeOut
  }, [onTimeOut])

  useEffect(() => {
    if (!isGameActive || secondsRef.current <= 0) return

    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          if (onTimeOutRef.current) onTimeOutRef.current()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isGameActive])

  return <span className='timer-number'>{formatTime(seconds)}</span>
}

export default Timer
