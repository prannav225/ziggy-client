import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='w-full flex justify-center items-center mt-20 pb-10 px-4'>
      <div className='w-full max-w-[1400px] bg-[#1A1208] rounded-3xl p-10 md:p-16 flex flex-col items-center relative overflow-hidden'>
        
        {/* Ambient glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#C87941]/6 rounded-full -translate-y-1/2 translate-x-1/2 blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#4A6741]/6 rounded-full translate-y-1/2 -translate-x-1/2 blur-[80px] pointer-events-none"></div>

        <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10'>
          
          {/* Brand col */}
          <div className='flex flex-col gap-5'>
            <h3 className='font-display text-2xl font-normal text-white'>EchoEats</h3>
            <p className='text-white/50 text-sm leading-relaxed font-medium'>
              The world's first voice-powered food delivery experience. Order your favorite meals hands-free.
            </p>
            <div className='flex gap-3'>
              {['FB', 'TW', 'IG', 'LI'].map((social) => (
                <a 
                  key={social}
                  href="#" 
                  className='w-9 h-9 bg-white/8 rounded-xl flex items-center justify-center text-white/60 text-[10px] font-bold hover:bg-[#C87941] hover:text-white hover:scale-110 transition-all border border-white/10'
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
          
          {/* Nav col */}
          <div className='flex flex-col gap-5'>
            <h3 className='text-white/40 text-[10px] font-bold uppercase tracking-widest'>Navigation</h3>
            <ul className='space-y-3'>
              {[
                { to: '/', label: 'Home' },
                { to: '/#items', label: 'Menu' },
                { to: '/about', label: 'About Us' },
                { to: '/orders', label: 'Orders' },
              ].map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-white/55 hover:text-white transition-colors text-sm font-medium flex items-center gap-2 group">
                    <span className="w-1 h-1 bg-[#C87941] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Support col */}
          <div className='flex flex-col gap-5'>
            <h3 className='text-white/40 text-[10px] font-bold uppercase tracking-widest'>Support</h3>
            <ul className='space-y-3'>
              {[
                { to: '/faq', label: 'FAQ' },
                { to: '/terms', label: 'Terms' },
                { to: '/privacy', label: 'Privacy' },
                { to: '/help', label: 'Help Center' },
              ].map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-white/55 hover:text-white transition-colors text-sm font-medium flex items-center gap-2 group">
                    <span className="w-1 h-1 bg-[#4A6741] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Newsletter col */}
          <div className='flex flex-col gap-5'>
            <h3 className='text-white/40 text-[10px] font-bold uppercase tracking-widest'>Newsletter</h3>
            <p className='text-white/50 text-sm font-medium'>Get the latest offers and updates delivered to your inbox.</p>
            <div className='flex flex-col gap-2.5'>
              <input 
                type="email" 
                placeholder="your@email.com" 
                className="bg-white/8 border border-white/12 rounded-xl px-4 py-3 text-white placeholder:text-white/25 text-sm outline-none focus:bg-white/12 focus:border-[#C87941]/50 transition-all"
              />
              <button className="bg-[#C87941] text-white py-3 rounded-xl font-semibold text-xs uppercase tracking-widest hover:bg-[#A8612E] active:scale-95 transition-all shadow-[0_4px_12px_rgba(200,121,65,0.3)]">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        {/* Bottom bar */}
        <div className='w-full mt-14 pt-8 border-t border-white/8 flex flex-col md:flex-row justify-between items-center gap-4 relative z-10'>
          <p className='text-white/30 text-[11px] font-medium uppercase tracking-widest'>© 2026 EchoEats. All rights reserved.</p>
          <p className='text-white/50 text-sm font-medium flex items-center gap-2'>
            Designed with <span className="text-[#C87941] animate-pulse">♥</span> by Divya Shree M
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer