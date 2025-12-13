import React, { createContext, useState } from "react";
import { useEffect } from "react";
import { food_list } from '../../assets/assets'



export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

const [ cartItems, setCartItems ] = useState({});
const [ searchText, setSearchText ] = useState('');
const addToCart = (item) => {


    if (!cartItems[item]) {
        setCartItems((prev)=> ({...prev, [item]: 1}))
    }
    else
        {
            setCartItems((prev)=> ({...prev, [item]: prev[item] + 1}))
        }

}
const removeFromCart = (itemId) => {
    setCartItems((prev) => ({...prev, [itemId]: prev[itemId] - 1}))
}

const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems)
        
        {

            if (cartItems[item] > 0) {
     let itemInfo = food_list.find((product)=> product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
            }
   
    }
    return totalAmount;
}

    
    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        searchText,
        setSearchText
    }
return (
    <StoreContext.Provider value={contextValue}>
        {props.children}
    </StoreContext.Provider>
)
}
export default StoreContextProvider;