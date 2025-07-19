import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
const Admin = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    firstName: "",
    secondName: "",
    email: "",
    idNumber: "",
  });

  const fetchAdmins = async () => {
    try {
      const res = await axiosInstance.get("/api/v1/admin/");
      setAdmins(res.data.data || []);
    } catch (err) {
      console.error("Error fetching admins:", err);
      setError("Failed to fetch admin data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this admin?")) return;

    try {
      await axiosInstance.delete(`/api/v1/admin/${id}`);
      setAdmins(admins.filter((admin) => admin.id !== id));
    } catch (err) {
      console.error("Error deleting admin:", err);
      alert("Failed to delete admin.");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddAdmin = async (e) => {
    e.preventDefault();
    try {
      console.log("Adding admin with form data:", form);
      const res = await axiosInstance.post("/api/v1/auth/signup", form);
      const newAdmin = res.data.admin;
      setAdmins([...admins, newAdmin]);
      setForm({ firstName: "", secondName: "", email: "", idNumber: "" });
      alert("Admin added and password sent via email.");
    } catch (err) {
      console.error("Error adding admin:", err);
      alert(err?.response?.data?.message || "Failed to add admin.");
    }
  };

  return (
    <div className="mx-auto p-6 bg-white shadow-least mt-[1rem]">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Admin Panel</h2>

      {/* Admins Table */}
      {loading ? (
        <p>Loading admins...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : admins.length === 0 ? (
        <p>No admin accounts found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-neutral-300 text-sm text-gray-700">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left border border-neutral-300">
                  Name
                </th>
                <th className="p-3 text-left border border-neutral-300">
                  Email
                </th>
                <th className="p-3 text-left border border-neutral-300">
                  ID Number
                </th>
                <th className="p-3 text-left border border-neutral-300">
                  Joined
                </th>
                <th className="p-3 text-left border border-neutral-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin) => (
                <tr key={admin.id} className="border border-neutral-300-b">
                  <td className="p-3 border border-neutral-300">
                    {admin.firstName} {admin.secondName}
                  </td>
                  <td className="p-3 border border-neutral-300">
                    {admin.email}
                  </td>
                  <td className="p-3 border border-neutral-300">
                    {admin.idNumber}
                  </td>
                  <td className="p-3 border border-neutral-300">
                    {new Date(admin.createdAt).toLocaleString()}
                  </td>
                  <td className="p-3 border border-neutral-300">
                    <button
                      onClick={() => handleDelete(admin.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Admin Form */}
      <div className="mt-10">
        <h3 className="text-lg font-semibold mb-3 text-gray-700">Add Admin</h3>
        <form
          onSubmit={handleAddAdmin}
          className="grid gap-4 grid-cols-1 md:grid-cols-2"
        >
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={form.firstName}
            onChange={handleChange}
            required
            className="border border-neutral-300 px-4 py-2 "
          />
          <input
            type="text"
            name="secondName"
            placeholder="Second Name"
            value={form.secondName}
            onChange={handleChange}
            required
            className="border border-neutral-300 px-4 py-2 "
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="border border-neutral-300 px-4 py-2 "
          />
          <input
            type="text"
            name="idNumber"
            placeholder="ID Number"
            value={form.idNumber}
            onChange={handleChange}
            required
            className="border border-neutral-300 px-4 py-2 "
          />
          <div className="col-span-full">
            <button
              type="submit"
              className="group bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 text-white px-8 py-[0.7rem] rounded-full font-semibold shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              Add Admin
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Admin;
