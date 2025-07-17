import React from "react";
import { Bell, Menu, Search, User, LogOut, Settings } from "lucide-react";

const Navbar = () => {
  return (
    <header className="w-full h-[40px] bg-white shadow flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <Menu className="w-6 h-6 text-gray-700 cursor-pointer md:hidden" />
        <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
      </div>

      <div className="hidden md:flex items-center bg-gray-100 px-3 py-1 rounded-full w-72">
        <Search className="w-4 h-4 text-gray-500" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent outline-none text-sm px-2 w-full"
        />
      </div>

      <div className="flex items-center gap-6">
        <div className="relative">
          <Bell className="w-6 h-6 text-gray-600 cursor-pointer" />
          <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full animate-ping"></span>
          <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
        </div>

        <div className="relative group">
          <div className="flex items-center gap-2 cursor-pointer">
            <User className="w-6 h-6 text-gray-600" />
            <span className="text-sm text-gray-700">Admin</span>
          </div>

          <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-150 z-10">
            <a
              href="/admin/settings"
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <Settings className="w-4 h-4" /> Settings
            </a>
            <a
              href="/logout"
              className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
            >
              <LogOut className="w-4 h-4" /> Logout
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
