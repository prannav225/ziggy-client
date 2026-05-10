import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { GlobalStateContext } from '../context/GlobalStateContext'
import { useContext } from 'react';

const Navbar = () => {
  const { displayCart, isLoggedIn, user, logout } = useContext(GlobalStateContext)
  const [showDropdown, setShowDropdown] = useState(false)

  const getInitials = () => {
    if (!user || !user.name) return '?'
    const names = user.name.split(' ')
    if (names.length > 1) {
      return (names[0].charAt(0) + names[1].charAt(0)).toUpperCase()
    }
    return user.name.slice(0, 2).toUpperCase()
  }

  const handleLogout = () => {
    setShowDropdown(false)
    logout()
  }

  return (
    <div className='w-full flex justify-center items-center z-50 sticky top-4 px-4'>
      <div className='w-full max-w-[1400px] bg-white/85 backdrop-blur-xl border border-[#E8E2DA] shadow-[0_4px_24px_rgba(26,18,8,0.08)] rounded-2xl h-[64px] flex justify-between items-center px-5'>
        
        {/* Logo + Name */}
        <div className='relative flex items-center gap-3'>
          <img 
            src="KITCHEN-TO-HOME LOGO.png" 
            alt="Kitchen-To-Home" 
            className='rounded-xl h-[46px] w-[46px] object-cover shadow-sm border border-[#E8E2DA] transition-transform duration-300 hover:scale-105'
          />
          <div className="hidden md:flex flex-col">
            <span className="text-[13px] font-bold tracking-tight text-[#1A1208] leading-tight">Divya Shree M</span>
            <span className="text-[10px] text-[#6B6560] tracking-tight leading-tight">Full Stack Developer · CSE 4th Year</span>
          </div>
        </div>

        {/* Nav Links */}
        <div className='flex gap-1 items-center'>
          <Link to="/"><button className='px-4 py-2 rounded-xl text-[#1A1208] text-sm font-medium hover:bg-[#F2EDE7] transition-all duration-200'>Home</button></Link>
          <Link to="/about"><button className='px-4 py-2 rounded-xl text-[#1A1208] text-sm font-medium hover:bg-[#F2EDE7] transition-all duration-200'>About</button></Link>
          <Link to="/menu"><button className='px-4 py-2 rounded-xl text-[#1A1208] text-sm font-medium hover:bg-[#F2EDE7] transition-all duration-200'>Menu</button></Link>
          
          {isLoggedIn && (
            <Link to="/orders"><button className='px-4 py-2 rounded-xl text-[#1A1208] text-sm font-medium hover:bg-[#F2EDE7] transition-all duration-200'>Orders</button></Link>
          )}
          
          {displayCart && (
            <Link to="/cart" className='relative'>
              <button className='px-4 py-2 rounded-xl text-[#1A1208] text-sm font-medium hover:bg-[#F2EDE7] transition-all duration-200'>Cart</button>
            </Link>
          )}

          <div className='w-[1px] h-6 bg-[#E8E2DA] mx-2'></div>

          {isLoggedIn ? (
            <div className="relative flex items-center">
              <div
                className="w-9 h-9 rounded-xl bg-[#1A1208] text-[#FAF6F1] flex items-center justify-center text-xs font-bold cursor-pointer transition-all duration-200 hover:bg-[#C87941] hover:scale-105 select-none"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                {getInitials()}
              </div>

              {showDropdown && (
                <div className="absolute top-[50px] right-0 w-[180px] bg-white border border-[#E8E2DA] shadow-[0_8px_32px_rgba(26,18,8,0.12)] rounded-2xl overflow-hidden z-[1000] animate-in fade-in slide-in-from-top-2 duration-200">
                  <Link to="/profile" onClick={() => setShowDropdown(false)}>
                    <div className="p-3 px-4 flex items-center gap-3 hover:bg-[#F2EDE7] transition-colors cursor-pointer text-sm text-[#1A1208] font-medium">
                      <span className="text-base">👤</span> Profile
                    </div>
                  </Link>
                  <Link to="/orders" onClick={() => setShowDropdown(false)}>
                    <div className="p-3 px-4 flex items-center gap-3 hover:bg-[#F2EDE7] transition-colors cursor-pointer text-sm text-[#1A1208] font-medium">
                      <span className="text-base">📦</span> My Orders
                    </div>
                  </Link>
                  <div className="h-[1px] bg-[#E8E2DA] mx-3 my-1"></div>
                  <div className="p-3 px-4 flex items-center gap-3 hover:bg-red-50 text-red-600 transition-colors cursor-pointer text-sm font-medium" onClick={handleLogout}>
                    <span className="text-base">🚪</span> Logout
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login">
              <button className='px-5 py-2 rounded-xl bg-[#1A1208] text-[#FAF6F1] text-sm font-semibold hover:bg-[#C87941] transition-all duration-300 shadow-sm ml-1'>
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar