import { useContext } from "react";
import { CartContext } from "../services/CartProvider";
import { toast, ToastContainer } from "react-toastify";

const Cart = () => {
  const { cartItems, setCartItems } = useContext(CartContext);

  const removeCartProduct = (item) => {
    const filteredProducts = cartItems.filter((p) => p.name != item.name);
    setCartItems(filteredProducts);
    toast.warn("product removed")
  };

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

            <button
              className="btn btn-warning"
              onClick={() => removeCartProduct(item)}
            >
              Remove Cart
            </button>
          </div>
        ))
      ) : (
        <h4 className="text-center">Cart Products Not Found</h4>
      )}


      <ToastContainer/>
    </div>
  );
};

export default Cart;
