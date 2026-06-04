import "./loginStylings.css";

const Login = () => {
  return (
    <form action="">
      <fieldset>
        <h2>Login Form</h2>
        <div>
          <label htmlFor="">UserName </label>
          <input type="text" placeholder="Enter UserName" />
        </div>
        <div>
          <label htmlFor="">Password </label>
          <input type="password" placeholder="Enter password" />
        </div>

        <div>
            <button>Login</button>
            <button>Cancel</button>
        </div>
      </fieldset>
    </form>
  );
};

export default Login;
