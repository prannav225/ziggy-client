import React, { useState } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { GlobalStateContext } from '../context/GlobalStateContext'
import { Search, ShoppingBag, LogOut, User, Package, ChevronDown } from 'lucide-react'

const Navbar = () => {
  const { displayCart, isLoggedIn, user, logout } = useContext(GlobalStateContext)
  const [showDropdown, setShowDropdown] = useState(false)
  const navigate = useNavigate()

  const getInitials = () => {
    if (!user || !user.name) return '?'
    const names = user.name.split(' ')
    if (names.length > 1) return (names[0][0] + names[1][0]).toUpperCase()
    return user.name.slice(0, 2).toUpperCase()
  }

  const handleLogout = () => {
    setShowDropdown(false)
    logout()
  }

  const navLinkStyles = ({ isActive }) =>
    `relative px-1 py-2 text-sm font-medium transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:rounded-full after:transition-all after:duration-200 ${
      isActive
        ? 'text-[#b82609] after:w-full after:bg-[#b82609]'
        : 'text-[#6b6b6b] hover:text-[#1a1a1a] after:w-0 hover:after:w-full hover:after:bg-[#e7e5e4]'
    }`

  return (
    <div className="w-full sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-[#e7e5e4]">
      <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between gap-8">

        {/* Left: Logo + Search */}
        <div className="flex items-center gap-8">
          <Link to="/" className="shrink-0">
            <img src="ziggy_nav_logo.png" alt="Ziggy" className="h-8 w-auto" />
          </Link>

          {/* Search */}
          <div className="hidden lg:flex items-center gap-2.5 bg-[#f5f5f4] border border-[#e7e5e4] rounded-lg px-3.5 py-2 w-72 transition-all focus-within:bg-white focus-within:border-[#b82609]/50 focus-within:shadow-[0_0_0_3px_rgba(184,38,9,0.08)]">
            <Search size={15} className="text-[#a8a29e] shrink-0" />
            <input
              type="text"
              placeholder="Search dishes, restaurants..."
              className="bg-transparent border-none outline-none text-sm w-full text-[#1a1a1a] placeholder:text-[#a8a29e] font-medium"
              onKeyDown={(e) => { if (e.key === 'Enter') navigate('/menu') }}
            />
          </div>
        </div>

        {/* Center: Nav links */}
        <nav className="hidden md:flex items-center gap-7">
          <NavLink to="/" end className={navLinkStyles}>Home</NavLink>
          <NavLink to="/about" className={navLinkStyles}>About</NavLink>
          <NavLink to="/menu" className={navLinkStyles}>Menu</NavLink>
          {isLoggedIn && <NavLink to="/orders" className={navLinkStyles}>Orders</NavLink>}
        </nav>

        {/* Right: Cart + Account */}
        <div className="flex items-center gap-3">
          {displayCart && (
            <NavLink to="/cart" className={({ isActive }) =>
              `p-2 rounded-lg transition-colors ${isActive ? 'bg-[#fef2f2] text-[#b82609]' : 'text-[#6b6b6b] hover:bg-[#f5f5f4] hover:text-[#1a1a1a]'}`
            }>
              <ShoppingBag size={18} />
            </NavLink>
          )}

          {isLoggedIn ? (
            <div className="relative">
              <button
                className="flex items-center gap-2 pl-1 pr-3 py-1.5 rounded-lg hover:bg-[#f5f5f4] transition-colors"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <div className="w-7 h-7 rounded-md bg-[#1a1a1a] text-white text-xs font-bold flex items-center justify-center select-none">
                  {getInitials()}
                </div>
                <ChevronDown size={14} className="text-[#a8a29e]" />
              </button>

              {showDropdown && (
                <div className="absolute top-[calc(100%+8px)] right-0 w-48 bg-white border border-[#e7e5e4] shadow-[0_8px_24px_rgba(0,0,0,0.08)] rounded-xl overflow-hidden z-50">
                  <div className="px-4 py-3 border-b border-[#f5f5f4]">
                    <p className="text-xs font-semibold text-[#1a1a1a] truncate">{user?.name}</p>
                    <p className="text-[11px] text-[#a8a29e] truncate">{user?.email}</p>
                  </div>
                  <Link to="/profile" onClick={() => setShowDropdown(false)}>
                    <div className="px-4 py-2.5 flex items-center gap-3 hover:bg-[#f5f5f4] transition-colors cursor-pointer text-sm text-[#1a1a1a]">
                      <User size={14} className="text-[#a8a29e]" /> Profile
                    </div>
                  </Link>
                  <Link to="/orders" onClick={() => setShowDropdown(false)}>
                    <div className="px-4 py-2.5 flex items-center gap-3 hover:bg-[#f5f5f4] transition-colors cursor-pointer text-sm text-[#1a1a1a]">
                      <Package size={14} className="text-[#a8a29e]" /> My Orders
                    </div>
                  </Link>
                  <div className="border-t border-[#f5f5f4]">
                    <div
                      className="px-4 py-2.5 flex items-center gap-3 hover:bg-red-50 text-red-600 transition-colors cursor-pointer text-sm"
                      onClick={handleLogout}
                    >
                      <LogOut size={14} /> Logout
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login">
              <button className="px-4 py-2 text-sm font-semibold bg-[#1a1a1a] text-white rounded-lg hover:bg-[#b82609] transition-colors">
                Sign In
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar