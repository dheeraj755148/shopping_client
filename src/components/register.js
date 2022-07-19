import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "../styles/login.css";

function Register() {
  /* const [loading, setLoading] = useState(false); */
  const history = useNavigate("");

  const [update, setUpdate] = useState({
    name: "",
    email: "",
    password: "",
    passwordAgain: "",
  });

  const addData = (e) => {
    const { name, value } = e.target;
    setUpdate(() => {
      return {
        ...update,
        [name]: value,
      };
    });
  };

  const registerData = async (e) => {
    e.preventDefault();
    const { name, email, password, passwordAgain } = update;
    const req = await fetch("http://localhost:8005/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        passwordAgain,
      }),
    });
    const data = await req.json();
    //console.log(data);

    if (req.status === 422 || !data) {
      alert("No data");
    } else {
      alert("User registered");
      setUpdate({
        ...update,
        name: "",
        email: "",
        password: "",
        passwordAgain: "",
      });
      history("/login");
    }
  };

  return (
    <div className="login-area">
      <div className="heading">Register</div>
      <form method="post">
        <div className="input-fields">
          <input
            type="text"
            name="name"
            onChange={addData}
            value={update.name}
            placeholder="Enter Name"
          />
        </div>
        <div className="input-fields">
          <input
            type="text"
            name="email"
            onChange={addData}
            value={update.email}
            placeholder="Enter Email"
          />
        </div>
        <div className="input-fields">
          <input
            type="password"
            onChange={addData}
            value={update.password}
            name="password"
            placeholder="Enter password"
          />
        </div>
        <div className="input-fields">
          <input
            type="password"
            onChange={addData}
            value={update.passwordAgain}
            name="passwordAgain"
            placeholder="Enter password again"
          />
        </div>
        <button onClick={registerData}>Submit</button>
        <div className="not-register">
          Registered already?{" "}
          <NavLink to="/login" exact className="link-to">
            Login
          </NavLink>
        </div>
      </form>
    </div>
  );
}

export default Register;
