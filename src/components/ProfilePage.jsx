import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { GlobalStateContext } from '../context/GlobalStateContext'

const ProfilePage = () => {
    const { isLoggedIn, user, logout } = useContext(GlobalStateContext)
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState('profile')
    const navigate = useNavigate()

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login', { state: { from: { pathname: '/profile' } } })
            return
        }
        fetchUserOrders()
    }, [isLoggedIn])

    const fetchUserOrders = async () => {
        try {
            const response = await fetch(`http://localhost:8000/orders/${user.user_id}/`)
            const data = await response.json()
            setOrders(Array.isArray(data) ? data : [])
            setLoading(false)
        } catch (error) {
            console.error("Error fetching orders:", error)
            setLoading(false)
        }
    }

    const getStatusConfig = (status) => {
        switch (status) {
            case 'placed':           return { bg: 'bg-[#FFF8F0]', text: 'text-[#C87941]', border: 'border-[#C87941]/20' }
            case 'confirmed':        return { bg: 'bg-[#F0F7F0]', text: 'text-[#4A6741]', border: 'border-[#4A6741]/20' }
            case 'preparing':        return { bg: 'bg-[#FFF3ED]', text: 'text-orange-700',  border: 'border-orange-200' }
            case 'out-for-delivery': return { bg: 'bg-[#F0F8FF]', text: 'text-sky-700',    border: 'border-sky-200' }
            case 'delivered':        return { bg: 'bg-[#F0FAF0]', text: 'text-emerald-700', border: 'border-emerald-200' }
            default:                 return { bg: 'bg-[#F5F5F5]', text: 'text-[#6B6560]', border: 'border-[#E8E2DA]' }
        }
    }

    const getStatusIcon = (status) => {
        switch (status) {
            case 'placed': return '📝'
            case 'confirmed': return '✅'
            case 'preparing': return '👨‍🍳'
            case 'out-for-delivery': return '🛵'
            case 'delivered': return '🍽️'
            default: return '📦'
        }
    }

    if (!isLoggedIn) return null

    const initials = user?.name
        ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
        : '?'

    return (
        <div className="max-w-[960px] mx-auto px-4 py-12 font-sans min-h-screen">

            {/* Profile Header Card */}
            <div className="bg-[#1A1208] rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 mb-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-[#C87941]/6 rounded-full -translate-y-1/2 translate-x-1/2 blur-[100px] pointer-events-none"></div>

                {/* Avatar */}
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-[#C87941] flex items-center justify-center text-white text-3xl md:text-4xl font-bold shadow-[0_8px_24px_rgba(200,121,65,0.35)] shrink-0 border-2 border-white/10">
                    {initials}
                </div>

                {/* Info */}
                <div className="text-center md:text-left relative z-10 flex-1">
                    <h1 className="font-display text-2xl md:text-3xl font-normal text-white mb-1">{user?.name}</h1>
                    <p className="text-white/50 font-medium text-sm mb-4">{user?.email}</p>
                    <div className="flex flex-wrap justify-center md:justify-start gap-2">
                        <span className="bg-white/8 border border-white/10 px-3 py-1 rounded-full text-[10px] text-white/60 font-medium uppercase tracking-widest">
                            Member since 2026
                        </span>
                        <span className="bg-white/8 border border-white/10 px-3 py-1 rounded-full text-[10px] text-white/60 font-medium uppercase tracking-widest">
                            {orders.length} Total Orders
                        </span>
                    </div>
                </div>

                <button
                    onClick={logout}
                    className="bg-white/8 border border-white/12 hover:bg-red-600 hover:border-red-600 text-white/70 hover:text-white px-6 py-2.5 rounded-xl font-medium text-xs uppercase tracking-widest transition-all duration-200 active:scale-95 relative z-10 shrink-0"
                >
                    Logout
                </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 mb-8 bg-[#F2EDE7] p-1 rounded-xl max-w-fit border border-[#E8E2DA]">
                {['profile', 'orders'].map(tab => (
                    <button
                        key={tab}
                        className={`px-7 py-2.5 rounded-lg text-sm font-semibold capitalize transition-all duration-200 ${
                            activeTab === tab
                                ? 'bg-white text-[#1A1208] shadow-sm'
                                : 'text-[#6B6560] hover:text-[#1A1208]'
                        }`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab === 'profile' ? 'Account Info' : 'Orders'}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div>
                {activeTab === 'profile' ? (
                    <div className="bg-white rounded-2xl p-8 border border-[#E8E2DA]">
                        <h2 className="text-lg font-bold text-[#1A1208] mb-6 flex items-center gap-3">
                            <span className="w-6 h-1 bg-[#C87941] rounded-full inline-block"></span>
                            Personal Information
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                            {[
                                { label: 'Full Name', value: user?.name, icon: '👤' },
                                { label: 'Email Address', value: user?.email, icon: '📧' },
                                { label: 'Default Phone', value: 'Not provided', icon: '📞' },
                                { label: 'Account Type', value: 'Customer (Voice Enabled)', icon: '🛡️' }
                            ].map((info, i) => (
                                <div key={i} className="bg-[#FAF6F1] p-5 rounded-xl border border-[#E8E2DA] hover:border-[#C87941]/30 transition-colors">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-base">{info.icon}</span>
                                        <label className="text-[10px] text-[#6B6560] font-bold uppercase tracking-widest">{info.label}</label>
                                    </div>
                                    <p className="text-base font-semibold text-[#1A1208] truncate">{info.value}</p>
                                </div>
                            ))}
                        </div>

                        <div className="bg-[#F0F7F0] p-6 rounded-xl border border-[#4A6741]/20">
                            <h3 className="text-xs font-bold text-[#4A6741] uppercase tracking-widest mb-3">Voice Assistant</h3>
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-[#6B6560] font-medium">Voice ordering and hands-free navigation is active.</p>
                                <span className="flex h-3 w-3 relative shrink-0">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4A6741] opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-[#4A6741]"></span>
                                </span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl p-8 border border-[#E8E2DA]">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-bold text-[#1A1208] flex items-center gap-3">
                                <span className="w-6 h-1 bg-[#4A6741] rounded-full inline-block"></span>
                                Recent Orders
                            </h2>
                            <button
                                onClick={() => navigate('/orders')}
                                className="text-xs font-semibold text-[#C87941] hover:text-[#1A1208] uppercase tracking-widest transition-colors"
                            >
                                View All →
                            </button>
                        </div>

                        {loading ? (
                            <div className="flex items-center justify-center py-16 gap-3 text-[#6B6560]">
                                <div className="w-5 h-5 border-2 border-[#1A1208] border-t-transparent rounded-full animate-spin"></div>
                                <span className="text-xs font-medium uppercase tracking-widest">Loading orders...</span>
                            </div>
                        ) : orders.length === 0 ? (
                            <div className="text-center py-16 bg-[#FAF6F1] rounded-xl border border-[#E8E2DA] border-dashed">
                                <div className="text-5xl mb-4 opacity-40">🥡</div>
                                <p className="text-[#6B6560] font-medium mb-6 text-sm">You haven't placed any orders yet.</p>
                                <button
                                    onClick={() => navigate('/')}
                                    className="bg-[#1A1208] text-white px-7 py-2.5 rounded-xl font-semibold text-xs hover:bg-[#C87941] transition-all"
                                >
                                    Explore Menu
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {orders.slice(0, 5).map((order) => {
                                    const statusCfg = getStatusConfig(order.order_status)
                                    return (
                                        <div key={order.order_id} className="border border-[#E8E2DA] rounded-xl p-5 hover:shadow-[0_2px_16px_rgba(26,18,8,0.07)] transition-all duration-200">
                                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3 pb-3 border-b border-[#E8E2DA]">
                                                <div className="flex items-center gap-3">
                                                    <span className="text-sm font-bold text-[#1A1208]">#{order.order_id}</span>
                                                    <span className="text-[10px] text-[#6B6560] font-medium uppercase tracking-widest">
                                                        {new Date(order.order_date).toLocaleDateString()}
                                                    </span>
                                                </div>
                                                <div className={`px-3 py-1 rounded-lg border text-[10px] font-semibold uppercase tracking-wider ${statusCfg.bg} ${statusCfg.text} ${statusCfg.border}`}>
                                                    {getStatusIcon(order.order_status)} {order.order_status}
                                                </div>
                                            </div>

                                            <div className="flex justify-between items-center">
                                                <span className="text-xs font-medium text-[#6B6560]">
                                                    {order.items?.length || 0} item{order.items?.length !== 1 ? 's' : ''}
                                                </span>
                                                <div className="text-right">
                                                    <p className="text-[10px] text-[#6B6560] font-bold uppercase tracking-widest">Amount</p>
                                                    <p className="text-base font-bold text-[#1A1208]">₹{parseFloat(order.total_amount).toFixed(2)}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProfilePage
