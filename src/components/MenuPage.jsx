import React from 'react'
import ItemsPage from './ItemsPage'
import './CSS/Menu.css'

const MenuPage = () => {
  return (
    <div className="menu-page">
      {/* Page Header */}
      <div className="menu-header">
        <div className="menu-header-content">
          <span className="menu-badge">🍽️ Our Menu</span>
          <h1>What would you like <span className="menu-highlight">today?</span></h1>
          <p>Freshly prepared dishes made with love — explore our full menu and add your favourites to the cart.</p>
        </div>
        <div className="menu-header-decor">
          <span>🥘</span>
          <span>🍛</span>
          <span>🧆</span>
          <span>🍮</span>
        </div>
      </div>

      {/* Items Grid */}
      <ItemsPage />
    </div>
  )
}

export default MenuPage
