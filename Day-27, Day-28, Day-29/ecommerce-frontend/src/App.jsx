// import React from "react";
// import { Counter } from "./Counter";
// import { FunctionCounter } from "./FunctionCounter";
// import ParentComponent from "./ParentComponent";
// // import { Display, FunctionCounter, Test } from "./FunctionCounter";

// class App extends React.Component {
//   render() {
//     return (
//       <div>
//         <Counter />
//         {/* <Display /> */}
//         <FunctionCounter />
//         {/* <Test /> */}

//         <ParentComponent/>
//       </div>
//     );
//   }
// }

// export default App;

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import PageNotFound from "./components/PageNotFound";
import NavBar from "./components/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import ProtectedRoute from "./components/ProtectedRoute";
import Counter from "./Examples/Couter";
import ItemsProvider from "./services/ItemsProvider";
import CartProvider from "./services/CartProvider";
import Cart from "./pages/Cart";
import AddProducts from "./pages/AddProducts";
import ViewProducts from "./pages/ViewProducts";
import DeleteProducts from "./pages/DeleteProducts";
import UpdateProducts from "./pages/UpdateProducts";
import Users from "./pages/Users";
// import AComponent from "./AComponent";
// import BComponent from "./BComponent";
// import CComponent from "./CComponent";
// import DComponent from "./DComponent";

const App = () => {
  return (
    <BrowserRouter>
      <ItemsProvider>
        <CartProvider>
          <NavBar />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/home"
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route path="/cart" element={<Cart />} />
            <Route path="/add-products" element={<AddProducts/>}/>
            <Route path="/products" element={<ViewProducts/>}/>
            <Route path="/delete-products" element={<DeleteProducts/>}/>
            <Route path="/edit-products" element={<UpdateProducts/>}/>
            <Route path="/edit-products" element={<UpdateProducts/>}/>
            <Route path="/users" element={<Users/>}/>

            
            <Route path="*" element={<PageNotFound />} />
            <Route path="use-memo" element={<Counter />} />

            {/* <Route path="/a" element={<AComponent />} />
          <Route path="/b" element={<BComponent />} />
          <Route path="/c" element={<CComponent />} />
          <Route path="/d" element={<DComponent />} /> */}
          </Routes>
        </CartProvider>
      </ItemsProvider>
    </BrowserRouter>
  );
};

export default App;
