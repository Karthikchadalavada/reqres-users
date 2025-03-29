import React, { useState } from "react";
import "./App.css"; // Import external CSS
import { MyContext } from './contextprovider.js';
import { useContext, useEffect } from 'react';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [email, setEmail] = useState("eve.holt@reqres.in");
  const [password, setPassword] = useState("cityslicka");
  const [message, setMessage] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
    const{user, setUser} = useContext(MyContext);
  

  // Sign In Function
  const handleSignIn = async (e) => {
    e.preventDefault();

    //form Validtion
    if (!email && !password) {
    setShowPopup(true);
      setMessage("Please enter Email and Password");
      setEmailError(true);
      setPasswordError(true);
    } else if (!email) {
    setShowPopup(true);
      setMessage("Please enter Email");
      setEmailError(true);
      setPasswordError(false);
    } else if (!password) {
      setShowPopup(true);
      setMessage("Please enter Password");
      setEmailError(false);
      setPasswordError(true);
    }

    //POST request to API
    try {
      const response = await fetch('https://reqres.in/api/login',{
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify({email,password})
      });

      if(!response.ok){
        toast.error('User Login failed',{position: 'top-center'});
        console.log('User Login failed');
        return;
      }

      const data =  await response.json();
      toast.success("User Login Successfull" , {position: "top-center"});
      console.log("User Login Successfull")
      localStorage.setItem("token", data.token);

      
     // Delays opening Home page 2 secs   
    setTimeout(() => {
      setUser(true);
    }, 2000); 

     return data.token;
    } catch(error){
      toast.error(error.message, {position:'top-center'})
    }
  };

  return (
    <div className="container1">
      <div className="login-box">
        <form autoComplete="off">
          <h1>Login</h1>
          <div className={`input-container ${emailError ? "error-border" : ""}`}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
              required
            />
            <label className={`floating-label ${email ? "active" : ""} ${emailError ? "error-label" : ""}`}>
              Email
            </label>
          </div>
          <div className={`input-container ${passwordError ? "error-border" : ""}`}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              required
            />
            <label className={`floating-label ${password ? "active" : ""} ${passwordError ? "error-label" : ""}`}>
              Password
            </label>
          </div>
          <button onClick={handleSignIn} className="login-button">
            Sign In
          </button>
        </form>
        <p>Don't Have an Account?</p>
        <a href="#" onClick={(e) => { e.preventDefault();  }}>
          Sign Up
        </a>
      </div>
      <ToastContainer /> 

{/* Error message Pop-up box */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="message-box">
            <p>{message}</p>
            <button className="error-back-btn" onClick={() => setShowPopup(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
