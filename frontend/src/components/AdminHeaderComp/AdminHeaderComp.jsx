import React from "react";
import { Mail, MessageSquare, FileText, Shield } from "lucide-react";

const cards = [
  {
    id: "newsletters",
    icon: <Mail className="text-blue-500" size={32} />,
    title: "Newsletters",
    description: "All newsletter subscribers",
  },
  {
    id: "messages",
    icon: <MessageSquare className="text-green-500" size={32} />,
    title: "Contact Messages",
    description: "User inquiries and feedback",
  },
  {
    id: "quotations",
    icon: <FileText className="text-purple-500" size={32} />,
    title: "Quotations",
    description: "Requests for pricing",
  },
  {
    id: "admins",
    icon: <Shield className="text-red-500" size={32} />,
    title: "Admins",
    description: "Manage admin accounts",
  },
];

const AdminHeaderComp = ({ onCardClick }) => {
  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <div
          key={index}
          onClick={() => onCardClick(card.id)}
          className="bg-white shadow-md  p-4 flex items-center gap-4 hover:shadow-lg transition-all duration-200 cursor-pointer"
        >
          {card.icon}
          <div>
            <h2 className="text-lg font-semibold">{card.title}</h2>
            <p className="text-sm text-gray-500">{card.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminHeaderComp;
