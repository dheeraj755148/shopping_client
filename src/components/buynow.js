import React, { useEffect, useState, useContext } from "react";
import "../styles/buy.css";
import "../styles/loading.css";
import Delete from "./delete";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "./context/contextProvider";

function Buynow() {
  const history = useNavigate("");
  const { account, setAccount } = useContext(LoginContext);

  const [cartData, setCartData] = useState();
  const [loading, setLoading] = useState(false);
  const [lengthofcart, setlengthofcart] = useState();
  const [totalPrice, setTotalPrice] = useState(0);
  //console.log(cartData);
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }
  const getData = async () => {
    const res = await fetch("http://localhost:8005/cartdetails", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
    });
    const data = await res.json();

    if (res.status !== 201) {
      console.log("Error");
    } else {
      setCartData(data.carts);
      setlengthofcart(data.carts.length);
      totalPriceFunction();
      setLoading(true);
    }
  };
  const totalPriceFunction = () => {
    let price = 0;
    (cartData || []).map((i) => {
      price += i.price.newPrice;
    });
    setTotalPrice(price);
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
  const orderPlaced =()=>{
    alert("Order placed")
    
  }
  useEffect(() => {
    getData();
    totalPriceFunction();
  }, [cartData]);

  if (loading) {
    return (
      <>
        <div id="mySidenav" className="sidenav">
          <a href="javascript:void(0)" className="closebtn" onClick={closeNav}>
            &times;
          </a>
          <div className="items-area">
            <div className="item-content">
              {account ? (
                ""
              ) : (
                <NavLink to="/login" exact>
                  Login
                </NavLink>
              )}
            </div>
            <div className="item-content">
              {account ? (
                <li
                  className="nav-link-area"
                  style={{ listStyle: "none", cursor: "none" }}
                >
                  <NavLink to="#" exact>
                    Username: {account.name.toUpperCase()}
                  </NavLink>
                </li>
              ) : (
                <li className="nav-link-area" style={{ listStyle: "none" }}>
                  <NavLink to="/register" exact>
                    Register
                  </NavLink>
                </li>
              )}
            </div>
            <div className="item-content">
              {account ? (
                <NavLink to="/buynow">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M13.5 21C13.224 21 13 20.776 13 20.5C13 20.224 13.224 20 13.5 20C13.776 20 14 20.224 14 20.5C14 20.776 13.776 21 13.5 21ZM13.5 19C12.672 19 12 19.672 12 20.5C12 21.328 12.672 22 13.5 22C14.328 22 15 21.328 15 20.5C15 19.672 14.328 19 13.5 19ZM7.5 21C7.224 21 7 20.776 7 20.5C7 20.224 7.224 20 7.5 20C7.776 20 8 20.224 8 20.5C8 20.776 7.776 21 7.5 21ZM7.5 19C6.672 19 6 19.672 6 20.5C6 21.328 6.672 22 7.5 22C8.328 22 9 21.328 9 20.5C9 19.672 8.328 19 7.5 19ZM24 3H21.036L17.394 18H4.073L0 4.997H19.522L20.25 2H24V3ZM1.419 5.997L4.812 17H16.606L19.28 5.997H1.419Z"
                      fill="white"
                    />
                  </svg>

                  {account.carts.length}
                </NavLink>
              ) : (
                <NavLink to="/login">
                  <div>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M13.5 21C13.224 21 13 20.776 13 20.5C13 20.224 13.224 20 13.5 20C13.776 20 14 20.224 14 20.5C14 20.776 13.776 21 13.5 21ZM13.5 19C12.672 19 12 19.672 12 20.5C12 21.328 12.672 22 13.5 22C14.328 22 15 21.328 15 20.5C15 19.672 14.328 19 13.5 19ZM7.5 21C7.224 21 7 20.776 7 20.5C7 20.224 7.224 20 7.5 20C7.776 20 8 20.224 8 20.5C8 20.776 7.776 21 7.5 21ZM7.5 19C6.672 19 6 19.672 6 20.5C6 21.328 6.672 22 7.5 22C8.328 22 9 21.328 9 20.5C9 19.672 8.328 19 7.5 19ZM24 3H21.036L17.394 18H4.073L0 4.997H19.522L20.25 2H24V3ZM1.419 5.997L4.812 17H16.606L19.28 5.997H1.419Z"
                        fill="white"
                      />
                    </svg>
                    0
                  </div>
                </NavLink>
              )}
            </div>
            <div className="item-content" onClick={handleClose}>
              <NavLink to="#">Logout</NavLink>
            </div>
          </div>
        </div>
        {cartData.length ? (
          <div className="buynow-area">
            <div className="header">Your Cart</div>
            <div className="container">
              <div className="row">
                <div className="col-lg-8 col-md-6 col-sm-12 cart-contents">
                  {cartData.map((i) => (
                    <div className="cart-components" key={i._id}>
                      <div className="img-space">
                        <img src={i.imageUrl} alt="" />
                      </div>
                      <div className="content-info">
                        <div className="title">{i.title.mainTitle}</div>
                        <div className="sub-title">{i.title.subTitle}</div>
                        <div className="description">{i.description}</div>
                        <div className="price">
                          Final Price: Rs.{i.price.newPrice}
                        </div>
                        <div className="delete-item">
                          <Delete deleteId={i.id} get={getData} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12 buy-contents d-flex justify-content-center">
                  <div className="last-area">
                    <div className="total-item">
                      Total items: {lengthofcart}
                    </div>
                    <div className="total-cost">
                      Total Price: {totalPrice} Rs
                    </div>
                    <button
                      className="buy-now-button"
                      onClick={orderPlaced}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="buynow-area">
            <div className="header">Your Cart</div>
            <div className="container">
              <div className="row">
                <div className="col-lg-8 col-md-6 col-sm-12 cart-contents">
                  Cart is empty
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12 buy-contents d-flex justify-content-center">
                  <button disabled={true} className="buy-now-button">
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  } else {
    return <div className="loading-screen">Loading..</div>;
  }
}

export default Buynow;
