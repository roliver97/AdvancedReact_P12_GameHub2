import { renderHook } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import useMemory from './useMemory'

let mockDifficulty = 'pending'
let mockGameMode = 'pending'

vi.mock('./useGameContext', () => ({
  useGameContext: () => ({
    gameDifficulty: mockDifficulty,
    gameMode: mockGameMode
  })
}))

describe('useMemory - Cards empty Array Bug', () => {
  beforeEach(() => {
    mockDifficulty = 'pending'
    mockGameMode = 'pending'
  })

  it('debería tener un array de cards vacío cuando tenemos dificultat "pending"', () => {
    const { result } = renderHook(() => useMemory())

    expect(result.current.cards.length).toBe(0)
  })

  it('debería tener un array de 12 cards cuando cambiamos la dificultad "pending" a "easy" en modo "Time Attack"', () => {
    const { result, rerender } = renderHook(() => useMemory())
    expect(result.current.cards.length).toBe(0)

    mockDifficulty = 'easy'
    mockGameMode = 'memo-timeAttack'

    rerender()

    expect(result.current.cards.length).toBe(12)
  })

  it('debería tener un array de 24 cards cuando cambiamos la dificultad "pending" a "hard" en modo "Time Attack"', () => {
    const { result, rerender } = renderHook(() => useMemory())
    expect(result.current.cards.length).toBe(0)

    mockDifficulty = 'hard'
    mockGameMode = 'memo-timeAttack'

    rerender()

    expect(result.current.cards.length).toBe(24)
  })

  it('debería tener un array de 24 cards cuando elegimos modo "Zen" y difficulty null', () => {
    const { result, rerender } = renderHook(() => useMemory())
    expect(result.current.cards.length).toBe(0)

    mockDifficulty = null
    mockGameMode = 'memo-zenMode'

    rerender()

    expect(result.current.cards.length).toBe(24)
  })
})
