import React from "react";
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  Settings,
  LogOut,
} from "lucide-react";

const menuItems = [
  {
    icon: <LayoutDashboard size={20} />,
    label: "Dashboard",
    href: "/admin/dashboard",
  },
  { icon: <Users size={20} />, label: "Users", href: "/admin/users" },
  { icon: <ClipboardList size={20} />, label: "Orders", href: "/admin/orders" },
  { icon: <Settings size={20} />, label: "Settings", href: "/admin/settings" },
];

const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-gradient-to-b from-indigo-900 via-indigo-800 to-indigo-900 text-white flex flex-col fixed top-0 left-0 shadow-xl">
      <div className="p-6 py-2 text-2xl font-extrabold tracking-wide border-b border-indigo-700">
        Startlex 
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item, index) => (
          <a
            key={index}
            href={item.href}
            className="flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-md hover:bg-indigo-700 hover:text-white transition-all"
          >
            {item.icon}
            <span>{item.label}</span>
          </a>
        ))}
      </nav>

      <div className="p-4 border-t border-indigo-700">
        <a
          href="/logout"
          className="flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-md bg-red-600 hover:bg-red-700 transition-all"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
