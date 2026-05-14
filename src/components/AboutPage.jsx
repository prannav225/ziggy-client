import React from 'react'
import { Link } from 'react-router-dom'
import { Mic, TrendingUp, Clock, Users, Star, Zap, Brain, Volume2 } from 'lucide-react'

const AboutPage = () => {
  return (
    <div className="w-full min-h-screen bg-white font-sans">

      {/* Hero — Editorial Split */}
      <div className="max-w-[1200px] mx-auto px-6 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs font-semibold text-[#b82609] uppercase tracking-[0.15em] mb-5">About Ziggy</p>
            <h1 className="font-display text-5xl md:text-6xl font-bold text-[#1a1a1a] leading-[1.05] mb-6">
              Voice-powered<br />food delivery,<br />
              <span className="text-[#b82609]">redefined.</span>
            </h1>
            <p className="text-[#6b6b6b] text-lg leading-relaxed max-w-[440px]">
              Ziggy is built on a single belief — ordering food should be as natural as having a conversation. We combined cutting-edge AI with the world's best restaurants to make that happen.
            </p>
          </div>

          {/* Stat block */}
          <div className="grid grid-cols-2 gap-px bg-[#e7e5e4] border border-[#e7e5e4] rounded-2xl overflow-hidden">
            {[
              { n: '500+', l: 'Restaurant Partners', icon: <TrendingUp size={16} className="text-[#b82609]" /> },
              { n: '50k+', l: 'Happy Customers', icon: <Users size={16} className="text-[#b82609]" /> },
              { n: '20 min', l: 'Avg. Delivery', icon: <Clock size={16} className="text-[#b82609]" /> },
              { n: '4.8', l: 'Customer Rating', icon: <Star size={16} className="text-[#b82609]" /> },
            ].map((s, i) => (
              <div key={i} className="bg-white px-8 py-10">
                <div className="flex items-center gap-2 mb-3">{s.icon}<span className="text-xs font-semibold text-[#a8a29e] uppercase tracking-widest">{s.l}</span></div>
                <p className="font-display text-4xl font-bold text-[#1a1a1a]">{s.n}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-[#e7e5e4]" />

      {/* Story & Mission */}
      <div className="max-w-[1200px] mx-auto px-6 py-20 grid md:grid-cols-2 gap-20">
        <div>
          <div className="w-8 h-[2px] bg-[#b82609] mb-6" />
          <h2 className="font-display text-2xl font-bold text-[#1a1a1a] mb-4">Our Story</h2>
          <p className="text-[#6b6b6b] leading-relaxed text-base">
            Kitchen To Home was born from a simple idea: everyone deserves access to delicious, high-quality food — fast, fresh, and effortlessly. What started as a college project has grown into a trusted platform connecting customers with the best restaurants in town through technology that feels invisible.
          </p>
        </div>
        <div>
          <div className="w-8 h-[2px] bg-[#1a1a1a] mb-6" />
          <h2 className="font-display text-2xl font-bold text-[#1a1a1a] mb-4">Our Mission</h2>
          <p className="text-[#6b6b6b] leading-relaxed text-base">
            To bring restaurant-quality meals to your doorstep with unprecedented speed and care. We believe great food combined with effortless technology has the power to turn an ordinary meal into a moment worth remembering.
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-[#e7e5e4]" />

      {/* Voice Technology Feature Block */}
      <div className="bg-[#1a1a1a] py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <p className="text-xs font-semibold text-[#b82609] uppercase tracking-[0.15em] mb-5">Core Technology</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
                Just say the word.
              </h2>
              <p className="text-white/60 text-base leading-relaxed mb-10 max-w-[400px]">
                Our AI voice system understands natural language orders — no menus, no scrolling. Just speak your craving, and Ziggy handles the rest.
              </p>
              <Link to="/menu">
                <button className="px-6 py-3 bg-[#b82609] text-white text-sm font-semibold rounded-lg hover:bg-[#9a2008] transition-colors">
                  Try the Menu
                </button>
              </Link>
            </div>

            <div className="space-y-6">
              {[
                { icon: <Mic size={18} />, title: 'Hands-free Ordering', desc: 'No tapping, no scrolling — just speak what you want.' },
                { icon: <Brain size={18} />, title: 'AI Natural Language', desc: 'Understands context, preferences, and natural phrasing.' },
                { icon: <Zap size={18} />, title: 'Instant Recognition', desc: 'Real-time processing with sub-second response times.' },
                { icon: <Volume2 size={18} />, title: 'Voice Confirmation', desc: 'Audible feedback confirms your order before you commit.' },
              ].map((f, i) => (
                <div key={i} className="flex items-start gap-5">
                  <div className="w-10 h-10 rounded-lg bg-white/8 border border-white/10 flex items-center justify-center text-[#b82609] shrink-0 mt-0.5">
                    {f.icon}
                  </div>
                  <div>
                    <h3 className="text-white text-sm font-semibold mb-1">{f.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Developer Card */}
      <div className="max-w-[1200px] mx-auto px-6 py-24">
        <p className="text-xs font-semibold text-[#b82609] uppercase tracking-[0.15em] mb-12">Meet the Developer</p>
        <div className="flex flex-col md:flex-row items-center md:items-start gap-10 pb-0">
          <div className="w-20 h-20 rounded-2xl bg-[#1a1a1a] text-white text-2xl font-bold flex items-center justify-center shrink-0 select-none">
            DS
          </div>
          <div className="text-center md:text-left">
            <h3 className="font-display text-2xl font-bold text-[#1a1a1a] mb-1">Divya Shree M</h3>
            <p className="text-[#b82609] text-sm font-semibold mb-1">Full Stack Developer</p>
            <p className="text-[#a8a29e] text-xs font-medium uppercase tracking-widest mb-4">Computer Science Engineering — 4th Year</p>
            <div className="w-12 h-[1px] bg-[#e7e5e4] md:mx-0 mx-auto mb-4" />
            <p className="text-[#6b6b6b] text-sm leading-relaxed max-w-[480px]">
              Leading the development of Kitchen To Home with expertise in both frontend (React) and backend (Django) technologies. Designed and implemented the AI voice recognition system and the full-stack architecture powering this platform.
            </p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default AboutPage