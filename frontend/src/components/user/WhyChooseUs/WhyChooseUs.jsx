import React from "react";
import { CheckCircle, ShieldCheck, Brain, Clock, Users } from "lucide-react";

const points = [
  {
    icon: ShieldCheck,
    title: "Trusted Security",
    description:
      "We implement industry-standard security protocols to safeguard your data and operations.",
  },
  {
    icon: Brain,
    title: "Innovative Solutions",
    description:
      "We embrace emerging technologies to solve complex problems and future-proof your business.",
  },
  {
    icon: Clock,
    title: "Timely Delivery",
    description:
      "Our agile workflows ensure we deliver your projects on time without compromising quality.",
  },
  {
    icon: Users,
    title: "Client-Centered Approach",
    description:
      "We listen, adapt, and build with your goals in mind — your success is our mission.",
  },
];

const WhyChooseUs = () => {
  return (
    <section id="why-choose-us" className="py-20 bg-white text-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-orange-500 via-yellow-400 to-orange-600">
          Why Choose Us
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-12">
          At Starlex Networks, our commitment to innovation, integrity, and
          client success sets us apart.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {points.map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 border border-gray-200  p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.03]"
            >
              <div className="w-12 h-12 flex items-center justify-center mx-auto mb-4 rounded-full bg-gradient-to-br from-orange-500 to-yellow-400">
                <item.icon className="text-white w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
