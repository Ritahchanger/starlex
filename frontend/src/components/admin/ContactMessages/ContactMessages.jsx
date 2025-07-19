import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../../config/axiosInstance";

const ContactMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyModal, setReplyModal] = useState(false);
  const [replyData, setReplyData] = useState({
    email: "",
    subject: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [feedback, setFeedback] = useState(null);

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

  const handleReplyClick = (msg) => {
    setReplyData({
      email: msg.email,
      subject: "",
      message: "",
    });
    setReplyModal(true);
  };

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      console.log("Reply response:",replyData);
      const res = await axiosInstance.post(
        "/api/v1/contact/message/reply",
        replyData
      );
      console.log("Reply response:",replyData);
      if (!res.data.success) {
        alert("Failed to send reply: " + res.data.message);
        return;
      }
      setFeedback({ type: "success", message: res.data.message });
      setReplyModal(false);
    } catch (error) {
      setFeedback({
        type: "error",
        message: error?.response?.data?.message || "Failed to send reply.",
      });
    } finally {
      setSending(false);
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
                  <td className="p-3 border border-neutral-300">
                    <button
                      onClick={() => handleReplyClick(msg)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition duration-200"
                    >
                      Respond
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

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

      {replyModal && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
          <form
            onSubmit={handleReplySubmit}
            className="bg-white p-6 rounded shadow max-w-[750px] w-full space-y-4"
          >
            <h3 className="text-xl font-bold mb-2">Reply to Message</h3>

            <div>
              <label className="block font-medium">To</label>
              <input
                type="email"
                value={replyData.email}
                disabled
                className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100"
              />
            </div>

            <div>
              <label className="block font-medium">Subject</label>
              <input
                type="text"
                value={replyData.subject}
                onChange={(e) =>
                  setReplyData({ ...replyData, subject: e.target.value })
                }
                required
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block font-medium">Message</label>
              <textarea
                value={replyData.message}
                onChange={(e) =>
                  setReplyData({ ...replyData, message: e.target.value })
                }
                required
                rows={5}
                className="w-full border border-gray-300 rounded px-3 py-2"
              ></textarea>
            </div>

            <div className="flex justify-end space-x-3 mt-4">
              <button
                type="button"
                className="px-4 py-2 bg-gray-400 text-white rounded"
                onClick={() => setReplyModal(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                disabled={sending}
              >
                {sending ? "Sending..." : "Send Reply"}
              </button>
            </div>
          </form>
        </div>
      )}
      {feedback && (
        <div
          className={`mt-4 text-center ${
            feedback.type === "success" ? "text-green-600" : "text-red-600"
          }`}
        >
          {feedback.message}
        </div>
      )}
    </div>
  );
};

export default ContactMessages;
