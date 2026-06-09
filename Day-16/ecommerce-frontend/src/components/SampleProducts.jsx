import { useContext } from "react";
import { CartContext } from "../services/CartProvider";

const SampleProducts = () => {
const products = [
  {
    name: "Laptop",
    price: "50000",
    description: "Good Condition",
    ratings: "⭐⭐⭐⭐",
    imageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJ8bWJtMh8c2w1zMHegfo_mQdi4DHGo_3Jqg&s"
  },
  {
    name: "Smartphone",
    price: "25000",
    description: "Latest Android Phone",
    ratings: "⭐⭐⭐⭐⭐",
    imageSrc: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500"
  },
  {
    name: "Headphones",
    price: "3000",
    description: "Wireless Bluetooth Headphones",
    ratings: "⭐⭐⭐⭐",
    imageSrc: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"
  },
  {
    name: "Smart Watch",
    price: "4500",
    description: "Fitness Tracking Smartwatch",
    ratings: "⭐⭐⭐⭐⭐",
    imageSrc: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"
  },
  {
    name: "Tablet",
    price: "18000",
    description: "10-inch Display Tablet",
    ratings: "⭐⭐⭐⭐",
    imageSrc: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500"
  },
  {
    name: "Camera",
    price: "35000",
    description: "DSLR Camera",
    ratings: "⭐⭐⭐⭐⭐",
    imageSrc: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500"
  },
  {
    name: "Gaming Mouse",
    price: "1500",
    description: "RGB Gaming Mouse",
    ratings: "⭐⭐⭐⭐",
    imageSrc: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500"
  },
  {
    name: "Keyboard",
    price: "2200",
    description: "Mechanical Keyboard",
    ratings: "⭐⭐⭐⭐⭐",
    imageSrc: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=500"
  },
  {
    name: "Monitor",
    price: "12000",
    description: "24-inch Full HD Monitor",
    ratings: "⭐⭐⭐⭐",
    imageSrc: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500"
  },
  {
    name: "Printer",
    price: "8000",
    description: "All-in-One Inkjet Printer",
    ratings: "⭐⭐⭐⭐",
    imageSrc: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=500"
  },
  {
    name: "Speaker",
    price: "3500",
    description: "Portable Bluetooth Speaker",
    ratings: "⭐⭐⭐⭐⭐",
    imageSrc: "https://images.unsplash.com/photo-1589003077984-894e133dabab?w=500"
  },
  {
    name: "Power Bank",
    price: "1200",
    description: "20000mAh Fast Charging",
    ratings: "⭐⭐⭐⭐",
    imageSrc: "https://images.unsplash.com/photo-1609592806596-b43f6e1d7c05?w=500"
  },
  {
    name: "Router",
    price: "2500",
    description: "Dual Band WiFi Router",
    ratings: "⭐⭐⭐⭐",
    imageSrc: "https://images.unsplash.com/photo-1647427060118-4911c9821b82?w=500"
  },
  {
    name: "External Hard Disk",
    price: "5500",
    description: "1TB Portable Storage",
    ratings: "⭐⭐⭐⭐⭐",
    imageSrc: "https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=500"
  },
  {
    name: "Webcam",
    price: "1800",
    description: "HD Video Calling Webcam",
    ratings: "⭐⭐⭐⭐",
    imageSrc: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=500"
  }
];



const{ addToCart} =useContext(CartContext);

  return (<div className="row g-4" md={4}>
    {
            products.map((product)=>(
                <div className="bg-danger-subtle col m-2">
                    <img src={product.imageSrc} height={250} width={250} alt="" />
                    <h3>Name: {product.name}</h3>
                    <h4>Price: {product.price}</h4>
                    <h4>Ratings: {product.ratings}</h4>
                    <p>Description: {product.description}</p>
                    <div style={{display:"flex", justifyContent:"space-evenly"}}>
                        <button className="btn btn-success">Buy</button>
                        <button className="btn btn-warning" onClick={()=>{
                          addToCart(product)
                        }}>Cart</button>
                    </div>
                </div>
            ))
    }
  </div>);
};

export default SampleProducts;
