import React, { useState } from "react";
import { Wifi, Shield, Globe, Code, ChevronDown, Loader2 } from "lucide-react";

const services = [
  {
    name: "Networking Solutions",
    icon: Wifi,
    short: "Secure and efficient networks to power your digital operations.",
    details:
      "We design and implement high-performance LAN, WAN, and wireless networks tailored to your needs, ensuring minimal downtime and optimal security protocols.",
  },
  {
    name: "CCTV Systems",
    icon: Shield,
    short: "Smart surveillance systems that ensure your safety and control.",
    details:
      "Our CCTV solutions offer 24/7 surveillance, cloud backups, motion detection, and remote viewing for residential, commercial, and industrial environments.",
  },
  {
    name: "Web Design",
    icon: Globe,
    short: "Beautiful, fast, and responsive websites tailored to your brand.",
    details:
      "We create modern, user-centric websites optimized for all devices, focusing on SEO, speed, and smooth user experience for maximum engagement.",
  },
  {
    name: "Software Development",
    icon: Code,
    short: "Custom applications built to solve complex business challenges.",
    details:
      "From business automation tools to customer-facing platforms, we build scalable software tailored to your goals using modern technologies and agile development.",
  },
];

const Services = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [loadingIndex, setLoadingIndex] = useState(null);

  const toggleAccordion = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null); // collapse if same index is clicked
      return;
    }

    setLoadingIndex(index); // show loading
    setTimeout(() => {
      setActiveIndex(index);
      setLoadingIndex(null);
    }, 300); // 300ms delay
  };

  return (
    <section
      id="services"
      className="bg-gradient-to-br from-orange-500 via-orange-400 to-yellow-300 py-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow-lg">
          What We Offer
        </h2>

        <p className="text-white/90 text-base md:text-lg font-light max-w-2xl mx-auto mb-12">
          From digital transformation to advanced security, our solutions are
          built for innovation and reliability.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-left">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-t-4 border-orange-400"
            >
              <div className="flex items-center justify-center w-14 h-14 mx-auto mb-5 rounded-full bg-gradient-to-tr from-orange-500 to-blue-500 shadow-md">
                <service.icon className="text-white h-6 w-6" />
              </div>

              <h3 className="text-2xl font-semibold text-gray-800 mb-2 text-center">
                {service.name}
              </h3>

              <p className=" text-gray-600 mb-3 leading-relaxed text-center text-sm tracking-widest font-semibold">
                {service.short}
              </p>

              <div className="text-center">
                <button
                  onClick={() => toggleAccordion(index)}
                  className="flex items-center justify-center mx-auto gap-1 text-sm text-orange-500 hover:underline focus:outline-none"
                >
                  {activeIndex === index ? "Hide Details" : "More Details"}
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${
                      activeIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>

              {loadingIndex === index ? (
                <div className="mt-3 text-center">
                  <Loader2 className="w-4 h-4 animate-spin text-orange-400 mx-auto" />
                </div>
              ) : (
                activeIndex === index && (
                  <div className="mt-3 text-sm text-gray-700 tracking-wider  border-t border-neutral-300 pt-3">
                    {service.details}
                  </div>
                )
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
