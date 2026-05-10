import React from 'react'
import ItemsPage from './ItemsPage'

const MenuPage = () => {
  return (
    <div className="w-full min-h-screen bg-[#FAF6F1] py-16 px-4">
      {/* Page Header */}
      <div className="max-w-[1200px] mx-auto mb-14">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 bg-white rounded-3xl p-10 md:p-14 border border-[#E8E2DA] shadow-[0_4px_24px_rgba(26,18,8,0.06)] relative overflow-hidden">
          
          {/* Left text */}
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-[#F2EDE7] border border-[#E8E2DA] px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-[#6B6560] mb-6">
              🍽️ Our Menu
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-normal text-[#1A1208] leading-tight mb-4">
              What would you like <span className="text-[#C87941] italic">today?</span>
            </h1>
            <p className="text-[#6B6560] text-base font-medium max-w-[460px] leading-relaxed">
              Freshly prepared dishes made with love — explore our full menu and add your favourites to the cart.
            </p>
          </div>
          
          {/* Right emoji icons */}
          <div className="flex flex-wrap justify-center gap-4">
            {['🥘', '🍛', '🧆', '🍮'].map((emoji, i) => (
              <div key={i} className="w-18 h-18 md:w-20 md:h-20 bg-[#F2EDE7] rounded-2xl flex items-center justify-center text-3xl border border-[#E8E2DA] hover:scale-110 hover:bg-[#C87941]/10 transition-all cursor-default shadow-sm" style={{width:'76px',height:'76px'}}>
                {emoji}
              </div>
            ))}
          </div>

          {/* Decorative line */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#C87941] via-[#4A6741] to-transparent"></div>
        </div>
      </div>

      {/* Items Grid */}
      <div className="max-w-[1400px] mx-auto">
        <ItemsPage />
      </div>
    </div>
  )
}

export default MenuPage
