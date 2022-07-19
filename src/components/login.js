import React, { useState, useEffect, useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "../styles/login.css";
import { LoginContext } from "./context/contextProvider";
function Login() {
  const history = useNavigate("");

  const [logData, setLogData] = useState({
    email: "",
    password: "",
  });

  const { account, setAccount } = useContext(LoginContext);


  const addData = (e) => {
    const { name, value } = e.target;
    setLogData(() => {
      return {
        ...logData,
        [name]: value,
      };
    });
  };
  const loginUser = async (e) => {
    e.preventDefault();
    const { email, password } = logData;

    const req = await fetch("http://localhost:8005/login", {
      method: "POST",
      credentials: "include",
      //credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await req.json();
    //console.log(data);

    if (req.status === 400 || !data) {
      console.log("Invalid credentials");
    } else {
      //console.log("Valid Data");
      setAccount(data)
      setLogData({
        ...logData,
        email: "",
        password: "",
      });
      history("/")
    }
  };
  return (
    <div className="login-area">
      <div className="heading">Login</div>
      <form method="post">
        <div className="input-fields">
          <input
            type="text"
            onChange={addData}
            value={logData.email}
            name="email"
            placeholder="Enter Email"
          />
        </div>
        <div className="input-fields">
          <input
            type="password"
            onChange={addData}
            value={logData.password}
            name="password"
            placeholder="Enter password"
          />
        </div>
        <button onClick={loginUser}>Submit</button>
        <div className="not-register">
          Not yet registered?{" "}
          <NavLink to="/register" exact className="link-to">
            Register
          </NavLink>
        </div>
      </form>
    </div>
  );
}

export default Login;
