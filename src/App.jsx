import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import { GlobalStateProvider } from './context/GlobalStateContext'
import { GlobalStateContext } from './context/GlobalStateContext'
import Navbar from './components/Navbar'
import VoiceAssistant from './components/VoiceAssistant'
import Footer from './components/Footer'
import LoginToast from './components/LoginToast'
import LogoutToast from './components/LogoutToast'

// Inner wrapper so it can access context
const AppInner = () => {
  const { 
    showLoginToast, setShowLoginToast, toastUser,
    showLogoutToast, setShowLogoutToast, logoutToastUser 
  } = useContext(GlobalStateContext)

  return (
    <>
      <Navbar />
      <Outlet />
      <VoiceAssistant />
      <Footer />
      {showLoginToast && toastUser && (
        <LoginToast
          userName={toastUser.name}
          onDone={() => setShowLoginToast(false)}
        />
      )}
      {showLogoutToast && logoutToastUser && (
        <LogoutToast
          userName={logoutToastUser.name}
          onDone={() => setShowLogoutToast(false)}
        />
      )}
    </>
  )
}

const App = () => {
  return (
    <GlobalStateProvider>
      <AppInner />
    </GlobalStateProvider>
  )
}

export default App