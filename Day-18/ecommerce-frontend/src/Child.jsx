import React from "react";

const Child = React.memo(({dataFun}) => {
  console.log("Child Component rendering.....");

  return (
    <div>
      <button onClick={dataFun}> Click me</button>
    </div>
  );
});

export default Child;
