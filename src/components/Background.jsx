import React from "react";
import slide1 from "../assets/slide1.jpg";
import slide2 from "../assets/slide2.jpg";
import slide3 from "../assets/slide3.jpg";
import slide4 from "../assets/slide4.jpg";

const Background = ({ heroCount }) => {
  const slides = [slide1, slide2, slide3, slide4];

  return (
    <img
      className="w-full h-full object-cover"
      src={slides[heroCount]}
      alt="background"
    />
  );
};

export default Background;
