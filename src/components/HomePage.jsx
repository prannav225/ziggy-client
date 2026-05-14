import React from 'react'
import { Link } from 'react-router-dom'
import { Mic, ArrowRight, Clock, Users, TrendingUp, Star, UtensilsCrossed, Zap, Brain, Volume2, Leaf } from 'lucide-react'

const TRENDING = [
  { id: 1, name: 'Margherita Pizza', price: '299', img: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&q=80&w=600', tag: 'Pizza' },
  { id: 2, name: 'Spicy Chicken Burger', price: '199', img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=600', tag: 'Burger' },
  { id: 3, name: 'Paneer Tikka Masala', price: '349', img: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=600', tag: 'Indian' },
  { id: 4, name: 'Chocolate Lava Cake', price: '149', img: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&q=80&w=600', tag: 'Dessert' },
]

const CATEGORIES = [
  { icon: <UtensilsCrossed size={22} />, name: 'Pizza' },
  { icon: <Zap size={22} />, name: 'Burgers' },
  { icon: <Leaf size={22} />, name: 'Healthy' },
  { icon: <Star size={22} />, name: 'Indian' },
  { icon: <TrendingUp size={22} />, name: 'Sushi' },
  { icon: <Brain size={22} />, name: 'Desserts' },
]

const HomePage = () => {
  return (
    <div className="w-full bg-white font-sans">

      {/* ── HERO ── */}
      <section className="w-full min-h-[88vh] flex flex-col justify-center items-center border-b border-[#e7e5e4] relative px-6">
        <div className="max-w-[740px] w-full text-center">
          <p className="text-xs font-semibold text-[#b82609] uppercase tracking-[0.15em] mb-5">Voice-Powered Food Delivery</p>
          <h1 className="font-display text-5xl md:text-7xl font-bold text-[#1a1a1a] leading-[1.05] tracking-tight mb-8">
            Discover the best<br />food in{' '}
            <span className="text-[#b82609]">your city</span>
          </h1>

          {/* Search bar */}
          <div className="w-full max-w-[680px] mx-auto bg-white border border-[#e7e5e4] rounded-xl shadow-[0_2px_16px_rgba(0,0,0,0.06)] p-2 flex items-center gap-2 hover:shadow-[0_4px_24px_rgba(0,0,0,0.1)] hover:border-[#d4d4d0] transition-all">
            <div className="hidden sm:flex items-center gap-2 px-3 border-r border-[#e7e5e4] shrink-0">
              <div className="w-2 h-2 rounded-full bg-[#b82609]" />
              <span className="text-sm font-medium text-[#6b6b6b] whitespace-nowrap">Current Location</span>
            </div>
            <input
              type="text"
              placeholder="Search for restaurants, cuisine or a dish..."
              className="flex-1 bg-transparent border-none outline-none text-sm font-medium text-[#1a1a1a] placeholder:text-[#a8a29e] px-3 py-2"
            />
            <button
              className="h-10 w-10 shrink-0 rounded-lg bg-[#b82609] flex items-center justify-center text-white hover:bg-[#9a2008] transition-colors"
              title="Order with your voice"
            >
              <Mic size={16} />
            </button>
          </div>

          {/* Trending quick-links */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <span className="text-[#a8a29e] text-xs font-semibold uppercase tracking-widest">Trending:</span>
            {['Pizza', 'Biryani', 'Burgers', 'Sushi', 'Desserts'].map((tag) => (
              <Link to="/menu" key={tag}>
                <span className="px-3.5 py-1.5 text-xs font-medium rounded-lg border border-[#e7e5e4] text-[#6b6b6b] hover:border-[#b82609] hover:text-[#b82609] bg-white transition-colors cursor-pointer">
                  {tag}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-[#e7e5e4]">
          <div className="max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-[#e7e5e4]">
            {[
              { n: '500+', l: 'Restaurants', icon: <TrendingUp size={14} /> },
              { n: '20 min', l: 'Delivery', icon: <Clock size={14} /> },
              { n: '50k+', l: 'Customers', icon: <Users size={14} /> },
              { n: '4.8', l: 'Rating', icon: <Star size={14} /> },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-3 px-6 py-4">
                <span className="text-[#a8a29e]">{s.icon}</span>
                <div>
                  <p className="font-display text-xl font-bold text-[#1a1a1a]">{s.n}</p>
                  <p className="text-[10px] font-semibold text-[#a8a29e] uppercase tracking-widest">{s.l}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRENDING SECTION ── */}
      <section className="max-w-[1300px] mx-auto px-6 py-20">
        <div className="flex justify-between items-end mb-10">
          <div>
            <p className="text-xs font-semibold text-[#b82609] uppercase tracking-[0.15em] mb-2">Trending</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1a1a1a]">Popular in your city</h2>
          </div>
          <Link to="/menu" className="hidden md:flex items-center gap-1.5 text-sm font-semibold text-[#6b6b6b] hover:text-[#1a1a1a] transition-colors">
            See all <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TRENDING.map((item) => (
            <Link to="/menu" key={item.id} className="group bg-white border border-[#e7e5e4] rounded-xl overflow-hidden hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition-all duration-200 flex flex-col">
              <div className="aspect-[4/3] overflow-hidden bg-[#f5f5f4] relative">
                <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500" />
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[10px] font-bold text-[#1a1a1a] px-2.5 py-1 rounded uppercase tracking-wider border border-[#e7e5e4]">
                  {item.tag}
                </span>
              </div>
              <div className="p-4 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-[#1a1a1a]">{item.name}</h3>
                  <p className="text-sm font-bold text-[#b82609] mt-0.5">₹{item.price}</p>
                </div>
                <div className="w-9 h-9 rounded-lg border border-[#e7e5e4] flex items-center justify-center text-[#1a1a1a] group-hover:bg-[#b82609] group-hover:border-[#b82609] group-hover:text-white transition-colors">
                  <span className="text-lg font-bold leading-none">+</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <Link to="/menu" className="md:hidden mt-6 block">
          <button className="w-full py-3 border border-[#e7e5e4] rounded-xl text-sm font-semibold text-[#1a1a1a] hover:bg-[#f5f5f4] transition-colors flex items-center justify-center gap-2">
            See Full Menu <ArrowRight size={14} />
          </button>
        </Link>
      </section>

      {/* ── CATEGORIES SECTION ── */}
      <section className="border-y border-[#e7e5e4] bg-[#f5f5f4]">
        <div className="max-w-[1300px] mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-3">What are you craving?</h2>
            <p className="text-[#6b6b6b] text-sm max-w-[380px] mx-auto">Browse by category and find exactly what you're looking for.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {CATEGORIES.map((cat, i) => (
              <Link to="/menu" key={i}>
                <div className="bg-white border border-[#e7e5e4] rounded-xl p-6 flex flex-col items-center gap-3 hover:border-[#b82609]/40 hover:shadow-[0_4px_16px_rgba(184,38,9,0.08)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group">
                  <div className="w-12 h-12 rounded-xl bg-[#f5f5f4] flex items-center justify-center text-[#6b6b6b] group-hover:text-[#b82609] group-hover:bg-[#fef2f2] transition-colors border border-[#e7e5e4]">
                    {cat.icon}
                  </div>
                  <span className="text-sm font-semibold text-[#1a1a1a]">{cat.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── VOICE USP SECTION ── */}
      <section className="max-w-[1300px] mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Dark Card */}
          <div className="bg-[#1a1a1a] rounded-2xl p-10 md:p-14 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#b82609]/15 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
            <div className="relative z-10">
              <div className="w-12 h-12 bg-[#b82609] rounded-xl flex items-center justify-center mb-8">
                <Mic size={20} className="text-white" />
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-bold leading-tight mb-5">
                Just say the word.<br />We'll do the rest.
              </h2>
              <p className="text-white/60 text-base leading-relaxed mb-8 max-w-[380px]">
                Our AI voice assistant "Ziggy" understands natural language. Say "I want a large pepperoni pizza" and it's done.
              </p>
              <Link to="/menu">
                <button className="flex items-center gap-2 px-6 py-3 bg-[#b82609] text-white text-sm font-semibold rounded-lg hover:bg-[#9a2008] transition-colors">
                  Try the Menu <ArrowRight size={14} />
                </button>
              </Link>
            </div>
          </div>

          {/* Steps */}
          <div className="space-y-8">
            {[
              { step: '01', icon: <Mic size={16} />, title: 'Tap the Mic', desc: 'Find the floating microphone icon visible on every page of the app.' },
              { step: '02', icon: <Brain size={16} />, title: 'Speak Naturally', desc: '"I\'m craving spicy noodles and a cold coke" — just like talking to a friend.' },
              { step: '03', icon: <Volume2 size={16} />, title: 'Confirm & Relax', desc: 'Ziggy builds your cart instantly. Confirm and track your order in real-time.' },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-5 group">
                <div className="w-12 h-12 rounded-xl border border-[#e7e5e4] bg-white flex items-center justify-center text-[#b82609] font-display font-bold text-sm shrink-0 group-hover:bg-[#b82609] group-hover:border-[#b82609] group-hover:text-white transition-all duration-200">
                  {item.step}
                </div>
                <div className="pt-2">
                  <h3 className="text-base font-bold text-[#1a1a1a] mb-1">{item.title}</h3>
                  <p className="text-sm text-[#6b6b6b] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}

export default HomePage