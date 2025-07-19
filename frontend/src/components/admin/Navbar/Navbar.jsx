import React, { useState } from "react";
import { Bell, Menu, User, LogOut, Settings, Info } from "lucide-react";
import { useAuth } from "../../../context/AuthProvider";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [showFullId, setShowFullId] = useState(false);

  const maskId = (idNumber) => {
    if (!idNumber || idNumber.length < 5) return idNumber;
    return `${idNumber.slice(0, 2)}..${idNumber.slice(-3)}`;
  };

  const handleLogout = async () => {
    await  logout();
    navigate("/auth/sign-in");
  };

  const handleIdClick = () => {
    if (!user?.idNumber) return;
    setShowFullId(true);
    setTimeout(() => setShowFullId(false), 4000);
  };

  return (
    <header className="fixed top-0 left-0 right-0 w-full h-[50px] bg-white shadow flex items-center justify-between px-6 z-40">
      <div className="flex items-center gap-4">
        <Menu className="w-6 h-6 text-gray-700 cursor-pointer md:hidden" />
        <h1 className="text-xl font-bold text-gray-800">Administration</h1>
      </div>

      <div className="flex items-center gap-6">
        <button
          className="bg-blue-500 py-[0.2rem] px-[1rem] text-white rounded-sm"
          onClick={handleLogout}
        >
          Logout
        </button>

        <div className="flex flex-col text-sm text-gray-800 text-right">
          <span>
            {user?.firstName} {user?.secondName}
          </span>
        </div>

        <div className="relative">
          <Bell
            className="w-6 h-6 text-gray-600 cursor-pointer"
            title="Notifications"
          />
          <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full animate-ping"></span>
          <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
        </div>

        <div className="relative group">
          <div className="flex items-center gap-2 cursor-pointer">
            <User className="w-6 h-6 text-gray-600" />
            <div className="text-sm text-gray-700">
              <div>
                {user?.firstName} {user?.secondName}
              </div>
              {user?.idNumber && (
                <button
                  onClick={handleIdClick}
                  className="text-xs text-blue-600 hover:underline"
                  title="Click to show full ID"
                >
                  {maskId(user.idNumber)}
                </button>
              )}
            </div>
          </div>

          <div className="absolute right-0 mt-2 w-44 bg-white shadow-md rounded-md opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-150 z-10">
            <a
              href="/admin/settings"
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <Settings className="w-4 h-4" /> Settings
            </a>
          </div>
        </div>
      </div>

      {showFullId && (
        <div className="fixed top-14 left-1/2 transform -translate-x-1/2 bg-blue-100 text-blue-700 px-4 py-2 rounded shadow-md flex items-center gap-2 z-50">
          <Info className="w-4 h-4" />
          <span>
            Full ID Number: <strong>{user.idNumber}</strong>
          </span>
        </div>
      )}
    </header>
  );
};

export default Navbar;
