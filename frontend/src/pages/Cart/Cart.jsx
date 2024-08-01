import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../Context/StoreContext'
import { food_list } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'

const cart = () => {
  const {foot_list, cartItems, removeFromCart,getTotalCartAmount} = useContext(StoreContext)
  const navigate = useNavigate();
  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Item</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p> Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />

        {food_list.map((item, index) => {
          if(cartItems[item._id] > 0){
            return (
             <div  key={item._id}>
              <div className="cart-items-title cart-items-item" >
                <img src={item.image} alt=""/>
                <p>{item.name}</p>
                <p >${item.price}</p>
                <p>{cartItems[item._id]}</p>
                <p>${item.price * cartItems[item._id]}</p>
                <p onClick={()=>removeFromCart(item._id)}  className='cross'>X</p>
             
              </div>
              <hr />

             </div>
             
            )
          }
     
        })}
      </div>
      <div className="cart-total">
         
          <div className='cart-first'>
          <h2>Cart-Totals</h2>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 5}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <p>${getTotalCartAmount() === 0 ? 0 :getTotalCartAmount() + 5}</p>
            </div>
            <button onClick={() => navigate('/order')}>PROCEED TO Payment</button>
          </div>
          <div className="cart-promocode">
            <div>
              <p>If you have promo code, Enter It here</p>
              <div className="cart-promocode-input">
                <input type="text" placeholder='promo code' />
                <button >Submit</button>
              </div>
            </div>
          </div>
      </div>
    </div>
  )
}

export default cart