import  { useContext } from "react";

import { ItemsContext } from "./services/ItemsProvider";
import { Link } from "react-router-dom";

const AComponent = () => {
  let items = [
    { name: "laptop", price: "2000", description: "Good Condition" },
    { name: "Mobile", price: "2000", description: "Good Condition" },
    { name: "tab", price: "2000", description: "Good Condition" },
  ];

  const { setProducts } = useContext(ItemsContext);

  return (
    <>
      <div>This is A Component</div>
      <button
        onClick={() => {
          setProducts(items);
          alert("Products Stored in Context")
        }}
      >
        Click here to set Products
      </button>


      <button>Click here to navigate D Component <Link to="/d">D Component</Link></button>
    </>
  );
};

export default AComponent;
