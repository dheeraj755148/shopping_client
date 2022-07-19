import React, { useContext, useEffect, useState } from "react";
import "../../styles/cart.css";
import { useNavigate, useParams } from "react-router-dom";
import "../../styles/loading.css";
import { LoginContext } from "../context/contextProvider";
function Cart() {
  const { id } = useParams("");

  const history = useNavigate("");
  const [individualData, setIndividualData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { account, setAccount } = useContext(LoginContext);

  const getIndividualDataLogs = async () => {
    const res = await fetch(`http://localhost:8005/getproductDetail/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const data = await res.json();
    setIndividualData(data);
    setLoading(true);
  };
  //console.log(individualData);
  useEffect(() => {
    getIndividualDataLogs();
  }, [id]);

  const addToCart = async (id) => {
    const checkres = await fetch(`http://localhost:8005/addcart/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        individualData,
      }),
    });
    const data = await checkres.json();
    //console.log("cart data front", data);

    if (checkres.status === 401 || !data) {
      console.log("User invalid");
      //alert("user invalid");
    } else {
      //alert("Data added to cart");
      history("/buynow")
      setAccount(data);
    }
  };

  if (loading) {
    return (
      <div className="cart-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-5 col-md-6 col-sm-12 image-area">
              <img src={individualData.imageUrl} alt="" />
            </div>
            <div className="col-lg-7 col-md-6 col-sm-12 content-area">
              <div className="header">{individualData.title.mainTitle}</div>
              <div className="header-sub">{individualData.title.subTitle}</div>

              <div className="price-old">
                MRP: {individualData.price.oldPrice} Rs
              </div>
              <div className="price-new">
                Price: {individualData.price.newPrice} Rs
              </div>
              <div className="discount">
                You save:{" "}
                {individualData.price.oldPrice - individualData.price.newPrice}{" "}
                Rs (
                {Math.ceil(
                  ((individualData.price.oldPrice -
                    individualData.price.newPrice) /
                    individualData.price.oldPrice) *
                    100
                )}
                %)
              </div>
              <div className="header-info">
                <div>About this item:</div>
                {individualData.description}
              </div>
              <div className="call-to-action">
                <button className="actions" onClick={() => addToCart(individualData.id)}>Buy Now</button>
                <button
                  className="actions"
                  onClick={() => addToCart(individualData.id)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <div className="loading-screen">Loading..</div>;
  }
}

export default Cart;
