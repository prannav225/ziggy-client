import React, { useEffect, useState } from 'react'
import './CSS/LoginToast.css'
import './CSS/LogoutToast.css'

const LogoutToast = ({ userName, onDone }) => {
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
    const showTimer = setTimeout(() => setVisible(true), 50)
    const hideTimer = setTimeout(() => setLeaving(true), 4200)
    const doneTimer = setTimeout(() => onDone(), 4800)

    return () => {
      clearTimeout(showTimer)
      clearTimeout(hideTimer)
      clearTimeout(doneTimer)
    }
  }, [onDone])

  return (
    <div className={`login-toast logout-toast ${visible ? 'toast-show' : ''} ${leaving ? 'toast-leave' : ''}`}>
      <div className="toast-progress logout-progress" />

      <div className="toast-icon-wrap logout-icon-wrap">
        <span className="toast-check">👋</span>
      </div>

      <div className="toast-body">
        <p className="toast-title logout-title">Logged Out Successfully</p>
        <p className="toast-greeting">
          {emoji} {greeting}, <strong>{firstName}</strong>!
        </p>
        <p className="toast-message">
          Logged out successfully with <strong>{userName}</strong> and see u soon Goodbye! 👋
          <br />
          <span className="toast-sub">Come back to Kitchen-To-Home anytime 🍽️</span>
        </p>
      </div>

      <button
        className="toast-close"
        onClick={() => { setLeaving(true); setTimeout(onDone, 600) }}
      >
        ✕
      </button>
    </div>
  )
}

export default LogoutToast
