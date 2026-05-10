import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { GlobalStateContext } from '../context/GlobalStateContext'

const OrdersPage = () => {
    const { isLoggedIn, user } = useContext(GlobalStateContext)
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login', { state: { from: { pathname: '/orders' } } })
            return
        }
        fetchOrders()
        const intervalId = setInterval(fetchOrders, 5000)
        return () => clearInterval(intervalId)
    }, [isLoggedIn])

    const fetchOrders = async () => {
        try {
            const response = await fetch(`http://localhost:8000/orders/${user.user_id}/`)
            const data = await response.json()
            if (Array.isArray(data)) {
                setOrders(data)
            } else if (data && data.success === false) {
                console.error("Error from server:", data.error)
                setOrders([])
            } else {
                console.error("Unexpected response format:", data)
                setOrders([])
            }
            setLoading(false)
        } catch (error) {
            console.error("Error fetching orders:", error)
            setOrders([])
            setLoading(false)
        }
    }

    const getStatusConfig = (status) => {
        switch (status) {
            case 'placed':           return { bg: 'bg-[#FFF8F0]', text: 'text-[#C87941]', border: 'border-[#C87941]/20', dot: 'bg-[#C87941]' }
            case 'confirmed':        return { bg: 'bg-[#F0F7F0]', text: 'text-[#4A6741]', border: 'border-[#4A6741]/20', dot: 'bg-[#4A6741]' }
            case 'preparing':        return { bg: 'bg-[#FFF3ED]', text: 'text-orange-700',  border: 'border-orange-200',    dot: 'bg-orange-500' }
            case 'out-for-delivery': return { bg: 'bg-[#F0F8FF]', text: 'text-sky-700',    border: 'border-sky-200',       dot: 'bg-sky-500' }
            case 'delivered':        return { bg: 'bg-[#F0FAF0]', text: 'text-emerald-700', border: 'border-emerald-200',   dot: 'bg-emerald-500' }
            default:                 return { bg: 'bg-[#F5F5F5]', text: 'text-[#6B6560]', border: 'border-[#E8E2DA]',     dot: 'bg-[#6B6560]' }
        }
    }

    const getStatusIcon = (status) => {
        switch (status) {
            case 'placed':           return '📝'
            case 'confirmed':        return '✅'
            case 'preparing':        return '👨‍🍳'
            case 'out-for-delivery': return '🛵'
            case 'delivered':        return '🍽️'
            default:                 return '📦'
        }
    }

    if (!isLoggedIn) return null

    return (
        <div className="max-w-[1100px] mx-auto px-4 py-12 font-sans min-h-screen">

            {/* Header */}
            <div className="mb-12">
                <div className="inline-flex items-center gap-2 bg-[#F2EDE7] border border-[#E8E2DA] px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-[#6B6560] mb-5">
                  📦 Orders
                </div>
                <h1 className="font-display text-4xl md:text-5xl font-normal text-[#1A1208]">Order History</h1>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-24 gap-4">
                    <div className="w-10 h-10 border-2 border-[#1A1208] border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-[#6B6560] font-medium text-sm uppercase tracking-widest">Fetching your orders...</p>
                </div>
            ) : !Array.isArray(orders) || orders.length === 0 ? (
                <div className="max-w-lg mx-auto bg-white rounded-3xl p-16 text-center border border-[#E8E2DA] shadow-[0_4px_24px_rgba(26,18,8,0.06)]">
                    <div className="text-7xl mb-6">🥡</div>
                    <h2 className="font-display text-2xl font-normal text-[#1A1208] mb-3">No orders yet</h2>
                    <p className="text-[#6B6560] font-medium mb-8 text-sm">Hungry? Order some delicious food from our menu!</p>
                    <button
                        onClick={() => navigate('/#items')}
                        className="bg-[#1A1208] text-[#FAF6F1] px-8 py-3 rounded-xl font-semibold text-sm hover:bg-[#C87941] hover:shadow-[0_8px_24px_rgba(200,121,65,0.35)] transition-all"
                    >
                        Browse Menu
                    </button>
                </div>
            ) : (
                <div className="grid gap-6">
                    {orders.map((order) => {
                        const statusCfg = getStatusConfig(order.order_status)
                        return (
                            <div key={order.order_id} className="bg-white rounded-2xl p-7 border border-[#E8E2DA] hover:shadow-[0_4px_24px_rgba(26,18,8,0.08)] hover:-translate-y-0.5 transition-all duration-200">

                                {/* Order Header */}
                                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6 pb-5 border-b border-[#E8E2DA]">
                                    <div>
                                        <div className="flex items-baseline gap-2 mb-1">
                                            <span className="text-[10px] font-bold text-[#6B6560] uppercase tracking-widest">Order</span>
                                            <span className="text-lg font-bold text-[#1A1208]">#{order.order_id}</span>
                                        </div>
                                        <div className="text-xs text-[#6B6560] font-medium">
                                            {new Date(order.order_date).toLocaleDateString('en-IN', {
                                                day: 'numeric',
                                                month: 'short',
                                                year: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </div>
                                    </div>
                                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border text-xs font-semibold ${statusCfg.bg} ${statusCfg.text} ${statusCfg.border}`}>
                                        <span className={`w-1.5 h-1.5 rounded-full ${statusCfg.dot} animate-pulse`}></span>
                                        <span>{getStatusIcon(order.order_status)}</span>
                                        <span className="uppercase tracking-wide">{order.order_status?.replace(/-/g, ' ') || 'Pending'}</span>
                                    </div>
                                </div>

                                {/* Order Items */}
                                <div className="space-y-2.5 mb-6">
                                    {order.items && order.items.map((item, index) => (
                                        <div key={index} className="flex justify-between items-center bg-[#FAF6F1] p-3.5 rounded-xl border border-[#E8E2DA]">
                                            <div className="flex items-center gap-3">
                                                <span className="w-7 h-7 rounded-lg bg-white border border-[#E8E2DA] flex items-center justify-center font-bold text-[#C87941] text-xs shadow-sm">{item.quantity}×</span>
                                                <span className="font-medium text-[#1A1208] text-sm">{item.name}</span>
                                            </div>
                                            <span className="font-bold text-[#1A1208] text-sm">₹{parseFloat(item.price).toFixed(2)}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Order Footer */}
                                <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-5 border-t border-[#E8E2DA]">
                                    <div>
                                        <span className="text-[10px] text-[#6B6560] font-bold uppercase tracking-widest block mb-1">Payment</span>
                                        <span className="text-sm font-medium text-[#1A1208] bg-[#F2EDE7] px-3 py-1.5 rounded-lg border border-[#E8E2DA]">
                                            {order.payment_method === 'COD' ? '💵 Cash on Delivery' : '📱 Online Payment'}
                                        </span>
                                    </div>

                                    <div className="text-center md:text-right">
                                        <span className="text-[10px] text-[#6B6560] font-bold uppercase tracking-widest block mb-1">Total Paid</span>
                                        <span className="font-display text-2xl font-normal text-[#1A1208]">₹{parseFloat(order.total_amount).toFixed(2)}</span>
                                    </div>

                                    {order.order_status === 'delivered' && (
                                        <button className="px-6 py-2.5 bg-[#FAF6F1] border border-[#E8E2DA] text-[#1A1208] font-semibold text-xs uppercase tracking-widest rounded-xl hover:bg-[#1A1208] hover:text-white hover:border-[#1A1208] transition-all duration-200">
                                            Rate Order
                                        </button>
                                    )}
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
