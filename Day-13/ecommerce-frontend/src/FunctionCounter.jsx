// export function Display() {
//   return <h1>This is Display Component</h1>;
// }

import React from "react";
export const FunctionCounter = () => {
  const [count, setCount] = React.useState(0);
  const [name, setName] = React.useState("Ravi");

  return (
    <div>
      <h1>THis is function component with arrow function syntax</h1>
      <h4>CountValue :{count}</h4>

      <h3>Name: {name}</h3>

      <input
        type="text"
        placeholder="Enter Name"
        onChange={(e) => {
          setName(e.target.value);
        }}
      />

      <br />
      <br />
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Increment ++
      </button>
      <button
        onClick={() => {
          setCount(count - 1);
        }}
      >
        Decrement ---
      </button>
      <button
        onClick={() => {
          setCount(0);
        }}
      >
        Reset 0
      </button>
    </div>
  );
};

// export const Test = function () {
//   return <h1>THis is function component with functional expression syntax</h1>;
// };
