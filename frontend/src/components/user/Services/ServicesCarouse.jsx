import { FileSpreadsheet } from "lucide-react";
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 2 },
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 2 },
  tablet: { breakpoint: { max: 1024, min: 768 }, items: 2 },
  mobile: { breakpoint: { max: 768, min: 0 }, items: 1 },
};

const services = [
  {
    title: "CCTV Installations",
    image: "https://images.pexels.com/photos/430208/pexels-photo-430208.jpeg",
  },
  {
    title: "Web Development",
    image:
      "https://images.pexels.com/photos/39284/macbook-apple-imac-computer-39284.jpeg",
  },
  {
    title: "Software Development",
    image: "https://images.pexels.com/photos/3861972/pexels-photo-3861972.jpeg",
  },
  {
    title: "Data Engineering & DevOps",
    image: "https://images.pexels.com/photos/4816921/pexels-photo-4816921.jpeg",
  },
];

const ServicesCarousel = () => {
  const showDots = window.innerWidth <= 768;

  return (
    <div className="py-10 bg-white">
      <Carousel
        swipeable
        draggable
        showDots={false}
        responsive={responsive}
        ssr
        infinite
        autoPlay
        autoPlaySpeed={2000}
        keyBoardControl
        customTransition="transform 500ms ease-in-out"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list-style"
        itemClass="px-2"
      >
        {services.map((service, index) => (
          <div
            key={index}
            className="relative overflow-hidden  group hover:shadow-2xl transition-all duration-300"
          >
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center">
              <h3 className="text-white text-lg md:text-xl font-semibold text-center px-4">
                {service.title}
              </h3>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ServicesCarousel;
