import React, { useState, useContext } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { GlobalStateContext } from '../context/GlobalStateContext'

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  
  const { login } = useContext(GlobalStateContext)
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    try {
      if (isLogin) {
        const response = await fetch("http://localhost:8000/login/", {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        })
        const data = await response.json()
        if (response.ok) {
          login(data.user)
          navigate(from, { replace: true })
        } else {
          setError(data.error)
        }
      } else {
        const response = await fetch("http://localhost:8000/signup/", {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password })
        })
        const data = await response.json()
        if (response.ok) {
          login(data.user)
          navigate(from, { replace: true })
        } else {
          setError(data.error)
        }
      }
    } catch (error) {
      setError("Server error. Please try again.")
    }
  }

  const inputClass = "w-full px-4 py-3.5 bg-[#FAF6F1] border border-[#E8E2DA] rounded-xl text-[#1A1208] placeholder:text-[#6B6560]/50 outline-none focus:border-[#C87941] focus:ring-2 focus:ring-[#C87941]/15 transition-all duration-200 text-sm font-medium"

  return (
    <div className="min-h-screen flex bg-[#FAF6F1] font-sans">
      {/* Left Panel — Brand */}
      <div className="hidden lg:flex flex-1 bg-[#1A1208] items-center justify-center p-16 relative overflow-hidden">
        <div className="absolute top-[20%] right-[-10%] w-80 h-80 bg-[#C87941]/10 rounded-full blur-[80px]"></div>
        <div className="absolute bottom-[10%] left-[-5%] w-64 h-64 bg-[#4A6741]/10 rounded-full blur-[60px]"></div>
        <div className="relative z-10 text-center">
          <div className="text-6xl mb-6">🍽️</div>
          <h2 className="font-display text-4xl font-normal text-white mb-4 leading-tight">
            Delicious food,<br />
            <span className="text-[#C87941] italic">at your voice.</span>
          </h2>
          <p className="text-white/50 text-sm max-w-[280px] mx-auto leading-relaxed font-medium">
            The world's first voice-powered food delivery experience. Order hands-free, eat happy.
          </p>
          <div className="flex justify-center gap-3 mt-10">
            {['500+ Restaurants', '20min Delivery', '50k+ Customers'].map((t, i) => (
              <div key={i} className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-[10px] text-white/60 font-medium uppercase tracking-widest">{t}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel — Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-[400px]">
          <div className="mb-10">
            <h1 className="font-display text-3xl font-normal text-[#1A1208] mb-2">
              {isLogin ? "Welcome back" : "Create account"}
            </h1>
            <p className="text-[#6B6560] text-sm font-medium">
              {isLogin ? "Sign in to your EchoEats account" : "Join us for delicious food today"}
            </p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-700 border border-red-100 p-4 rounded-xl text-sm font-medium mb-6">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {!isLogin && (
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputClass}
                required
              />
            )}

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClass}
              required
            />

            <button 
              type="submit" 
              className="w-full py-3.5 bg-[#1A1208] text-[#FAF6F1] font-semibold rounded-xl hover:bg-[#C87941] active:scale-[0.98] transition-all duration-300 mt-2 text-sm shadow-[0_4px_16px_rgba(26,18,8,0.2)] hover:shadow-[0_8px_24px_rgba(200,121,65,0.35)]"
            >
              {isLogin ? "Sign In" : "Create Account"}
            </button>
          </form>

          <p className="text-center text-[#6B6560] text-sm font-medium mt-6">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <span 
              onClick={() => setIsLogin(!isLogin)}
              className="text-[#C87941] cursor-pointer font-bold ml-1.5 hover:text-[#1A1208] transition-colors"
            >
              {isLogin ? "Sign Up" : "Sign In"}
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage