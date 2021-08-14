import React from "react";
import "./Login.css";

import logo from "./images/imessage-logo.png";
import { Button } from "@material-ui/core";

import { auth, provider } from "./Firebase";

const Login = () => {
  const signIn = () => {
    auth.signInWithPopup(provider).catch((error) => {
      alert(error.message);
    });
  };

  return (
    <div className="login">
      <div className="login__logo">
        <img src={logo}></img>
      </div>
      <h1>iMessage</h1>
      <Button onClick={signIn}>Sign In</Button>
    </div>
  );
};

export default Login;
