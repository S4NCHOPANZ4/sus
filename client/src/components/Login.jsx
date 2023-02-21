import React, { useState } from "react";
import Axios from "axios";
import Cookies from "universal-cookie";

function Login({ setIsAuth }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const cookies = new Cookies();
  const login = () => {
    Axios.post("http://localhost:3001/login", {
      username,
      password,
    }).then((res) => {
      const { firstName, lastName, username, token, userId } = res.data;
      cookies.set("token", token);
      cookies.set("userId", userId);
      cookies.set("username", username);
      cookies.set("firstName", firstName);
      cookies.set("lastName", lastName);
      setIsAuth(true);
    });
  };
  return (
    <div className="login">

      <input
        className="register_input"
        placeholder="Username"
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <input
        className="register_input"
        placeholder="Password"
        type="password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      <button className="register__button" onClick={login}> Login</button>
    </div>
  );
}

export default Login;
