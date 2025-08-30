import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import data from './ctousel.js'


export default function Carousels() {
  // const CarouselImages = [crousel1, crousel2, crousel3, crousel4, crousel5, crousel6, crousel7];

  return (
    <div className="w-full max-w-full mx-auto rounded-2xl overflow-hidden shadow-lg">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showIndicators={false}
        showStatus={false}
        interval={3000}
        className="rounded-2xl"
      >
        {data.map((item, index) => (
  <div key={index} className="relative w-full h-[400px] md:h-[500px]">
    <img
      src={item.image}
      alt={`carousel-${index}`}
      className="w-full h-full object-cover"
    />
    {/* Centered text */}
    <div className="absolute inset-0 flex items-center justify-center">
      <h2 className="text-white text-3xl md:text-5xl font-bold text-center mx-8 talic drop-shadow-[5px_5px_7px_rgba(0,0,0,0.9)]">
        {item.text}
      </h2>
    </div>
  </div>
))}

      </Carousel>
    </div>
  );
}
