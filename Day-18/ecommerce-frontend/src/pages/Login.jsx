import { useRef, useState } from "react";
import "../assets/styles/LoginStylings.css";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import emailjs from "@emailjs/browser";

const Login = () => {
  const navigate = useNavigate();
  const userNameRef = useRef("");
  const passwordRef = useRef("");
  const otpRef = useRef("");

  let otp = "";

  const handleSubmit = (e) => {
    try {
      e.preventDefault();
      if (otp == otpRef.current.value) {
        toast.success("login Successfully");
        localStorage.setItem("username", userNameRef.current.value);
        localStorage.setItem("password", passwordRef.current.value);
        localStorage.setItem("isAuthenticated ", true);

        setTimeout(() => {
          navigate("/home");
        }, 3000);
      } else {
        toast.error("invalid otp");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleGenerateOtp = async () => {
    try {
      const generatedOtp = Math.floor(Math.random() * 1000000); //generate random 6 digit otp
      console.log(generatedOtp);
      // eslint-disable-next-line react-hooks/immutability
      otp = generatedOtp;

      const presentDate = new Date();
      await emailjs.send(
        "service_uj45kfc",
        "template_hfxxjdr",
        {
          passcode: otp,
          email: userNameRef.current.value,
          time: `${presentDate.getHours()}:${
            presentDate.getMinutes() + 15
          }:${presentDate.getSeconds()}`,
        },
        "N3xga7GAtw352Ac-q",
      );
      toast.success("Otp send to mail successfully");
    } catch (err) {
      toast.error("failed to generate opt");
      console.log(err);
    }
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

            <div className="row my-3">
              <div className="col">
                <button
                  type="button"
                  onClick={handleGenerateOtp}
                  className="btn btn-secondary"
                >
                  Generate OTP
                </button>
              </div>

              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter OTP"
                  ref={otpRef}
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
