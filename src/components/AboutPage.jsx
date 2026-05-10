import React from 'react'

const AboutPage = () => {
  return (
    <div className="w-full min-h-screen bg-[#FAF6F1] font-sans py-16 px-4">
      
      {/* Hero Header */}
      <div className="max-w-[1200px] mx-auto text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-[#F2EDE7] border border-[#E8E2DA] px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-[#6B6560] mb-6">
          🍽️ About Us
        </div>
        <h1 className="font-display text-5xl md:text-7xl font-normal text-[#1A1208] mb-4 leading-tight">
          About <span className="text-[#C87941] italic">EchoEats</span>
        </h1>
        <p className="text-lg text-[#6B6560] font-medium max-w-[540px] mx-auto leading-relaxed">
          Voice-Powered Food Delivery — Order with your voice, eat with pleasure
        </p>
      </div>

      <div className="max-w-[1200px] mx-auto space-y-10">
        
        {/* Dark Feature Block */}
        <div className="bg-[#1A1208] rounded-3xl p-10 md:p-16 text-white text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#C87941]/8 rounded-full -translate-y-1/2 translate-x-1/2 blur-[80px]"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#4A6741]/8 rounded-full translate-y-1/2 -translate-x-1/2 blur-[60px]"></div>
          
          <div className="inline-block bg-white/10 border border-white/15 px-5 py-2 rounded-full text-xs font-bold tracking-widest mb-8 text-white/80">
            🚀 INNOVATION
          </div>
          
          <h2 className="font-display text-4xl md:text-5xl font-normal mb-6 text-white leading-tight relative z-10">
            Voice-Powered Ordering System
          </h2>
          
          <p className="text-base md:text-lg leading-relaxed max-w-[800px] mx-auto text-white/70 mb-12 font-medium relative z-10">
            EchoEats introduces a revolutionary way to order food — just use your voice! 
            Our advanced AI technology allows you to browse menus, place orders, 
            and track deliveries hands-free. Simply speak your cravings and we'll handle the rest.
          </p>
          
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 relative z-10">
            {[
              { icon: '🎤', text: 'Hands-free ordering' },
              { icon: '🗣️', text: 'AI Natural Language' },
              { icon: '⚡', text: 'Instant recognition' },
              { icon: '🔊', text: 'Voice confirmation' }
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-2.5 bg-white/8 border border-white/12 px-5 py-2.5 rounded-full hover:bg-white/15 transition-all cursor-default">
                <span className="text-lg">{f.icon}</span>
                <span className="text-sm font-medium text-white/80">{f.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Story & Mission */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-10 border border-[#E8E2DA] hover:shadow-[0_8px_32px_rgba(26,18,8,0.08)] transition-all duration-500">
            <h2 className="text-xl font-bold text-[#1A1208] mb-2 flex items-center gap-3">
              <span className="w-8 h-1 bg-[#C87941] rounded-full inline-block"></span>
              Our Story
            </h2>
            <p className="text-[#6B6560] leading-relaxed mt-4 font-medium">
              EchoEats was born from a simple idea: everyone deserves access to delicious, 
              high-quality food delivered fast and fresh. What started as a vision for accessibility 
              has now grown into a trusted food delivery platform connecting 
              customers with the best restaurants in town through cutting-edge technology.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-10 border border-[#E8E2DA] hover:shadow-[0_8px_32px_rgba(26,18,8,0.08)] transition-all duration-500">
            <h2 className="text-xl font-bold text-[#1A1208] mb-2 flex items-center gap-3">
              <span className="w-8 h-1 bg-[#4A6741] rounded-full inline-block"></span>
              Our Mission
            </h2>
            <p className="text-[#6B6560] leading-relaxed mt-4 font-medium">
              To bring restaurant-quality meals to your doorstep with unprecedented speed 
              and care. We believe that great food combined with effortless technology has the power 
              to bring people together and make every moment special.
            </p>
          </div>
        </div>

        {/* Developer Card */}
        <div>
          <h2 className="font-display text-3xl font-normal text-[#1A1208] text-center mb-10">
            Meet the Developer
          </h2>
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-3xl p-10 text-center border border-[#E8E2DA] border-t-4 border-t-[#4A6741] shadow-[0_4px_24px_rgba(26,18,8,0.07)] relative overflow-hidden">
              <div className="absolute top-4 right-6 text-6xl opacity-[0.04] pointer-events-none select-none">👩‍💻</div>
              <div className="w-20 h-20 bg-[#1A1208] rounded-2xl mx-auto flex items-center justify-center text-2xl mb-6 text-[#FAF6F1] font-bold shadow-[0_4px_16px_rgba(26,18,8,0.2)]">DS</div>
              <h3 className="font-display text-3xl font-normal text-[#1A1208] mb-2">Divya Shree M</h3>
              <p className="text-[#C87941] font-semibold text-base mb-1">Full Stack Developer</p>
              <p className="text-[#6B6560] text-sm font-medium uppercase tracking-widest mb-6">Computer Science Engineering — 4th Year</p>
              
              <div className="h-px bg-[#E8E2DA] w-2/3 mx-auto mb-6"></div>
              
              <p className="text-[#6B6560] leading-relaxed font-medium text-sm max-w-[420px] mx-auto">
                Leading the development of EchoEats with expertise in both frontend and backend technologies.
                Implemented the AI voice recognition system and robust full stack architecture to ensure 
                a seamless user experience.
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 pb-8">
          {[
            { n: '500+', l: 'Restaurant Partners' },
            { n: '50k+', l: 'Happy Customers' },
            { n: '20min', l: 'Avg. Delivery Time' },
            { n: '4.8★', l: 'Customer Rating' }
          ].map((s, i) => (
            <div key={i} className="bg-white rounded-2xl p-8 text-center border border-[#E8E2DA] hover:border-[#C87941]/30 hover:shadow-[0_4px_20px_rgba(26,18,8,0.06)] transition-all">
              <h3 className="font-display text-4xl font-normal text-[#C87941] mb-2">{s.n}</h3>
              <p className="text-[#6B6560] text-xs font-bold uppercase tracking-widest">{s.l}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AboutPage