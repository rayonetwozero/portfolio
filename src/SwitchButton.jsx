import { useState, useRef, useEffect } from 'react'

export default function SwitchButton() {
  const [on, setOn] = useState(true) // 預設為播放
  const audioRef = useRef(null)

  useEffect(() => {
    if (on && audioRef.current) {
      audioRef.current.play()
    }
  }, [on])

  const handleClick = () => {
    setOn(v => {
      const next = !v
      if (audioRef.current) {
        if (next) {
          audioRef.current.play()
        } else {
          audioRef.current.pause()
        }
      }
      return next
    })
  }

  return (
    <div style={{
      position: 'fixed',
      top: 24,
      right: 24,
      zIndex: 1000
    }}>
      <audio ref={audioRef} src="/music-landing-page-background.mp3" loop autoPlay />
      <button
        className={`music-switch-btn${on ? '' : ' off'}`}
        onClick={handleClick}
      >
        {on ? 'Music ON' : 'Music OFF'}
      </button>
    </div>
  )
}