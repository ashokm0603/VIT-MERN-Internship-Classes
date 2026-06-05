import "../assets/styles/LoginStylings.css";
import { useNavigate } from "react-router-dom";


const Login = () => {

  const navigate=useNavigate()

  const handleSubmit=(e)=>{
    e.preventDefault();
    alert("Login Successfully")
    setTimeout(()=>{
      navigate('/home')
    },3000)
  }



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
                />
              </div>
            </div>

            <div className="row px-5">
              <button type="submit" className="btn btn-primary my-2">Login</button>

              <button type="reset" className="btn btn-warning">Cancel</button>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default Login;
