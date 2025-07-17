import Navbar from "../../components/admin/Navbar/Navbar";

import Sidebar from "../../components/admin/sidebar/Sidebar";

const AdminLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <Sidebar />
      <div className="main">{children}</div>
    </div>
  );
};

export default AdminLayout;
