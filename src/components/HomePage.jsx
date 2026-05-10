import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

const HomePage = () => {
  useEffect(() => {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'absolute inset-0 w-full h-full pointer-events-none z-[1]';
    
    for (let i = 0; i < 15; i++) {
      const particle = document.createElement('div');
      particle.className = 'absolute w-1 h-1 bg-[#C87941] rounded-full opacity-20 animate-particle-float';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 10 + 's';
      particle.style.animationDuration = 10 + Math.random() * 10 + 's';
      particlesContainer.appendChild(particle);
    }
    
    const heroSection = document.querySelector('.hero-outer');
    if (heroSection) heroSection.appendChild(particlesContainer);
    
    return () => {
      if (particlesContainer.parentNode) {
        particlesContainer.remove();
      }
    };
  }, []);

  return (
    <div className='hero-outer w-full flex justify-center items-center min-h-screen bg-[#FAF6F1] relative overflow-hidden font-sans z-0'>
        {/* Warm ambient wash — no blue */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <div className="absolute top-[10%] right-[15%] w-[500px] h-[500px] bg-[#C87941]/6 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[10%] left-[5%] w-[400px] h-[400px] bg-[#4A6741]/5 rounded-full blur-[100px]"></div>
        </div>

        <div className='w-[90%] max-w-[1400px] flex flex-col-reverse md:flex-row items-center justify-between gap-12 md:gap-[60px] relative z-10 py-20'>
            
            {/* Left — Text */}
            <div className='flex-1 max-w-[600px] text-[#1A1208] relative'>
                <div className="inline-flex items-center gap-2 bg-[#1A1208]/5 border border-[#E8E2DA] px-4 py-2 rounded-full text-xs font-semibold text-[#6B6560] uppercase tracking-widest mb-8">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4A6741] animate-pulse"></span>
                  Voice-Powered Food Delivery
                </div>

                <h1 className='font-display text-5xl md:text-7xl font-normal leading-[1.05] mb-6 tracking-tight'>
                    <span className='block overflow-hidden animate-reveal-text text-[#1A1208]'>Delicious</span>
                    <span className='block overflow-hidden animate-reveal-text [animation-delay:0.2s] text-[#C87941] italic'>Food</span>
                    <span className='block overflow-hidden animate-reveal-text [animation-delay:0.4s] text-[#1A1208]'>Delivered to you</span>
                </h1>
                
                <p className='text-base leading-relaxed text-[#6B6560] mb-10 max-w-[480px] relative pl-5 border-l-2 border-[#C87941] opacity-0 animate-fade-in-up [animation-delay:0.4s] [animation-fill-mode:forwards]'>
                  Experience the best cuisine from top restaurants in your city. Fresh, hot, and delivered right to your doorstep in under 20 minutes.
                </p>

                <div className='flex gap-4 flex-wrap justify-center md:justify-start opacity-0 animate-fade-in-up [animation-delay:0.6s] [animation-fill-mode:forwards]'>
                    <Link to="/menu">
                        <button className='px-8 h-[52px] rounded-xl bg-[#1A1208] text-[#FAF6F1] text-sm font-semibold cursor-pointer transition-all duration-300 hover:bg-[#C87941] hover:translate-y-[-2px] hover:shadow-[0_12px_30px_rgba(200,121,65,0.35)] shadow-[0_4px_16px_rgba(26,18,8,0.2)]'>
                          Order Now →
                        </button>
                    </Link>
                    <Link to="/about">
                        <button className='px-8 h-[52px] rounded-xl bg-transparent border border-[#E8E2DA] text-[#1A1208] text-sm font-semibold cursor-pointer transition-all duration-300 hover:border-[#1A1208] hover:bg-[#F2EDE7] hover:translate-y-[-2px]'>
                          Learn More
                        </button>
                    </Link>
                </div>

                <div className='flex gap-10 mt-14 flex-wrap justify-center md:justify-start opacity-0 animate-fade-in-up [animation-delay:0.8s] [animation-fill-mode:forwards]'>
                    <div className='flex flex-col items-start'>
                        <span className='font-display text-3xl md:text-4xl font-normal text-[#C87941]'>500+</span>
                        <span className='text-xs text-[#6B6560] uppercase tracking-widest mt-1 font-medium'>Restaurants</span>
                    </div>
                    <div className='flex flex-col items-start'>
                        <span className='font-display text-3xl md:text-4xl font-normal text-[#C87941]'>20min</span>
                        <span className='text-xs text-[#6B6560] uppercase tracking-widest mt-1 font-medium'>Delivery</span>
                    </div>
                    <div className='flex flex-col items-start'>
                        <span className='font-display text-3xl md:text-4xl font-normal text-[#C87941]'>50k+</span>
                        <span className='text-xs text-[#6B6560] uppercase tracking-widest mt-1 font-medium'>Customers</span>
                    </div>
                </div>
            </div>

            {/* Right — Image */}
            <div className='flex-1 flex justify-center items-center relative opacity-0 animate-slide-in-right [animation-delay:0.3s] [animation-fill-mode:forwards]'>
                <div className='absolute w-[300px] h-[300px] md:w-[480px] md:h-[480px] bg-[#C87941]/8 rounded-full blur-[60px] animate-morph-blob-1'></div>
                <div className='absolute w-[260px] h-[260px] md:w-[420px] md:h-[420px] bg-[#4A6741]/6 rounded-full blur-[70px] animate-morph-blob-2'></div>
                
                <img 
                  src="KITCHEN-TO-HOME LOGO.png" 
                  alt="Delicious Food" 
                  className='w-full max-w-[260px] md:max-w-[460px] rounded-3xl object-cover relative z-10 shadow-[0_24px_64px_rgba(26,18,8,0.12)] transition-all duration-700 hover:scale-105 animate-float-image border border-[#E8E2DA]'
                />
                
                <div className='absolute top-[10%] right-[5%] w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-xl shadow-[0_4px_16px_rgba(26,18,8,0.1)] z-20 animate-float border border-[#E8E2DA]'>⚡</div>
                <div className='absolute bottom-[20%] left-0 w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-xl shadow-[0_4px_16px_rgba(26,18,8,0.1)] z-20 animate-float [animation-delay:1s] border border-[#E8E2DA]'>🔥</div>
                <div className='absolute top-[30%] left-[10%] w-10 h-10 bg-white rounded-xl flex items-center justify-center text-lg shadow-[0_4px_16px_rgba(26,18,8,0.1)] z-20 animate-float [animation-delay:2s] border border-[#E8E2DA]'>🍕</div>
            </div>
        </div>
    </div>
  )
}

export default HomePage