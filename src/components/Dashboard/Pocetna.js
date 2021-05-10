import React, { Component } from "react";
import SimpleImageSlider from "react-simple-image-slider";

class Pocetna extends Component {
  render() {
    const images = [
        { url: "images/maj.jpg" },
        { url: "images/uranak.jpg" },
        { url: "images/zima.jpg" },
        { url: "images/kefalonija.jpg" },
        { url: "images/zakintos.jpg" },
      ];
    return (
      <div className="d-flex justify-content-center">       
        <SimpleImageSlider
          width={1400}
          height={500}
          images={images}
          showBullets={true}
          showNavs={true}
          slideDuration={0.5}
          style={{ margin: 'auto'}}
        />
       
      </div>
    );
  }
}

export default Pocetna;
