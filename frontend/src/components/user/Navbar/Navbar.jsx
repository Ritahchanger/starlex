import React, { useState } from "react";
import { Menu, X, ChevronDown, Wifi, Shield, Globe, Code } from "lucide-react";
import { useDispatch } from "react-redux";
import { openContactModal } from "../../../store/Features/ContactSlice";
import { openQuotationSlice } from "../../../store/Features/QuotationSlice";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setActiveDropdown(null);
  };
  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };
  const handleNavigation = (href, modal) => {
    if (modal === "contact") {
      dispatch(openContactModal());
      setIsOpen(false);
      return;
    }
    if (href.startsWith("#")) {
      const id = href.replace("#", "");

      if (location.pathname === "/") {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        setActiveSection(id);
      } else {
        navigate("/");
        setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
          setActiveSection(id);
        }, 300);
      }
    } else {
      navigate(href);
      setActiveSection(href === "/" ? "home" : href.replace("/", ""));
    }
    setIsOpen(false);
  };
  const menuItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Contact", href: "#contact", modal: "contact" },
    { name: "Services", href: "#contact", modal: "services" },
  ];


  return (
    <nav className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 shadow-2xl fixed w-full right-0 left-0 top-0 z-40 py-[0.3rem]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between">
          <div className="flex items-center space-x-3">
            <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent">
              Starlex Networks
            </h1>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => handleNavigation(item.href, item.modal)}
                className="text-white hover:text-blue-200 transition-colors duration-300 font-medium"
              >
                {item.name}
              </button>
            ))}
            <div className="relative">
              <button className="text-white hover:text-blue-200 transition-colors duration-300 font-medium flex items-center space-x-1"
              
              >
                <span>Services</span>
              </button>
            </div>

            {/* Quote Button */}
            <button
              className="group bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 text-white px-8 py-[0.7rem] rounded-full font-semibold shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
              onClick={() => dispatch(openQuotationSlice())}
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

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={toggleMenu}
        ></div>
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-blue-800 to-blue-900 z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="px-4 py-4 space-y-1">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => handleNavigation(item.href, item.modal)}
              className="block w-full text-left text-white hover:text-blue-200 hover:bg-blue-700 px-3 py-2 rounded transition-colors duration-200"
            >
              {item.name}
            </button>
          ))}

          {/* Mobile Services Dropdown */}
          <div>
            <button className="w-full flex items-center justify-between text-white hover:text-blue-200 hover:bg-blue-700 px-3 py-2 rounded transition-colors duration-200">
              <span>Services</span>
            </button>
          </div>

          {/* Get Quote Button */}
          <div className="pt-4 pb-2">
            <button
              className="w-full bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-400 hover:to-blue-300 text-white px-6 py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              onClick={() => {
                dispatch(openQuotationSlice());
                setIsOpen(false);
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
