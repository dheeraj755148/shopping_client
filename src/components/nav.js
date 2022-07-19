import React, { useContext, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/nav.css";
import { LoginContext } from "./context/contextProvider";
import { Dropdown, DropdownButton } from "react-bootstrap";

function Nav() {
  const { account, setAccount } = useContext(LoginContext);
  //console.log("Account =>", account);
  const history = useNavigate("");
  const getDetailsValid = async () => {
    const res = await fetch("http://localhost:8005/validateuser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
    });
    const data = await res.json();

    //console.log("Nav area data",data);
    if (res.status !== 201) {
      console.log("error");
    } else {
      setAccount(data);
    }
  };

  const handleClose = async () => {
    const res2 = await fetch("http://localhost:8005/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
    });
    const data2 = await res2.json();

    //console.log("Nav area data",data);
    if (res2.status !== 201) {
      console.log("error");
    } else {
      history("/");
      setAccount(false);
    }
  };

  function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
  }

  useEffect(() => {
    getDetailsValid();
  }, []);

  return (
    <div className="nav-custom">
      <div className="left-content">
        <div className="company-logo">HaLo Infinite.</div>
      </div>
      <div className="right-content">
        <ul>
          <li className="nav-link-area">
            <NavLink to="/" exact>
              Home
            </NavLink>
          </li>
          {/* <li className="nav-link-area">
            <NavLink to="/login" exact>
              Login
            </NavLink>
          </li> */}
          {account ? (
            ""
          ) : (
            <li className="nav-link-area">
              <NavLink to="/login" exact>
                Login
              </NavLink>
            </li>
          )}
          {account ? (
            <li className="nav-link-area">
              <Dropdown>
                <Dropdown.Toggle className="custom-drop" id="dropdown-basic">
                  Username: {account.name.toUpperCase()}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={handleClose}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
          ) : (
            <li className="nav-link-area">
              <NavLink to="/register" exact>
                Register
              </NavLink>
            </li>
          )}
          <li className="nav-link-area">
            {account ? (
              <NavLink to="/buynow">
                <div>
                  <svg
                    width="24"
                    height="24"
                    xmlns="http://www.w3.org/2000/svg"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  >
                    <path d="M13.5 21c-.276 0-.5-.224-.5-.5s.224-.5.5-.5.5.224.5.5-.224.5-.5.5m0-2c-.828 0-1.5.672-1.5 1.5s.672 1.5 1.5 1.5 1.5-.672 1.5-1.5-.672-1.5-1.5-1.5m-6 2c-.276 0-.5-.224-.5-.5s.224-.5.5-.5.5.224.5.5-.224.5-.5.5m0-2c-.828 0-1.5.672-1.5 1.5s.672 1.5 1.5 1.5 1.5-.672 1.5-1.5-.672-1.5-1.5-1.5m16.5-16h-2.964l-3.642 15h-13.321l-4.073-13.003h19.522l.728-2.997h3.75v1zm-22.581 2.997l3.393 11.003h11.794l2.674-11.003h-17.861z" />
                  </svg>
                  {account.carts.length}
                </div>
              </NavLink>
            ) : (
              <NavLink to="/login">
                <div>
                  <svg
                    width="24"
                    height="24"
                    xmlns="http://www.w3.org/2000/svg"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  >
                    <path d="M13.5 21c-.276 0-.5-.224-.5-.5s.224-.5.5-.5.5.224.5.5-.224.5-.5.5m0-2c-.828 0-1.5.672-1.5 1.5s.672 1.5 1.5 1.5 1.5-.672 1.5-1.5-.672-1.5-1.5-1.5m-6 2c-.276 0-.5-.224-.5-.5s.224-.5.5-.5.5.224.5.5-.224.5-.5.5m0-2c-.828 0-1.5.672-1.5 1.5s.672 1.5 1.5 1.5 1.5-.672 1.5-1.5-.672-1.5-1.5-1.5m16.5-16h-2.964l-3.642 15h-13.321l-4.073-13.003h19.522l.728-2.997h3.75v1zm-22.581 2.997l3.393 11.003h11.794l2.674-11.003h-17.861z" />
                  </svg>
                  0
                </div>
              </NavLink>
            )}
          </li>
          <>
            <span
              style={{ fontSize: "30px", cursor: "pointer" }}
              onClick={openNav}
            >
              <svg
                width="24"
                height="24"
                xmlns="http://www.w3.org/2000/svg"
                fill-rule="evenodd"
                clip-rule="evenodd"
              >
                <path
                  d="M24 18v1h-24v-1h24zm0-6v1h-24v-1h24zm0-6v1h-24v-1h24z"
                  fill="#1040e2"
                />
                <path d="M24 19h-24v-1h24v1zm0-6h-24v-1h24v1zm0-6h-24v-1h24v1z" />
              </svg>
            </span>
          </>
        </ul>
      </div>
    </div>
  );
}

export default Nav;
