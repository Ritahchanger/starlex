import React, { useState } from "react";
import AdminLayout from "../../../layout/AdminLayout/AdminLayout";
import Quotation from "../../../components/admin/Quotation/Quotation";
import ContactMessages from "../../../components/admin/ContactMessages/ContactMessages";
import NewsLetters from "../../../components/admin/NewsLetters/NewsLetters";
import AdminHeaderComp from "../../../components/AdminHeaderComp/AdminHeaderComp";

import Admin from "../../../components/Admins/Admin";

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("quotations"); // default

  const renderSection = () => {
    switch (activeSection) {
      case "newsletters":
        return <NewsLetters />;
      case "messages":
        return <ContactMessages />;
      case "quotations":
        return <Quotation />;
      case "admins":
        return <Admin />;
      default:
        return <Quotation />;
    }
  };

  return (
    <AdminLayout>
      <AdminHeaderComp onCardClick={setActiveSection} />
      <div className="p-6">{renderSection()}</div>
    </AdminLayout>
  );
};

export default Dashboard;
