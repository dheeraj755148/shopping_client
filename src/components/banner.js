import React from "react";
import Shirts from "../images/shirts.png";
import Jeans from "../images/jeans.png";
import Shoes from "../images/shoes.png";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
function Banner() {
  return (
    <Carousel
        showArrows={false}
        showIndicators={false}
        showStatus={false}
        showThumbs={false}
        autoPlay={true}
        interval = "2000"
        infiniteLoop ={true}
    >
      <div>
        <img src={Shirts} style={{width: "100%",maxHeight:"700px",objectFit:"fill"}} alt="shirt" />
      </div>
      <div>
        <img src={Jeans} style={{width: "100%",maxHeight:"700px",objectFit:"fill"}} alt="jeans" />
      </div>
      <div>
        <img src={Shoes} style={{width: "100%",maxHeight:"700px",objectFit:"fill"}} alt="shoes" />
      </div>
    </Carousel>
  );
}

export default Banner;
