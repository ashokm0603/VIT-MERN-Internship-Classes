import React, { useCallback, useState } from "react";
import Child from "./Child";

const Parent = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  const handleClick = useCallback(() => {
    console.log("Button Clicked");
  },[]);



  return (
    <div>
      <h2>Count :{count}</h2>
      <button onClick={() => setCount(count + 1)}>Increment</button>

      <br />
      <br />

      <input type="text" onChange={(e)=>{setText(e.target.value)}} placeholder="Enter any text" />

      <br />
      <br />

      <Child dataFun={handleClick}/>
    </div>
  );
};

export default Parent;
