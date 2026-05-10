import React from 'react'

const LogoutToast = ({ userName, onDone }) => {
  const [visible, setVisible] = React.useState(false)
  const [leaving, setLeaving] = React.useState(false)

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour >= 5 && hour < 12) return { text: 'Good Morning', emoji: '☀️' }
    if (hour >= 12 && hour < 17) return { text: 'Good Afternoon', emoji: '🌤️' }
    if (hour >= 17 && hour < 21) return { text: 'Good Evening', emoji: '🌇' }
    return { text: 'Good Night', emoji: '🌙' }
  }

  const { text: greeting, emoji } = getGreeting()
  const firstName = userName ? userName.split(' ')[0] : 'there'

  React.useEffect(() => {
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
    <div 
      className={`fixed top-24 right-5 z-[3000] w-[340px] bg-white rounded-2xl p-5 shadow-[0_8px_40px_rgba(26,18,8,0.15)] border border-[#E8E2DA] overflow-hidden transition-all duration-500 ease-out ${
        visible && !leaving 
          ? 'translate-x-0 opacity-100 scale-100' 
          : 'translate-x-full opacity-0 scale-95'
      }`}
    >
      {/* Progress bar */}
      <div className={`absolute bottom-0 left-0 h-1 bg-[#4A6741] transition-all duration-[4200ms] linear rounded-b-2xl ${visible ? 'w-full' : 'w-0'}`} />

      <div className="flex gap-4 items-start">
        <div className="w-10 h-10 bg-[#C87941] rounded-xl flex items-center justify-center text-white text-base shadow-sm shrink-0">
          👋
        </div>

        <div className="flex-1">
          <p className="text-[#1A1208] font-bold text-sm mb-0.5">Logged Out</p>
          <p className="text-[#C87941] font-medium text-sm mb-2">
            {emoji} {greeting}, <span className="font-bold">{firstName}</span>!
          </p>
          <p className="text-[#6B6560] text-xs font-medium leading-relaxed">
            Logged out from <span className="text-[#1A1208] font-bold">EchoEats</span>. Hope to see you back soon! 🍽️
          </p>
        </div>

        <button 
          className="text-[#6B6560]/50 hover:text-[#1A1208] transition-colors text-lg leading-none shrink-0" 
          onClick={() => { setLeaving(true); setTimeout(onDone, 500) }}
        >
          ×
        </button>
      </div>
    </div>
  )
}

export default LogoutToast
