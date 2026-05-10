import React, { useState, useEffect, useContext } from 'react'
import { GlobalStateContext } from '../context/GlobalStateContext'

const ItemsPage = () => {
    const { foodData, updateQuantity } = useContext(GlobalStateContext)
    const [selectedCategory, setSelectedCategory] = useState('All')
    const [categories, setCategories] = useState([])

    useEffect(() => {
        if (foodData.length > 0) {
            const uniqueCategories = ['All', ...new Set(foodData.map(item => item.Category))]
            setCategories(uniqueCategories)
        }
    }, [foodData])

    const filteredItems = selectedCategory === 'All' 
        ? foodData 
        : foodData.filter(item => item.Category === selectedCategory)

    const handleQuantityChange = async (item, delta) => {
        await updateQuantity(item.FoodID, delta)
    }

    return (
        <div className='max-w-[1400px] mx-auto px-4 py-8' id='items'>
            {/* Category Filter Bar */}
            <div className='flex justify-center mb-10'>
                <div className='inline-flex flex-wrap justify-center gap-1.5 p-1.5 bg-[#1A1208] rounded-2xl shadow-[0_4px_20px_rgba(26,18,8,0.15)] overflow-x-auto max-w-full'>
                    {categories.map((category) => (
                        <button
                            key={category}
                            className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                                selectedCategory === category 
                                ? 'bg-white text-[#1A1208] shadow-sm' 
                                : 'text-white/70 hover:text-white hover:bg-white/10'
                            }`}
                            onClick={() => setSelectedCategory(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>
            
            {/* Food Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredItems.map((item) => (
                    <div key={item.FoodID} className="bg-white rounded-2xl overflow-hidden hover:shadow-[0_8px_32px_rgba(26,18,8,0.1)] hover:-translate-y-1 transition-all duration-300 border border-[#E8E2DA] flex flex-col group">
                        <div className="aspect-square overflow-hidden bg-[#F2EDE7]">
                            <img 
                                src={item.ImageName} 
                                alt={item.FoodName}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                onError={(e) => {
                                    e.target.src = "https://via.placeholder.com/300x300/C87941/ffffff?text=Food"
                                }}
                            />
                        </div>
                        
                        <div className="p-5 flex-1 flex flex-col">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-base font-bold text-[#1A1208] leading-tight">{item.FoodName}</h3>
                                <span className="inline-block bg-[#F2EDE7] text-[#6B6560] text-[9px] font-bold px-2 py-1 rounded-lg uppercase tracking-wider shrink-0 ml-2">
                                    {item.Category}
                                </span>
                            </div>
                            
                            <p className="text-lg font-bold text-[#C87941] mb-2">₹{parseFloat(item.Price).toFixed(2)}</p>
                            
                            <p className="text-sm text-[#6B6560] line-clamp-2 mb-4 flex-1 leading-relaxed">
                                {item.Description}
                            </p>
                            
                            <div className="mt-auto">
                                {item.Quantity > 0 ? (
                                    <div className="flex items-center justify-between bg-[#F2EDE7] rounded-xl p-1 border border-[#E8E2DA]">
                                        <button 
                                            className="w-9 h-9 rounded-lg bg-[#1A1208] text-white flex items-center justify-center hover:bg-[#C87941] transition-colors active:scale-90"
                                            onClick={() => handleQuantityChange(item, -1)}
                                        >
                                            <span className="text-lg font-bold leading-none">−</span>
                                        </button>
                                        <span className="font-bold text-[#1A1208] text-base">{item.Quantity}</span>
                                        <button 
                                            className="w-9 h-9 rounded-lg bg-[#1A1208] text-white flex items-center justify-center hover:bg-[#C87941] transition-colors active:scale-90"
                                            onClick={() => handleQuantityChange(item, 1)}
                                        >
                                            <span className="text-lg font-bold leading-none">+</span>
                                        </button>
                                    </div>
                                ) : (
                                    <button 
                                        className="w-full h-10 bg-[#1A1208] text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:bg-[#C87941] active:scale-[0.98] transition-all duration-200 shadow-[0_2px_8px_rgba(26,18,8,0.15)]" 
                                        onClick={() => handleQuantityChange(item, 1)}
                                    >
                                        <span className="text-base font-bold">+</span>
                                        Add to Cart
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ItemsPage