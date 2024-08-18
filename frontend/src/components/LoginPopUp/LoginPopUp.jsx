import React, { useState } from "react";
import "./LoginPopUp.css";
import axios from 'axios'

import { assets } from "../../assets/assets";
import { useContext } from "react";
import { StoreContext } from "../../Context/StoreContext";

const LoginPopUp = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  let {url, setToken} = useContext(StoreContext)

  const onChangeHandler = (event) => {
    const {name, value} = event.target;
    setData(prevValue => ({...prevValue, [name] : value}))
  }

  const onLogin = async(event) => {
    event.preventDefault();
      let newUrl = url;

      if (currState === 'Login') {
        newUrl += '/api/user/login'
      } else {
        newUrl += '/api/user/register'
      }
      
      const response = await axios.post(newUrl, data)
      

      if (response.data.success) {
        console.log("Token received:", response.data.token);
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token)
        setShowLogin(false)
      }else{
        alert(response.data.message)
      }

  }

  

  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="login-popup-inputs">
          {currState === "Sign up" ? (
            <input name="name" onChange={onChangeHandler} value={data.name} type="text" placeholder="Your Name" />
          ) : (
            <></>
          )}

          <input name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder="Your Email" />
          <input name="password" onChange={onChangeHandler} value={data.password} type="password" placeholder="Your Password" />
        </div>
        <button type="submit">{currState === "Login" ? "Login" : " Create account"}</button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the term of use & privacy policy .</p>
        </div>

        <div className="already-account">
          {currState === "Login" ? (
            <p>
              Create a new account ?
              <span className="spantwo" onClick={() => setCurrState("Sign up")}>
                Click Here
              </span>
            </p>
          ) : (
            <p>
              Already have an account ?{" "}
              <span className="spantwo" onClick={() => setCurrState("Login")}>
                Login Here
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginPopUp;
