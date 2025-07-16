import React from "react";
import Navbar from "../Navbar/Navbar";
import {
  ArrowRight,
  Zap,
  Shield,
  Globe,
  Code,
  Star,
  CheckCircle,
} from "lucide-react";

const Hero = () => {
  return (
    <div className="relative overflow-hidden">
      <Navbar />
      <section className="relative h-[100vh] bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 flex items-center">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-20 w-64 h-64 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>

          <div className="absolute top-32 right-1/4 opacity-10">
            <Zap className="h-16 w-16 text-white animate-bounce" />
          </div>
          <div className="absolute bottom-32 left-1/4 opacity-10">
            <Shield className="h-20 w-20 text-white animate-bounce animation-delay-1000" />
          </div>
          <div className="absolute top-1/2 right-20 opacity-10">
            <Globe className="h-12 w-12 text-white animate-bounce animation-delay-2000" />
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white space-y-8">
              <div className="hidden sm:inline-flex items-center space-x-2 bg-blue-700/50 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-400/30">
                <Star className="h-4 w-4 text-yellow-400" />
                <span className="text-sm font-medium">
                  Trusted Technology Partner
                </span>
              </div>
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent">
                    Empowering Your
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-cyan-200 via-blue-300 to-white bg-clip-text text-transparent">
                    Digital Future
                  </span>
                </h1>

                <p className="text-xl md:text-2xl text-blue-200 font-light max-w-2xl">
                  Complete technology solutions for networking, security, web
                  development, and software innovation
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { icon: Zap, text: "High-Performance Networks" },
                  { icon: Shield, text: "Advanced Security Systems" },
                  { icon: Globe, text: "Modern Web Solutions" },
                  { icon: Code, text: "Custom Software Development" },
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 group"
                  >
                    <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-2 rounded-lg group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-blue-100 font-medium">
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button className="group bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 text-white px-8 py-[0.7rem] rounded-full font-semibold shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2">
                  <span>Get Started Today</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>

                <button className="hidden md:block group bg-transparent border-2 border-white/30 hover:border-white/60 text-white px-8 py-[0.7rem] rounded-full font-semibold backdrop-blur-sm hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
                  View Our Work
                </button>
              </div>
            </div>
            <div className="hidden lg:flex flex-col space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-sm p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="bg-gradient-to-r from-green-400 to-emerald-500 p-2 rounded-lg">
                      <CheckCircle className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-white">500+</p>
                      <p className="text-blue-200 text-sm">
                        Projects Completed
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-sm p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="bg-gradient-to-r from-purple-400 to-pink-500 p-2 rounded-lg">
                      <Star className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-white">5 Years</p>
                      <p className="text-blue-200 text-sm">Experience</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-sm p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-2 rounded-lg">
                      <Zap className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-white">24/7</p>
                      <p className="text-blue-200 text-sm">Support</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-sm p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="bg-gradient-to-r from-blue-400 to-cyan-500 p-2 rounded-lg">
                      <Shield className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-white">100%</p>
                      <p className="text-blue-200 text-sm">Secure</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-sm p-6 border border-white/20">
                <h3 className="text-white font-semibold mb-4">
                  Why Choose Starlex?
                </h3>
                <div className="space-y-3">
                  {[
                    "Expert team with 5+ years experience",
                    "Cutting-edge technology solutions",
                    "24/7 technical support",
                    "Competitive pricing & quality",
                  ].map((point, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <span className="text-blue-100 text-sm">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 animate-bounce">
          <div className="flex flex-col items-center space-y-2">
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
            </div>
            <span className="text-xs">Scroll Down</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
