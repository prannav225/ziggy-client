import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { GlobalStateContext } from '../context/GlobalStateContext'
import { Package, FileText, CheckCircle, ChefHat, Bike, UtensilsCrossed, RefreshCw, Star, ArrowRight } from 'lucide-react'

const OrdersPage = () => {
    const { isLoggedIn, user, foodData, updateQuantity } = useContext(GlobalStateContext)
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        if (!isLoggedIn) { navigate('/login', { state: { from: { pathname: '/orders' } } }); return }
        fetchOrders()
        const id = setInterval(fetchOrders, 5000)
        return () => clearInterval(id)
    }, [isLoggedIn])

    const fetchOrders = async () => {
        try {
            const res = await fetch(`http://localhost:8000/orders/${user.user_id}/`)
            const data = await res.json()
            setOrders(Array.isArray(data) ? data : [])
        } catch { setOrders([]) }
        finally { setLoading(false) }
    }

    const handleReorder = async (order) => {
        for (const orderItem of order.items) {
            const foodItem = foodData.find(f => f.FoodName === orderItem.name)
            if (foodItem) await updateQuantity(foodItem.FoodID, orderItem.quantity)
        }
        navigate('/cart')
    }

    const statusConfig = {
        placed:           { label: 'Placed',         color: 'text-amber-600',  bg: 'bg-amber-50',   border: 'border-amber-200',   icon: <FileText size={12} /> },
        confirmed:        { label: 'Confirmed',       color: 'text-blue-600',   bg: 'bg-blue-50',    border: 'border-blue-200',    icon: <CheckCircle size={12} /> },
        preparing:        { label: 'Preparing',       color: 'text-orange-600', bg: 'bg-orange-50',  border: 'border-orange-200',  icon: <ChefHat size={12} /> },
        'out-for-delivery': { label: 'Out for Delivery', color: 'text-sky-600', bg: 'bg-sky-50',     border: 'border-sky-200',     icon: <Bike size={12} /> },
        delivered:        { label: 'Delivered',       color: 'text-green-600',  bg: 'bg-green-50',   border: 'border-green-200',   icon: <UtensilsCrossed size={12} /> },
    }

    const getStatus = (s) => statusConfig[s] || { label: s || 'Pending', color: 'text-[#6b6b6b]', bg: 'bg-[#f5f5f4]', border: 'border-[#e7e5e4]', icon: <Package size={12} /> }

    if (!isLoggedIn) return null

    return (
        <div className="max-w-[1000px] mx-auto px-6 py-12 font-sans min-h-screen">

            <div className="mb-10">
                <p className="text-xs font-semibold text-[#b82609] uppercase tracking-[0.15em] mb-2">History</p>
                <h1 className="font-display text-4xl font-bold text-[#1a1a1a]">Orders</h1>
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-24 gap-3 text-[#6b6b6b]">
                    <div className="w-5 h-5 border-2 border-[#1a1a1a] border-t-transparent rounded-full animate-spin" />
                    <span className="text-sm font-medium">Fetching orders...</span>
                </div>
            ) : !orders.length ? (
                <div className="py-24 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-[#f5f5f4] flex items-center justify-center mx-auto mb-5">
                        <Package size={24} className="text-[#a8a29e]" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-[#1a1a1a] mb-2">No orders yet</h3>
                    <p className="text-[#6b6b6b] text-sm mb-6">Hungry? Order something delicious from our menu.</p>
                    <button
                        onClick={() => navigate('/menu')}
                        className="px-5 py-2.5 bg-[#1a1a1a] text-white text-sm font-semibold rounded-lg hover:bg-[#b82609] transition-colors flex items-center gap-2 mx-auto"
                    >
                        Browse Menu <ArrowRight size={14} />
                    </button>
                </div>
            ) : (
                <div className="space-y-4">
                    {orders.map((order) => {
                        const s = getStatus(order.order_status)
                        return (
                            <div key={order.order_id} className="bg-white border border-[#e7e5e4] rounded-xl overflow-hidden hover:shadow-[0_2px_16px_rgba(0,0,0,0.06)] transition-shadow">
                                {/* Header */}
                                <div className="px-6 py-4 border-b border-[#e7e5e4] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                    <div className="flex items-center gap-3">
                                        <span className="text-xs font-bold text-[#a8a29e] uppercase tracking-widest">Order #{order.order_id}</span>
                                        <span className="text-[#e7e5e4]">·</span>
                                        <span className="text-xs text-[#a8a29e]">
                                            {new Date(order.order_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border text-xs font-semibold ${s.bg} ${s.color} ${s.border}`}>
                                        {s.icon} {s.label}
                                    </span>
                                </div>

                                {/* Items */}
                                <div className="px-6 py-4 space-y-2">
                                    {order.items?.map((item, i) => (
                                        <div key={i} className="flex items-center justify-between text-sm">
                                            <div className="flex items-center gap-2 text-[#1a1a1a]">
                                                <span className="text-[#b82609] font-bold text-xs">{item.quantity}×</span>
                                                <span className="font-medium">{item.name}</span>
                                            </div>
                                            <span className="text-[#6b6b6b]">₹{parseFloat(item.price).toFixed(2)}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Footer */}
                                <div className="px-6 py-4 bg-[#f5f5f4] border-t border-[#e7e5e4] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                    <div className="flex items-center gap-3">
                                        <span className="text-xs font-medium text-[#a8a29e] bg-white border border-[#e7e5e4] px-3 py-1.5 rounded-lg">
                                            {order.payment_method === 'COD' ? 'Cash on Delivery' : 'Online Payment'}
                                        </span>
                                        <div className="text-right">
                                            <span className="text-xs text-[#a8a29e]">Total </span>
                                            <span className="text-sm font-bold text-[#1a1a1a]">₹{parseFloat(order.total_amount).toFixed(2)}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => handleReorder(order)}
                                            className="flex items-center gap-1.5 px-4 py-2 border border-[#1a1a1a] text-[#1a1a1a] rounded-lg text-xs font-semibold hover:bg-[#1a1a1a] hover:text-white transition-colors"
                                        >
                                            <RefreshCw size={12} /> Reorder
                                        </button>
                                        {order.order_status === 'delivered' && (
                                            <button className="flex items-center gap-1.5 px-4 py-2 border border-[#e7e5e4] text-[#6b6b6b] rounded-lg text-xs font-semibold hover:border-[#b82609] hover:text-[#b82609] transition-colors">
                                                <Star size={12} /> Rate
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default OrdersPage
