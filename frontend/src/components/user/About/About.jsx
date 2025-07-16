import React from "react";
import { Target, Eye } from "lucide-react";

const About = () => {
  return (
    <section
      id="about"
      className="relative bg-white py-20 text-gray-800 overflow-hidden"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-orange-500 via-yellow-400 to-orange-600">
          About Starlex Networks
        </h2>
        <p className="text-gray-600 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
          At Starlex Networks, we are passionate about empowering businesses and
          communities through secure, scalable, and innovative technology. We’re
          committed to delivering excellence through integrity, reliability, and
          client-first service.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          {/* Mission */}
          <div className="bg-gray-50 border-4 border-orange-500 rounded-md p-6 shadow hover:shadow-lg transition duration-300">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 rounded-full bg-gradient-to-tr from-blue-500 to-orange-400 shadow-md">
                <Target className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">
                Our Mission
              </h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              To deliver reliable, innovative, and scalable technology solutions
              that help businesses thrive in a digital-first world. We aim to
              bridge gaps through secure networks, modern applications, and
              user-focused digital experiences.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-gray-50 border-4 border-orange-500 rounded-md p-6 shadow hover:shadow-lg transition duration-300">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 rounded-full bg-gradient-to-tr from-cyan-500 to-orange-400 shadow-md">
                <Eye className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">
                Our Vision
              </h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              To be the leading technology partner across Africa, recognized for
              transforming ideas into digital realities through cutting-edge
              innovation, integrity, and client-centered service delivery.
            </p>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          {/* Core Values */}
          <div className="bg-white border-l-4 border-orange-400 p-6 rounded shadow hover:shadow-md transition-all duration-300">
            <h4 className="text-lg font-semibold text-gray-800 mb-3">
              Our Core Values
            </h4>
            <ul className="text-gray-600 list-disc list-inside text-sm space-y-1">
              <li>Innovation and Creativity</li>
              <li>Integrity and Trust</li>
              <li>Customer-Centric Approach</li>
              <li>Security and Reliability</li>
              <li>Teamwork and Collaboration</li>
            </ul>
          </div>

          {/* What Sets Us Apart */}
          <div className="bg-white border-l-4 border-cyan-500 p-6 rounded shadow hover:shadow-md transition-all duration-300">
            <h4 className="text-lg font-semibold text-gray-800 mb-3">
              What Sets Us Apart
            </h4>
            <ul className="text-gray-600 list-disc list-inside text-sm space-y-1">
              <li>Experienced and passionate team</li>
              <li>24/7 client support and maintenance</li>
              <li>Cutting-edge technologies</li>
              <li>Custom-tailored solutions</li>
              <li>Transparent communication and delivery</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
