import { useRef } from "react";
import "../assets/styles/LoginStylings.css";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
const Login = () => {
  const navigate = useNavigate();
  const userNameRef = useRef("");
  const passwordRef = useRef("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userNameRef.current.value);
    console.log(passwordRef.current.value);
    toast.success("login Successfully");
    localStorage.setItem("username", userNameRef.current.value);
    localStorage.setItem("password", passwordRef.current.value);
    localStorage.setItem("isAuthenticated ", true);

    setTimeout(() => {
      navigate("/home");
    }, 3000);
  };

  return (
    <div id="form-container">
      <form action="" className="form" onSubmit={handleSubmit}>
        <fieldset>
          <div className="container">
            <div className="row">
              <h2 className="text-center bg-warning-subtle ">Login Form</h2>
            </div>

            <div className="row">
              <div className="col">
                <label htmlFor="">UserName</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Username"
                  ref={userNameRef}
                />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <label htmlFor="">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                  ref={passwordRef}
                />
              </div>
            </div>

            <div className="row px-5">
              <button type="submit" className="btn btn-primary my-2">
                Login
              </button>

              <button type="reset" className="btn btn-warning">
                Cancel
              </button>
            </div>
          </div>
        </fieldset>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
