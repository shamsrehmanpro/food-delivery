import React, { useState } from 'react'
import './LoginPopUp.css'

import { assets } from '../../assets/assets'

const LoginPopUp = ({setShowLogin}) => {
  const [currState, setCurrState] = useState('Login')
  return (
    <div className='login-popup'>
        <div className="login-popup-container">
          <div className="login-popup-title">
              <h2>{currState}</h2>
              <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
          </div>
          <div className="login-popup-inputs">
            {currState === 'Sign up' ? <input type="text" placeholder='Your Name'/> : <></> } 
            
            <input type="email" placeholder='Your Email' />
            <input type="password" placeholder='Your Password' />
          </div>
             <button>{currState==='Login' ? "Login" :" Create account"}</button>
             <div className="login-popup-condition">
              <input type="checkbox" required />
              <p>By continuing, I agree to the term of use & privacy policy .</p>
             </div>

             <div className="already-account">
             {currState === "Login" 
             ?
              <p>Create a new account ? <span className='spantwo' onClick={() => setCurrState('Sign up')}>Click Here</span></p>
             :
             <p>Already have an account ? <span className='spantwo' onClick={() => setCurrState('Login')}>Login Here</span></p>
              }
             </div>
            
        </div>
    </div>
  )
}

export default LoginPopUp