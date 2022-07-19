import React, { useEffect, useContext } from "react";
import { getProducts } from "./redux/actions/action";
import { useDispatch, useSelector } from "react-redux";
import "react-multi-carousel/lib/styles.css";
import "../styles/home.css";
import "../styles/slide.css";
import Banner from "./banner";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "./context/contextProvider";
function Home() {
  const { products } = useSelector((state) => state.getProductsData);
  //console.log("Home products area=>", products);
  const { account, setAccount } = useContext(LoginContext);
  //console.log("Account =>", account);
  const history = useNavigate("");
  const dispatch = useDispatch();
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }
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

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <>
      <Banner />
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
              <li className="nav-link-area" style={{ listStyle: "none", cursor: "none" }}>
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
      <div className="slide-area">
        <div className="slide-content">
          <div className="head-slide">Shirts</div>
          <div className="container">
            <div className="row">
              {products.map((i) =>
                i.category === "Shirts" ? (
                  <div
                    style={{ marginBottom: "20px" }}
                    className="col-lg-4 col-md-6 col-sm-6 d-flex justify-content-center"
                    key={i.id}
                  >
                    <div className="card" style={{ width: "250px" }}>
                      <img
                        className="card-img-top"
                        src={i.imageUrl}
                        alt={i.imageUrl}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{i.title.mainTitle}</h5>
                        <p className="card-text">{i.description}</p>
                        <p className="size">
                          Sizes Available:{" "}
                          {i.size.map((k, index) => (index ? ", " : "") + k)}
                        </p>
                        <NavLink
                          style={{ color: "white", textDecoration: "none" }}
                          to={`/getproductDetail/${i.id}`}
                        >
                          <button className="action-bt">More Info</button>
                        </NavLink>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="slide-area">
        <div className="slide-content">
          <div className="head-slide">Jeans</div>
          <div className="container">
            <div className="row">
              {products.map((i) =>
                i.category === "Jeans" ? (
                  <div
                    style={{ marginBottom: "20px" }}
                    className="col-lg-4 col-md-6 col-sm-6 d-flex justify-content-center"
                    key={i.id}
                  >
                    <div className="card" style={{ width: "250px" }}>
                      <img
                        className="card-img-top"
                        src={i.imageUrl}
                        alt={i.imageUrl}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{i.title.mainTitle}</h5>
                        <p className="card-text">{i.description}</p>
                        <p className="size">
                          Sizes Available:{" "}
                          {i.size.map((k, index) => (index ? ", " : "") + k)}
                        </p>
                        <NavLink
                          style={{ color: "white", textDecoration: "none" }}
                          to={`/getproductDetail/${i.id}`}
                        >
                          <button className="action-bt">More Info</button>
                        </NavLink>{" "}
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="slide-area">
        <div className="slide-content">
          <div className="head-slide">Shoes</div>
          <div className="container">
            <div className="row">
              {products.map((i) =>
                i.category === "Shoes" ? (
                  <div
                    style={{ marginBottom: "20px" }}
                    className="col-lg-4 col-md-6 col-sm-6 d-flex justify-content-center"
                    key={i.id}
                  >
                    <div className="card" style={{ width: "250px" }}>
                      <img
                        className="card-img-top"
                        src={i.imageUrl}
                        alt={i.imageUrl}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{i.title.mainTitle}</h5>
                        <p className="card-text">{i.description}</p>
                        <NavLink
                          style={{ color: "white", textDecoration: "none" }}
                          to={`/getproductDetail/${i.id}`}
                        >
                          <button className="action-bt">More Info</button>
                        </NavLink>{" "}
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
