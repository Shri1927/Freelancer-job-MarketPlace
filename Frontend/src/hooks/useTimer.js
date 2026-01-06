import { useState, useEffect, useCallback, useRef } from "react"

const STORAGE_KEY = "freelancer-timer-state"

export function useTimer() {
  const [timerState, setTimerState] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      const parsed = JSON.parse(saved)
      // If timer was running, calculate elapsed time since page was closed
      if (parsed.isRunning && parsed.startTime) {
        const now = Date.now()
        const additionalElapsed = Math.floor((now - parsed.startTime) / 1000)
        return {
          ...parsed,
          elapsed: parsed.elapsed + additionalElapsed,
          startTime: now
        }
      }
      return parsed
    }
    return {
      isRunning: false,
      projectId: null,
      projectTitle: "",
      startTime: null,
      elapsed: 0
    }
  })

  const intervalRef = useRef(null)

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(timerState))
  }, [timerState])

  // Update elapsed time every second when running
  useEffect(() => {
    if (timerState.isRunning) {
      intervalRef.current = setInterval(() => {
        setTimerState(prev => ({
          ...prev,
          elapsed: prev.elapsed + 1
        }))
      }, 1000)
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [timerState.isRunning])

  const startTimer = useCallback((projectId, projectTitle) => {
    setTimerState({
      isRunning: true,
      projectId,
      projectTitle,
      startTime: Date.now(),
      elapsed: 0
    })
  }, [])

  const pauseTimer = useCallback(() => {
    setTimerState(prev => ({
      ...prev,
      isRunning: false,
      startTime: null
    }))
  }, [])

  const resumeTimer = useCallback(() => {
    setTimerState(prev => ({
      ...prev,
      isRunning: true,
      startTime: Date.now()
    }))
  }, [])

  const stopTimer = useCallback(() => {
    const finalElapsed = timerState.elapsed
    setTimerState({
      isRunning: false,
      projectId: null,
      projectTitle: "",
      startTime: null,
      elapsed: 0
    })
    return finalElapsed
  }, [timerState.elapsed])

  const formatTime = useCallback(seconds => {
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }, [])

  return {
    timerState,
    startTimer,
    pauseTimer,
    resumeTimer,
    stopTimer,
    formatTime
  }
}
