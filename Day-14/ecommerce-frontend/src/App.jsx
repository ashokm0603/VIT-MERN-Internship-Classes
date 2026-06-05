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
import 'bootstrap/dist/css/bootstrap.min.css';
const App = () => {
  return (
    <BrowserRouter>
      <NavBar />

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
