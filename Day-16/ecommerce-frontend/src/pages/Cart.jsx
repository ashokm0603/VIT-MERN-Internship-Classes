import React, { useContext } from "react";
import { CartContext } from "../services/CartProvider";

const Cart = () => {
  const { cartItems } = useContext(CartContext);
  return (
    <div className="row g-5" md={4}>
      <h1 className="text-center">Cart Products</h1>
      {cartItems.length != 0 ? (
        cartItems.map((item) => (
          <div className="col">
            <img src={item.imageSrc} height={250} width={250} alt="" />
            <h3>Name : {item.name}</h3>
            <h3>Price : {item.price}</h3>
            <p>Description : {item.description}</p>

            <button className="btn btn-warning">Remove Cart</button>
          </div>
        ))
      ) : (
        <h4 className="text-center">Cart Products Not Found</h4>
      )}
    </div>
  );
};

export default Cart;
