import { useMemo, useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

  // eslint-disable-next-line no-unused-vars
  const [text, setText] = useState("");

  // const handleSquare = () => {
  //   console.log("Button Clicked");
  //   return count * count;
  // };

  const handleSquare = useMemo(() => {
    console.log("Button Clicked");
    return count * count;
  }, [count]);

  return (
    <div>
      <h1>Example For without useMemo</h1>
      <h3>
        Square Of the Number {count} :{handleSquare}
      </h3>

      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        increment{" "}
      </button>

      <br />
      <br />

      <input
        onChange={(e) => {
          setText(e.target.value);
        }}
        type="text"
        placeholder="Enter any text"
      />
    </div>
  );
};

export default Counter;
