import React, { useEffect, useState } from 'react'
import './CSS/LoginToast.css'

const LoginToast = ({ userName, onDone }) => {
  const [visible, setVisible] = useState(false)
  const [leaving, setLeaving] = useState(false)

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour >= 5 && hour < 12) return { text: 'Good Morning', emoji: '☀️' }
    if (hour >= 12 && hour < 17) return { text: 'Good Afternoon', emoji: '🌤️' }
    if (hour >= 17 && hour < 21) return { text: 'Good Evening', emoji: '🌇' }
    return { text: 'Good Night', emoji: '🌙' }
  }

  const { text: greeting, emoji } = getGreeting()
  const firstName = userName ? userName.split(' ')[0] : 'there'

  useEffect(() => {
    // Slide in after a tiny delay so the animation triggers
    const showTimer = setTimeout(() => setVisible(true), 50)

    // Start slide-out after 4 seconds
    const hideTimer = setTimeout(() => {
      setLeaving(true)
    }, 4200)

    // Unmount after animation completes
    const doneTimer = setTimeout(() => {
      onDone()
    }, 4800)

    return () => {
      clearTimeout(showTimer)
      clearTimeout(hideTimer)
      clearTimeout(doneTimer)
    }
  }, [onDone])

  return (
    <div className={`login-toast ${visible ? 'toast-show' : ''} ${leaving ? 'toast-leave' : ''}`}>
      {/* Progress bar */}
      <div className="toast-progress" />

      <div className="toast-icon-wrap">
        <span className="toast-check">✓</span>
      </div>

      <div className="toast-body">
        <p className="toast-title">Login Successful!</p>
        <p className="toast-greeting">
          {emoji} {greeting}, <strong>{firstName}</strong>!
        </p>
        <p className="toast-message">
          Welcome back to <span className="toast-brand">KITCHEN-TO-HOME</span> 🍽️
          <br />
          <span className="toast-sub">Your favourite meals are just a click away.</span>
        </p>
      </div>

      <button className="toast-close" onClick={() => { setLeaving(true); setTimeout(onDone, 600) }}>✕</button>
    </div>
  )
}

export default LoginToast
