import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../../config/axiosInstance";

const ContactMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);

  const fetchContactMessages = async () => {
    try {
      const response = await axiosInstance.get("/api/v1/contact/message");
      setMessages(response.data.data.slice(0, 20));
    } catch (err) {
      console.error("Error fetching messages:", err);
      setError("Failed to load contact messages.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContactMessages();
  }, []);

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Contact Messages</h2>

      {loading ? (
        <p>Loading messages...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : messages.length === 0 ? (
        <p>No contact messages found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-neutral-300 text-left text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 border border-neutral-300">#</th>
                <th className="p-3 border border-neutral-300">Name</th>
                <th className="p-3 border border-neutral-300">Email</th>
                <th className="p-3 border border-neutral-300">Phone</th>
                <th className="p-3 border border-neutral-300">Location</th>
                <th className="p-3 border border-neutral-300">Message</th>
                <th className="p-3 border border-neutral-300">Date</th>
                <th className="p-3 border border-neutral-300">Respond</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((msg, index) => (
                <tr key={msg._id} className="hover:bg-gray-50">
                  <td className="p-3 border border-neutral-300">{index + 1}</td>
                  <td className="p-3 border border-neutral-300">
                    {msg.firstName} {msg.lastName}
                  </td>
                  <td className="p-3 border border-neutral-300">{msg.email}</td>
                  <td className="p-3 border border-neutral-300">{msg.phone}</td>
                  <td className="p-3 border border-neutral-300">
                    {msg.location}
                  </td>
                  <td className="p-3 border border-neutral-300">
                    {msg.message.length > 70 ? (
                      <button
                        onClick={() => setSelectedMessage(msg)}
                        className="text-blue-600 underline"
                      >
                        View Message
                      </button>
                    ) : (
                      msg.message
                    )}
                  </td>
                  <td className="p-3 border border-neutral-300">
                    {new Date(msg.createdAt).toLocaleString()}
                  </td>
                  <td className="p-3 border border-neutral-300 ">
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

      {/* Modal for viewing long message */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow max-w-lg w-full">
            <h3 className="text-xl font-bold mb-2">Full Message</h3>
            <p className="mb-4 text-gray-700 whitespace-pre-line">
              {selectedMessage.message}
            </p>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={() => setSelectedMessage(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactMessages;
