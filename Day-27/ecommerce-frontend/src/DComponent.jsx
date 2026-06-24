import React, { useContext } from "react";
import { ItemsContext } from "./services/ItemsProvider";

const DComponent = () => {
  const { product } = useContext(ItemsContext);
  console.log(product.length);

  return (
    <div>
      {product.length != 0 ? (
        product.map((item) => (
          <ol>
            <li>{item.name}</li>
            <li>{item.price}</li>
            <li>{item.description}</li>
          </ol>
        ))
      ) : (
        <h5 className="text-center">Products Not Found</h5>
      )}
    </div>
  );
};

export default DComponent;
