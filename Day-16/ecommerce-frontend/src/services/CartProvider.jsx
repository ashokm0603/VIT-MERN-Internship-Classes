import { createContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    cartItems.push(product); 
  };

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
