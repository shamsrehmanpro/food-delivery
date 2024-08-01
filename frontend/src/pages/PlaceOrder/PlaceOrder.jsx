import React, { useContext } from 'react'
import '../PlaceOrder/PlaceOrder.css'
import { StoreContext } from '../../Context/StoreContext'

const PlaceOrder = () => {
  const {getTotalCartAmount} = useContext(StoreContext)
  return (
    
    <form action="" className='place-order'>
      <div className="place-order-left">
        <p className="title">Deliver Information</p>
        <div className="multi-fields">
          <input type="text" placeholder='First Name'/>
          <input type="text" placeholder='Last Name'/>
        </div>
        <input type="email" name="" placeholder='email adress' id="" />
        <input type="text" placeholder='street' />
        <div className="multi-fields">
        <input type="text" placeholder='city'/>
        <input type="text" placeholder='state'/>
        </div>
        <div className="multi-fields">
        <input type="text" placeholder='zip code'/>
        <input type="text" placeholder='country'/>
        </div>
        <input type="text" placeholder='phone' />
      </div>
      <div className="place-order-right">
        
         <div className='cart-first'>
         <h2>Cart-Totals</h2>
           <div className="cart-total-details">
             <p>Subtotal</p>
             <p>${getTotalCartAmount()}</p>
           </div>
           <hr />
           <div className="cart-total-details">
             <p>Delivery Fee</p>
             <p>${getTotalCartAmount() === 0 ? 0 : 5}</p>
           </div>
           <hr />
           <div className="cart-total-details">
             <p>Total</p>
             <p>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 5}</p>
           </div>
           <button onClick={() => navigate('/order')}>PROCEED TO Payment</button>
         </div>
       
      </div>
    </form>
  )
 
}

export default PlaceOrder