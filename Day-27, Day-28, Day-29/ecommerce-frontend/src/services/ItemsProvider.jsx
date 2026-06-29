// eslint-disable-next-line no-unused-vars
import React, { createContext, useState } from "react";

// const ItemsContext=React.createContext() or
// eslint-disable-next-line react-refresh/only-export-components
export const ItemsContext = createContext();

const ItemsProvider = ({ children }) => {
    const [product, setProducts] = useState([]);

    return (
    <ItemsContext.Provider value={{product, setProducts}}>
        {children}
    </ItemsContext.Provider>);
};

export default ItemsProvider;
