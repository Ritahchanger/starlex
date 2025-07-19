import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../../config/axiosInstance";

const Quotation = () => {
  const [quotations, setQuotations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchQuotationsRequest = async () => {
    try {
      const response = await axiosInstance.get("/api/v1/quotation");
      setQuotations(response.data.data || []);
    } catch (err) {
      console.error("Error fetching quotations:", err);
      setError("Failed to load quotation requests.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotationsRequest();
  }, []);

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Quotation Requests</h2>

      {loading ? (
        <div className="text-blue-600 animate-pulse">Loading quotation requests...</div>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : quotations.length === 0 ? (
        <p>No quotation requests found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-[900px] w-full border border-gray-300 text-left text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 border border-neutral-300">#</th>
                <th className="p-3 border border-neutral-300">Full Name</th>
                <th className="p-3 border border-neutral-300">Email</th>
                <th className="p-3 border border-neutral-300">Phone</th>
                <th className="p-3 border border-neutral-300">Service</th>
                <th className="p-3 border border-neutral-300">Date</th>
                <th className="p-3 border border-neutral-300">Respond</th>
              </tr>
            </thead>
            <tbody>
              {quotations.map((q, index) => (
                <tr key={q._id} className="hover:bg-gray-50">
                  <td className="p-3 border border-neutral-300">{index + 1}</td>
                  <td className="p-3 border border-neutral-300">
                    {q.firstName} {q.lastName}
                  </td>
                  <td className="p-3 border border-neutral-300">{q.email}</td>
                  <td className="p-3 border border-neutral-300">{q.phone}</td>
                  <td className="p-3 border border-neutral-300">{q.service}</td>
                  <td className="p-3 border border-neutral-300">
                    {new Date(q.createdAt).toLocaleString()}
                  </td>
                  <td className="p-3 border border-neutral-300">
                    <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition duration-200">
                      Respond
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Quotation;
