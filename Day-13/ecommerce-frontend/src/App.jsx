import React from "react";
import { Counter } from "./Counter";
import { FunctionCounter } from "./FunctionCounter";
import ParentComponent from "./ParentComponent";
// import { Display, FunctionCounter, Test } from "./FunctionCounter";

class App extends React.Component {
  render() {
    return (
      <div>
        <Counter />
        {/* <Display /> */}
        <FunctionCounter />
        {/* <Test /> */}

        <ParentComponent/>
      </div>
    );
  }
}

export default App;
