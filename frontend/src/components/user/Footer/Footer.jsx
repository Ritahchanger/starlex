import React from "react";
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Company Info */}
        <div className="md:col-span-1">
          <h2 className="text-2xl font-bold mb-4 text-orange-400">
            Starlex Networks
          </h2>
          <p className="text-sm text-gray-300">
            Empowering Africa’s digital future with secure, innovative, and
            scalable tech solutions.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-orange-300">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <a href="#home" className="hover:text-white">
                Home
              </a>
            </li>
            <li>
              <a href="#about" className="hover:text-white">
                About
              </a>
            </li>
            <li>
              <a href="#services" className="hover:text-white">
                Services
              </a>
            </li>
            <li>
              <a href="#portfolio" className="hover:text-white">
                Portfolio
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-white">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-orange-300">
            Contact Us
          </h3>
          <ul className="text-sm space-y-2 text-gray-300">
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 mt-1" />
              Nairobi, Kenya
            </li>
            <li className="flex items-start gap-2">
              <Phone className="w-4 h-4 mt-1" />
              +254 712 345 678
            </li>
            <li className="flex items-start gap-2">
              <Mail className="w-4 h-4 mt-1" />
              info@starlexnetworks.com
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-orange-300">
            Connect With Us
          </h3>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-300 hover:text-orange-400">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-300 hover:text-orange-400">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-300 hover:text-orange-400">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-300 hover:text-orange-400">
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Newsletter */}
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="px-6 max-w-[600px]">
          <h3 className="text-lg font-semibold mb-4 text-orange-300">
            Newsletter
          </h3>
          <p className="text-sm text-gray-300 mb-4">
            Stay updated with our latest offers, tech news, and updates.
          </p>
          <form className="flex flex-row sm:flex-row items-center gap-2 w-full">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-grow px-4 py-2 bg-white text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 w-full"
              required
            />
            <button
              type="submit"
              className="group bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 text-white px-8 py-[0.7rem] rounded-full font-semibold shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <Send className="w-4 h-4" />
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-sm text-gray-400 mt-10 border-t border-blue-700 pt-6 px-4">
        &copy; {new Date().getFullYear()} Starlex Networks. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
