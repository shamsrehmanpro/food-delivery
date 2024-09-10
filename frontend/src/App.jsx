import React, { useState } from 'react'
import Navbar from './components/navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Cart from './pages/Cart/Cart.jsx'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder.jsx'
import Home from './pages/Home/Home.jsx'
import Footer from './components/Footer/Footer.jsx'
import LoginPopUp from './components/LoginPopUp/LoginPopUp.jsx'
import Verify from './pages/verify/Verify.jsx'
import MyOrder from './pages/MyOrders/MyOrder.jsx'
import EmailVerificationPage from './pages/EmailVerificationPage/EmailVerificationPage.jsx'
import ForgotPassword from './pages/ForgotPassword/ForgotPassword.jsx'



const App = () => {
  const [showLogin, setShowLogin] = useState(false)

  


  return (
    <>

    {showLogin ? <LoginPopUp setShowLogin={setShowLogin}/> : <></>}
    <div className='app'>
   <Navbar setShowLogin={setShowLogin} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/order' element={<PlaceOrder />} />
        <Route path='/verify' element={<Verify />} />
        <Route path='/myorders' element={<MyOrder />}/>
        <Route path='/verify-email' element={<EmailVerificationPage />}/>
        <Route path='/forgot-password' element={<ForgotPassword />}/>
      </Routes>
     
    </div>
    
   <Footer />
    </>
  )
}

export default App