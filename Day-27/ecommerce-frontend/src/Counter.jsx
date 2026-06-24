import { Component } from "react";
export class Counter extends Component {
  constructor() {
    super();
    this.state = {
      count: 0,
      toggle: true,
    };
  }
  render() {
    return (
      <div>
        <h1 style={{ display: this.state.toggle ? "block" : "none" }}>
          This is Class based Component
        </h1>

        <button
          onClick={() => {
            this.setState((prev) => {
              return { toggle: prev.toggle ? false : true };
            });
          }}
        >
          {" "}
          Toggle
        </button>

        <h3> Count:{this.state.count} </h3>
        <button
          onClick={() => {
            this.setState((e) => {
              return { count: e.count + 1 };
            });
          }}
        >
          Increment ++
        </button>

        <button
          onClick={() => {
            this.setState((prev) => {
              return { count: prev.count - 1 };
            });
          }}
        >
          Decrement --
        </button>

        <button
          onClick={() => {
            this.setState(() => {
              return { count: 0 };
            });
          }}
        >
          Reset{" "}
        </button>
      </div>
    );
  }
}
