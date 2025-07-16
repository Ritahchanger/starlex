import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Star } from "lucide-react";

import useWindowWidth from "../../../Hooks/useWindowWidth";

const testimonials = [
  {
    name: "Jane Mwangi",
    role: "Business Owner",
    message:
      "Starlex Networks transformed our digital infrastructure. Their professionalism and attention to detail are unmatched.",
  },
  {
    name: "David Otieno",
    role: "CTO, Fintech Africa",
    message:
      "Reliable, scalable, and secure. They understood our needs and delivered ahead of schedule. Highly recommended!",
  },
  {
    name: "Faith Wanjiku",
    role: "Head of IT, EduTech",
    message:
      "The Starlex team built a custom solution that streamlined our operations. They’re not just a vendor—they’re partners.",
  },
  {
    name: "Peter Kimani",
    role: "Entrepreneur",
    message:
      "Their team is responsive, innovative, and results-driven. I'm glad I chose Starlex for my tech solutions.",
  },
];

const responsive = {
  superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 4 },
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
  tablet: { breakpoint: { max: 1024, min: 768 }, items: 2 },
  mobile: { breakpoint: { max: 768, min: 0 }, items: 1 },
};

const Testimonials = () => {
  const width = useWindowWidth();
  const isMobileOrTablet = width < 1024;

  return (
    <section
      id="testimonials"
      className="bg-white py-20 text-gray-800 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-orange-500 via-yellow-400 to-orange-600">
          What Our Clients Say
        </h2>
        <p className="text-gray-600 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
          Real voices from satisfied clients across various industries.
        </p>

        <Carousel
          swipeable
          draggable
          showDots={isMobileOrTablet}
          responsive={responsive}
          ssr
          infinite
          autoPlay
          autoPlaySpeed={4000}
          keyBoardControl
          customTransition="all .5"
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          dotListClass="custom-dot-list-style"
          itemClass="px-4"
        >
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded p-6 shadow hover:shadow-md transition-all duration-300 text-left h-full flex flex-col justify-between"
            >
              <div>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  “{t.message}”
                </p>
              </div>
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="text-yellow-400 w-4 h-4" />
                  ))}
                </div>
                <p className="font-semibold text-gray-800">{t.name}</p>
                <p className="text-sm text-gray-500">{t.role}</p>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default Testimonials;
