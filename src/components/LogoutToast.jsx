import React from 'react'
import { LogOut, X } from 'lucide-react'

const LogoutToast = ({ userName, onDone }) => {
  const [visible, setVisible] = React.useState(false)
  const [leaving, setLeaving] = React.useState(false)

  const getGreeting = () => {
    const h = new Date().getHours()
    if (h >= 5 && h < 12) return 'Good Morning'
    if (h >= 12 && h < 17) return 'Good Afternoon'
    if (h >= 17 && h < 21) return 'Good Evening'
    return 'Good Night'
  }

  const firstName = userName ? userName.split(' ')[0] : 'there'

  React.useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 50)
    const t2 = setTimeout(() => setLeaving(true), 4200)
    const t3 = setTimeout(() => onDone(), 4800)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [onDone])

  return (
    <div
      className={`fixed bottom-6 right-5 z-[3000] w-[320px] bg-white rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-[#e7e5e4] overflow-hidden transition-all duration-500 ease-out ${
        visible && !leaving ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}
    >
      <div className="h-0.5 w-full bg-[#e7e5e4]">
        <div className={`h-full bg-[#1a1a1a] transition-all duration-[4200ms] linear ${visible ? 'w-full' : 'w-0'}`} />
      </div>

      <div className="flex gap-3 items-start p-4">
        <div className="w-8 h-8 bg-[#f5f5f4] border border-[#e7e5e4] rounded-lg flex items-center justify-center shrink-0">
          <LogOut size={14} className="text-[#6b6b6b]" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[#1a1a1a] font-semibold text-sm">Signed out</p>
          <p className="text-[#6b6b6b] text-xs mt-0.5">{getGreeting()}, <span className="font-semibold text-[#1a1a1a]">{firstName}</span>. See you soon.</p>
        </div>
        <button
          className="text-[#a8a29e] hover:text-[#1a1a1a] transition-colors shrink-0 mt-0.5"
          onClick={() => { setLeaving(true); setTimeout(onDone, 500) }}
        >
          <X size={14} />
        </button>
      </div>
    </div>
  )
}

export default LogoutToast
