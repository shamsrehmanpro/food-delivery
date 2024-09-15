import { createContext, useEffect, useState } from "react";
import axios from "axios"
export const StoreContext = createContext(null) 



const StoreContextProvider = (props) => {

        const [cartItems, setCartItems] = useState({})
        const url = 'http://localhost:4000';
        const [token, setToken] = useState("")
        const [food_list, setFoodList] = useState([]);
        const [searchResult, setSearchResult] = useState([]);
        


        const fetchFoodList = async () => {
            try {
              const response = await axios.get(url + "/api/food/list");
              setFoodList(response.data.data);
            } catch (error) {
              console.error("Error fetching food list:", error);
            }
          };

        const addToCart = async (itemId) => {
            if (!cartItems[itemId]) {
                setCartItems(prevValue => ({...prevValue, [itemId]:1}))
            }
            else{
                setCartItems(prevValue => ({...prevValue, [itemId] : prevValue[itemId] +1}))
            }
            if (token) {
                await axios.post(url+"/api/cart/add", {itemId}, {headers : {token}})
            }
        }

        const removeFromCart = async (itemId) => { 
                setCartItems(prevValue => ({...prevValue, [itemId] : prevValue[itemId]-1}))
            if (token) {
                await axios.post(url+"/api/cart/remove" , {itemId}, {headers : {token}})
            }
        }

        const getTotalCartAmount = () => {
            let totalAmount = 0;
            for(const item in cartItems) {
               
                let itemInfo = food_list.find((product) => product._id === item)
                totalAmount += itemInfo.price * cartItems[item]
               
            }
            return totalAmount;
            
        }

        const loadCartData = async (token) => {
            const response = await axios.post(url+"/api/cart/get", {}, {headers : {token}})
            setCartItems(response.data.cartData);
        }

        useEffect(()=>{
            

            async function loadData() {
              await fetchFoodList();
              if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"))
              }
            }
            loadData();
           
           
            
            

        }, [])
        

    const contextValue = {
            food_list,
            cartItems,
            setCartItems,
            addToCart,
            removeFromCart,
            getTotalCartAmount,
            url,
            token,
            setToken,
            searchResult,
            setSearchResult,
            
    }

    return(
        <StoreContext.Provider value={contextValue}>
        {props.children}
        </StoreContext.Provider>
    )

}

export default StoreContextProvider


