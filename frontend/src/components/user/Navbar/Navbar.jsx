import React, { useState } from "react";

import { Menu, X, ChevronDown, Wifi, Shield, Globe, Code } from "lucide-react";

import { openContactModal } from "../../../store/Features/ContactSlice";

import { useDispatch } from "react-redux";

import { openQuotationSlice } from "../../../store/Features/QuotationSlice";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const dispatch = useDispatch();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setActiveDropdown(null);
  };

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const services = [
    { name: "Networking Solutions", icon: Wifi },
    { name: "CCTV Systems", icon: Shield },
    { name: "Web Design", icon: Globe },
    { name: "Software Development", icon: Code },
  ];

  return (
    <nav className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 shadow-2xl fixed w-full right-0 left-0 top-0 z-40 py-[0.3rem]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-white">
              <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent">
                Starlex Networks
              </h1>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#home"
              className="text-white hover:text-blue-200 transition-colors duration-300 font-medium"
            >
              Home
            </a>

            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown("services")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="text-white hover:text-blue-200 transition-colors duration-300 font-medium flex items-center space-x-1">
                <span>Services</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-300 ${
                    activeDropdown === "services" ? "rotate-180" : ""
                  }`}
                />
              </button>

              {activeDropdown === "services" && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white  shadow-2xl border border-blue-100 overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-4 py-3">
                    <h3 className="font-semibold text-blue-900">
                      Our Services
                    </h3>
                  </div>
                  {services.map((service, index) => (
                    <a
                      key={index}
                      href={`#${service.name
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                      className="flex items-center space-x-3 px-4 py-3 hover:bg-blue-50 transition-colors duration-200 group"
                    >
                      <service.icon className="h-5 w-5 text-blue-600 group-hover:text-blue-800" />
                      <span className="text-gray-700 group-hover:text-blue-900">
                        {service.name}
                      </span>
                    </a>
                  ))}
                </div>
              )}
            </div>

            <a
              href="#about"
              className="text-white hover:text-blue-200 transition-colors duration-300 font-medium"
            >
              About
            </a>
            <a
              href="#portfolio"
              className="text-white hover:text-blue-200 transition-colors duration-300 font-medium"
            >
              Portfolio
            </a>
            <a
              href="#contact"
              onClick={() => {
                dispatch(openContactModal());
              }}
              className="text-white hover:text-blue-200 transition-colors duration-300 font-medium"
            >
              Contact
            </a>

            <button
              className="bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-400 hover:to-blue-300 text-white px-6 py-2 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              onClick={() => {
                dispatch(openQuotationSlice());
              }}
            >
              Get Quote
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-white hover:text-blue-200 transition-colors duration-300 p-2 z-50"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Backdrop overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={toggleMenu}
        ></div>
      )}

      {/* Slide-in mobile menu from left */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-blue-800 to-blue-900 z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="px-4 py-4 space-y-1">
          <a
            href="#home"
            className="block text-white hover:text-blue-200 hover:bg-blue-700 px-3 py-2 rounded transition-colors duration-200"
          >
            Home
          </a>

          <div>
            <button
              onClick={() => toggleDropdown("services")}
              className="w-full flex items-center justify-between text-white hover:text-blue-200 hover:bg-blue-700 px-3 py-2 rounded transition-colors duration-200"
            >
              <span>Services</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-300 ${
                  activeDropdown === "services" ? "rotate-180" : ""
                }`}
              />
            </button>

            {activeDropdown === "services" && (
              <div className="mt-2 ml-4 space-y-1">
                {services.map((service, index) => (
                  <a
                    key={index}
                    href={`#${service.name.toLowerCase().replace(/\s+/g, "-")}`}
                    className="flex items-center space-x-3 text-blue-200 hover:text-white hover:bg-blue-700 px-3 py-2 rounded-sm transition-colors duration-200 text-sm"
                  >
                    <service.icon className="h-4 w-4" />
                    <span>{service.name}</span>
                  </a>
                ))}
              </div>
            )}
          </div>

          <a
            href="#about"
            className="block text-white hover:text-blue-200 hover:bg-blue-700 px-3 py-2 rounded transition-colors duration-200"
          >
            About
          </a>
          <a
            href="#portfolio"
            className="block text-white hover:text-blue-200 hover:bg-blue-700 px-3 py-2 rounded transition-colors duration-200"
          >
            Portfolio
          </a>
          <a
            href="#contact"
            className="block text-white hover:text-blue-200 hover:bg-blue-700 px-3 py-2 rounded transition-colors duration-200"
            onClick={() => {
              dispatch(openContactModal());
            }}
          >
            Contact
          </a>

          <div className="pt-4 pb-2">
            <button
              className="w-full bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-400 hover:to-blue-300 text-white px-6 py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              onClick={() => {
                dispatch(openQuotationSlice());
              }}
            >
              Get Quote
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
