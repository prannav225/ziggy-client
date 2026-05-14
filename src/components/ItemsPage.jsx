import React, { useState, useEffect, useContext } from 'react'
import { GlobalStateContext } from '../context/GlobalStateContext'
import { Search, X, Leaf, Plus, Minus } from 'lucide-react'

const ItemsPage = () => {
    const { foodData, updateQuantity } = useContext(GlobalStateContext)
    const [selectedCategory, setSelectedCategory] = useState('All')
    const [categories, setCategories] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const [vegOnly, setVegOnly] = useState(false)

    useEffect(() => {
        if (foodData.length > 0) {
            const uniqueCategories = ['All', ...new Set(foodData.map(item => item.Category))]
            setCategories(uniqueCategories)
        }
    }, [foodData])

    let filteredItems = foodData

    if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        filteredItems = filteredItems.filter(item =>
            item.FoodName.toLowerCase().includes(q) ||
            (item.Description && item.Description.toLowerCase().includes(q))
        )
    }

    if (selectedCategory !== 'All') {
        filteredItems = filteredItems.filter(item => item.Category === selectedCategory)
    }

    if (vegOnly) {
        const nonVegKeywords = ['chicken', 'mutton', 'fish', 'prawn', 'egg', 'meat', 'beef', 'pork']
        filteredItems = filteredItems.filter(item => {
            const text = (item.FoodName + ' ' + (item.Description || '') + ' ' + item.Category).toLowerCase()
            return !nonVegKeywords.some(kw => text.includes(kw))
        })
    }

    const handleQuantityChange = async (item, delta) => {
        await updateQuantity(item.FoodID, delta)
    }

    return (
        <div id="items">

            {/* Filters Row */}
            <div className="flex flex-col gap-4 mb-8">

                {/* Category Tabs */}
                <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-hide">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                                selectedCategory === category
                                    ? 'bg-[#1a1a1a] text-white'
                                    : 'bg-[#f5f5f4] text-[#6b6b6b] hover:bg-[#e7e5e4] hover:text-[#1a1a1a]'
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Search + Veg Toggle Row */}
                <div className="flex flex-col sm:flex-row gap-3">
                    {/* Search */}
                    <div className="relative flex-1">
                        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#a8a29e]" />
                        <input
                            type="text"
                            placeholder="Search for a dish..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-[#f5f5f4] border border-[#e7e5e4] rounded-lg py-2.5 pl-10 pr-10 text-sm font-medium text-[#1a1a1a] outline-none focus:border-[#b82609]/60 focus:bg-white focus:shadow-[0_0_0_3px_rgba(184,38,9,0.08)] transition-all placeholder:text-[#a8a29e]"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#a8a29e] hover:text-[#1a1a1a] transition-colors"
                            >
                                <X size={14} />
                            </button>
                        )}
                    </div>

                    {/* Veg Only Toggle */}
                    <button
                        onClick={() => setVegOnly(!vegOnly)}
                        className={`flex items-center gap-2.5 px-4 py-2.5 rounded-lg border text-sm font-medium transition-all shrink-0 ${
                            vegOnly
                                ? 'bg-green-50 border-green-300 text-green-700'
                                : 'bg-[#f5f5f4] border-[#e7e5e4] text-[#6b6b6b] hover:border-[#d4d4d0]'
                        }`}
                    >
                        <Leaf size={14} className={vegOnly ? 'text-green-600' : 'text-[#a8a29e]'} />
                        Veg Only
                        <div className={`w-8 h-4 rounded-full transition-colors relative ${vegOnly ? 'bg-green-500' : 'bg-[#d4d4d0]'}`}>
                            <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full shadow-sm transition-transform ${vegOnly ? 'translate-x-4' : 'translate-x-0.5'}`} />
                        </div>
                    </button>
                </div>
            </div>

            {/* Grid or Empty State */}
            {filteredItems.length === 0 ? (
                <div className="py-24 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-[#f5f5f4] flex items-center justify-center mx-auto mb-5">
                        <Search size={24} className="text-[#a8a29e]" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-[#1a1a1a] mb-2">No dishes found</h3>
                    <p className="text-[#6b6b6b] text-sm mb-6">Try adjusting your search or filters.</p>
                    <button
                        onClick={() => { setSearchQuery(''); setVegOnly(false); setSelectedCategory('All') }}
                        className="px-5 py-2.5 bg-[#1a1a1a] text-white text-sm font-semibold rounded-lg hover:bg-[#b82609] transition-colors"
                    >
                        Clear Filters
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {filteredItems.map((item) => (
                        <div
                            key={item.FoodID}
                            className="bg-white border border-[#e7e5e4] rounded-xl overflow-hidden hover:shadow-[0_4px_20px_rgba(0,0,0,0.07)] hover:-translate-y-0.5 transition-all duration-200 flex flex-col group"
                        >
                            <div className="aspect-[4/3] overflow-hidden bg-[#f5f5f4]">
                                <img
                                    src={item.ImageName}
                                    alt={item.FoodName}
                                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                                    onError={(e) => { e.target.src = 'https://via.placeholder.com/400x300/f5f5f4/a8a29e?text=No+Image' }}
                                />
                            </div>

                            <div className="p-4 flex-1 flex flex-col">
                                <div className="flex items-start justify-between gap-2 mb-1">
                                    <h3 className="text-sm font-semibold text-[#1a1a1a] leading-snug">{item.FoodName}</h3>
                                    <span className="shrink-0 text-[10px] font-semibold text-[#a8a29e] bg-[#f5f5f4] px-2 py-0.5 rounded uppercase tracking-wide">
                                        {item.Category}
                                    </span>
                                </div>

                                <p className="text-sm font-bold text-[#b82609] mb-2">₹{parseFloat(item.Price).toFixed(2)}</p>

                                <p className="text-xs text-[#6b6b6b] line-clamp-2 leading-relaxed flex-1 mb-4">
                                    {item.Description}
                                </p>

                                <div className="mt-auto">
                                    {item.Quantity > 0 ? (
                                        <div className="flex items-center justify-between border border-[#e7e5e4] rounded-lg overflow-hidden">
                                            <button
                                                className="w-10 h-9 flex items-center justify-center text-[#1a1a1a] hover:bg-[#f5f5f4] transition-colors active:scale-90"
                                                onClick={() => handleQuantityChange(item, -1)}
                                            >
                                                <Minus size={14} />
                                            </button>
                                            <span className="text-sm font-bold text-[#1a1a1a]">{item.Quantity}</span>
                                            <button
                                                className="w-10 h-9 flex items-center justify-center text-[#1a1a1a] hover:bg-[#f5f5f4] transition-colors active:scale-90"
                                                onClick={() => handleQuantityChange(item, 1)}
                                            >
                                                <Plus size={14} />
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            className="w-full h-9 bg-[#1a1a1a] text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-[#b82609] transition-colors"
                                            onClick={() => handleQuantityChange(item, 1)}
                                        >
                                            <Plus size={13} /> Add to Cart
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default ItemsPage