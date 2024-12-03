import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});

  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const currentCount = prev[itemId] || 0;
      if (currentCount > 1) {
        return { ...prev, [itemId]: currentCount - 1 };
      } else {
        const { [itemId]: _, ...rest } = prev; // Remove item if count is 1
        return rest;
      }
    });
  };

  const getTotalCartAmount=()=>{
    let totalAmount = 0;
    for(const item in cartItems)
      {
        if(cartItems[item]>0){
          let itemInfo = food_list.find((product)=>product._id===item);
          totalAmount += itemInfo.price*cartItems[item];
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
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
