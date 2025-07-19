import Navbar from "../../components/admin/Navbar/Navbar";

const AdminLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="main pt-[50px]">
        <div>{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
