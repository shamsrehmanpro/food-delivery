import React, { useContext, useState } from 'react'
import '../PlaceOrder/PlaceOrder.css'
import { StoreContext } from '../../Context/StoreContext'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useEffect } from 'react';


const PlaceOrder = () => {
  const {getTotalCartAmount, token, food_list, cartItems, url} = useContext(StoreContext)

  const navigate = useNavigate();
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  })

  const onChangeHandler = (event) => {
    const {name, value} = event.target;
    setData(data =>( {...data, [name]: value}))
  }

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = []
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id]
        orderItems.push(itemInfo)
      }
    })
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount()+2
    }
    let response = await axios.post(url+"/api/order/place", orderData, {headers: {token}})
    if (response.data.success) {
      const {session_url} = response.data
      window.location.replace(session_url)
    }
    else{
      alert('Error')
    }
  }

 

  useEffect(()=>{
    if (!token) {
      navigate('/cart')
    }
    if (getTotalCartAmount()===0) {
      navigate('/cart')
    }
  }, [token])

 
  

  return (
    
    <form action="" onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className="title">Deliver Information</p>
        <div className="multi-fields">
          <input required  name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name'/>
          <input required  name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last Name'/>
        </div>
        <input required   type="email" name="email" onChange={onChangeHandler} value={data.email} placeholder='email adress' id="" />
        <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='street' />
        <div className="multi-fields">
        <input required  name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='city'/>
        <input required  type="text" placeholder='state' name='state' onChange={onChangeHandler} value={data.state}/>
        </div>
        <div className="multi-fields">
        <input required  type="text" placeholder='zip code' name='zipcode' onChange={onChangeHandler} value={data.zipcode}/>
        <input required  type="text" name='country' onChange={onChangeHandler} value={data.country} placeholder='country'/>
        </div>
        <input required  type="text"  placeholder='phone' name='phone' onChange={onChangeHandler} value={data.phone} />
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
           <button type='submit' onClick={() => navigate('/order')}>PROCEED TO Payment</button>
         </div>
       
      </div>
    </form>
  )
 
}

export default PlaceOrder