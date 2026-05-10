import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { GlobalStateContext } from '../context/GlobalStateContext'

const CartPage = () => {
    const { isLoggedIn, user, foodData, updateQuantity } = useContext(GlobalStateContext)
    const [cartItems, setCartItems] = useState([])
    const [total, setTotal] = useState(0)
    const [loading, setLoading] = useState(false)
    const [showPaymentModal, setShowPaymentModal] = useState(false)
    const [showOrderPopup, setShowOrderPopup] = useState(false)
    const [orderMessage, setOrderMessage] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        const itemsInCart = foodData.filter(item => item.Quantity > 0)
        setCartItems(itemsInCart)
        const totalPrice = itemsInCart.reduce((sum, item) =>
            sum + (parseFloat(item.Price) * item.Quantity), 0
        )
        setTotal(totalPrice)
    }, [foodData])

    useEffect(() => {
        if (window.location.hash === '#payment-modal' && isLoggedIn) {
            setShowPaymentModal(true)
        }
    }, [isLoggedIn])

    const handleIncreaseQuantity = async (item) => await updateQuantity(item.FoodID, 1)

    const handleDecreaseQuantity = async (item) => {
        if (item.Quantity > 1) {
            await updateQuantity(item.FoodID, -1)
        } else {
            await handleRemoveItem(item)
        }
    }

    const handleRemoveItem = async (item) => await updateQuantity(item.FoodID, -item.Quantity)

    const handleCheckout = () => {
        if (!isLoggedIn) {
            navigate('/login', { state: { from: { pathname: '/cart' } } })
            return
        }
        setShowPaymentModal(true)
        window.location.hash = 'payment-modal'
    }

    const handleCOD = async () => {
        setShowPaymentModal(false)
        window.location.hash = ''
        setLoading(true)
        try {
            const orderResponse = await fetch("http://localhost:8000/create-order/", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: user.user_id, amount: total, items: cartItems, paymentMethod: 'COD' })
            })
            const orderData = await orderResponse.json()
            if (orderData.success) {
                setOrderMessage('Order placed successfully! Your food will be delivered soon.')
                setShowOrderPopup(true)
                for (const item of cartItems) await updateQuantity(item.FoodID, -item.Quantity)
                setTimeout(() => { setOrderMessage('Your order has been delivered! Enjoy your meal! 🍕'); setShowOrderPopup(true); setTimeout(() => setShowOrderPopup(false), 3000) }, 35000)
                setTimeout(() => setShowOrderPopup(false), 3000)
                navigate('/orders')
            }
        } catch (error) {
            console.error("Order error:", error)
            alert("Failed to place order")
        } finally {
            setLoading(false)
        }
    }

    const handleUPI = async () => {
        setShowPaymentModal(false)
        window.location.hash = ''
        setLoading(true)
        try {
            const orderResponse = await fetch("http://localhost:8000/create-order/", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: user.user_id, amount: total, items: cartItems, paymentMethod: 'UPI' })
            })
            const orderData = await orderResponse.json()
            if (!orderData.success) throw new Error(orderData.error || "Failed to create order")

            if (!window.Razorpay) {
                await new Promise((resolve, reject) => {
                    const script = document.createElement('script')
                    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
                    script.onload = resolve
                    script.onerror = reject
                    document.body.appendChild(script)
                })
            }

            const options = {
                key: 'rzp_test_SdTWYyzys8e6Zq',
                amount: total * 100,
                currency: 'INR',
                name: 'Kitchen-To-Home',
                description: 'Food Order Payment',
                order_id: orderData.razorpayOrderId,
                handler: async (response) => {
                    try {
                        const verifyResponse = await fetch("http://localhost:8000/verify-payment/", {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ razorpay_payment_id: response.razorpay_payment_id, razorpay_order_id: response.razorpay_order_id, razorpay_signature: response.razorpay_signature, orderId: orderData.orderId })
                        })
                        const verifyData = await verifyResponse.json()
                        if (verifyData.success) {
                            setOrderMessage('Payment successful! Order placed successfully!')
                            setShowOrderPopup(true)
                            for (const item of cartItems) await updateQuantity(item.FoodID, -item.Quantity)
                            setTimeout(() => { setOrderMessage('Your order has been delivered! Enjoy your meal! 🍕'); setShowOrderPopup(true); setTimeout(() => setShowOrderPopup(false), 3000) }, 35000)
                            setTimeout(() => setShowOrderPopup(false), 3000)
                            navigate('/orders')
                        } else throw new Error(verifyData.error || "Payment verification failed")
                    } catch (error) {
                        console.error("Verification error:", error)
                        alert("Payment verification failed: " + error.message)
                    }
                },
                prefill: { name: user.name, email: user.email },
                theme: { color: '#C87941' },
                modal: { ondismiss: () => { console.log("Payment modal closed"); setLoading(false) } }
            }

            const razorpay = new window.Razorpay(options)
            razorpay.on('payment.failed', (response) => {
                console.error("Payment failed:", response.error)
                alert(`Payment failed: ${response.error.description}`)
                setLoading(false)
            })
            razorpay.open()
        } catch (error) {
            console.error("Payment error:", error)
            alert("Payment failed: " + error.message)
            setLoading(false)
        }
    }

    return (
        <div className="max-w-[1200px] mx-auto px-4 py-12 font-sans relative min-h-screen">

            {/* Order Toast */}
            {showOrderPopup && (
                <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[2000] bg-[#1A1208] text-[#FAF6F1] px-8 py-4 rounded-2xl shadow-[0_8px_32px_rgba(26,18,8,0.3)] font-semibold animate-in fade-in zoom-in duration-300">
                    <p className="flex items-center gap-3 text-sm"><span className="text-lg">🚀</span>{orderMessage}</p>
                </div>
            )}

            {/* Payment Modal */}
            {showPaymentModal && (
                <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4" id='payment-modal'>
                    <div className="absolute inset-0 bg-[#1A1208]/50 backdrop-blur-sm" onClick={() => setShowPaymentModal(false)}></div>
                    <div className="relative w-full max-w-md bg-white rounded-3xl p-10 shadow-[0_20px_60px_rgba(26,18,8,0.2)] animate-in fade-in zoom-in duration-300">
                        <h3 className="font-display text-2xl font-normal text-[#1A1208] mb-2 text-center">Choose Payment</h3>
                        <p className="text-[#6B6560] text-sm text-center mb-8">How would you like to pay?</p>

                        <div className="flex flex-col gap-3">
                            <button
                                className="w-full py-4 px-6 bg-[#FAF6F1] hover:bg-[#F2EDE7] border border-[#E8E2DA] hover:border-[#C87941]/40 rounded-2xl flex items-center gap-4 transition-all duration-200 group disabled:opacity-50"
                                onClick={handleCOD}
                                disabled={loading}
                            >
                                <span className="text-3xl group-hover:scale-110 transition-transform">💵</span>
                                <div className="text-left">
                                    <div className="font-semibold text-[#1A1208] text-sm">Cash on Delivery</div>
                                    <div className="text-xs text-[#6B6560] font-medium mt-0.5">Pay when you receive your order</div>
                                </div>
                            </button>

                            <button
                                className="w-full py-4 px-6 bg-[#FAF6F1] hover:bg-[#F2EDE7] border border-[#E8E2DA] hover:border-[#C87941]/40 rounded-2xl flex items-center gap-4 transition-all duration-200 group disabled:opacity-50"
                                onClick={handleUPI}
                                disabled={loading}
                            >
                                <span className="text-3xl group-hover:scale-110 transition-transform">📱</span>
                                <div className="text-left">
                                    <div className="font-semibold text-[#1A1208] text-sm">UPI / Card / NetBanking</div>
                                    <div className="text-xs text-[#6B6560] font-medium mt-0.5">Instant secure payment via Razorpay</div>
                                </div>
                            </button>

                            <button
                                className="mt-2 py-3 text-[#6B6560] hover:text-red-600 transition-colors text-xs font-medium uppercase tracking-widest"
                                onClick={() => { setShowPaymentModal(false); window.location.hash = '' }}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Header */}
            <div className="mb-12">
                <div className="inline-flex items-center gap-2 bg-[#F2EDE7] border border-[#E8E2DA] px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-[#6B6560] mb-5">
                  🛒 Cart
                </div>
                <h1 className="font-display text-4xl md:text-5xl font-normal text-[#1A1208]">Your Cart</h1>
            </div>

            {cartItems.length === 0 ? (
                <div className="bg-white rounded-3xl p-16 text-center border border-[#E8E2DA] max-w-lg mx-auto shadow-[0_4px_24px_rgba(26,18,8,0.06)]">
                    <div className="text-7xl mb-6">🛒</div>
                    <h2 className="font-display text-2xl font-normal text-[#1A1208] mb-3">Your cart is empty</h2>
                    <p className="text-[#6B6560] font-medium mb-8 text-sm">Add some delicious items from our menu to satisfy your cravings!</p>
                    <button
                        onClick={() => navigate('/')}
                        className="bg-[#1A1208] text-[#FAF6F1] px-8 py-3 rounded-xl font-semibold text-sm hover:bg-[#C87941] hover:shadow-[0_8px_24px_rgba(200,121,65,0.35)] transition-all"
                    >
                        Browse Menu
                    </button>
                </div>
            ) : (
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {cartItems.map((item) => (
                            <div key={item.FoodID} className="bg-white rounded-2xl p-5 border border-[#E8E2DA] flex flex-col sm:flex-row items-center gap-5 hover:shadow-[0_4px_20px_rgba(26,18,8,0.08)] hover:-translate-y-0.5 transition-all duration-200">
                                <img src={item.ImageName} alt={item.FoodName} className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-xl border border-[#E8E2DA]" />

                                <div className="flex-1 text-center sm:text-left">
                                    <h3 className="text-base font-bold text-[#1A1208] mb-1">{item.FoodName}</h3>
                                    <p className="text-[#C87941] font-bold text-sm">₹{parseFloat(item.Price).toFixed(2)}</p>
                                </div>

                                <div className="flex items-center bg-[#F2EDE7] rounded-xl p-1 border border-[#E8E2DA]">
                                    <button
                                        className="w-8 h-8 rounded-lg bg-white text-[#1A1208] flex items-center justify-center font-bold text-sm shadow-sm hover:bg-[#1A1208] hover:text-white transition-all active:scale-90"
                                        onClick={() => handleDecreaseQuantity(item)}
                                    >−</button>
                                    <span className="w-10 text-center font-bold text-[#1A1208] text-sm">{item.Quantity}</span>
                                    <button
                                        className="w-8 h-8 rounded-lg bg-white text-[#1A1208] flex items-center justify-center font-bold text-sm shadow-sm hover:bg-[#1A1208] hover:text-white transition-all active:scale-90"
                                        onClick={() => handleIncreaseQuantity(item)}
                                    >+</button>
                                </div>

                                <div className="min-w-[90px] text-center sm:text-right">
                                    <p className="text-[10px] text-[#6B6560] font-bold uppercase tracking-widest mb-0.5">Subtotal</p>
                                    <p className="text-base font-bold text-[#1A1208]">₹{(parseFloat(item.Price) * item.Quantity).toFixed(2)}</p>
                                </div>

                                <button
                                    className="p-2 text-[#6B6560]/40 hover:text-red-500 transition-colors"
                                    onClick={() => handleRemoveItem(item)}
                                    title="Remove Item"
                                >
                                    <span className="text-lg">×</span>
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-[#1A1208] rounded-2xl p-8 sticky top-24">
                            <h3 className="font-display text-xl font-normal text-white mb-1 flex justify-between items-center">
                                Order Summary
                                <span className="text-xs font-sans font-medium bg-white/10 text-white/70 px-3 py-1 rounded-full">{cartItems.length} items</span>
                            </h3>

                            <div className="space-y-4 mt-8 mb-8">
                                <div className="flex justify-between text-white/55 text-xs font-medium uppercase tracking-widest">
                                    <span>Subtotal</span>
                                    <span>₹{total.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-white/55 text-xs font-medium uppercase tracking-widest">
                                    <span>Delivery</span>
                                    <span className="text-[#4A6741]">FREE</span>
                                </div>
                                <div className="h-px bg-white/10 my-4"></div>
                                <div className="flex justify-between items-center text-white">
                                    <span className="font-medium text-sm text-white/80">Total Amount</span>
                                    <span className="font-display text-2xl font-normal text-white">₹{total.toFixed(2)}</span>
                                </div>
                            </div>

                            <button
                                className="w-full py-4 bg-[#C87941] text-white font-semibold text-sm rounded-xl shadow-[0_4px_16px_rgba(200,121,65,0.35)] hover:bg-[#A8612E] hover:shadow-[0_8px_24px_rgba(200,121,65,0.5)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 disabled:opacity-50"
                                onClick={handleCheckout}
                                disabled={loading}
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Processing...
                                    </span>
                                ) : 'Checkout →'}
                            </button>

                            <p className="text-center text-white/30 text-[10px] mt-5 font-medium uppercase tracking-widest">
                                🛡️ Secured by Razorpay
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CartPage