import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../../config/axiosInstance";

import NewsletterEditor from "../../RichTextBox/RichTextBox";

const NewsLetters = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const response = await axiosInstance.get(
          "/api/v1/newseller/subscribers"
        );
        setSubscribers(response.data.data || []);
      } catch (err) {
        console.error("Error fetching subscribers:", err);
        setError("Failed to load subscribers.");
      } finally {
        setLoading(false);
      }
    };

    fetchSubscribers();
  }, []);

  const handleSendNewsletter = async (e) => {
    e.preventDefault();
    setSending(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await axiosInstance.post("/api/v1/newseller/send", {
        subject,
        message,
      });

      if (res.status === 200) {
        setSuccess("Newsletter sent successfully!");
        setSubject("");
        setMessage("");
      } else {
        setError("Something went wrong.");
      }
    } catch (err) {
      console.error("Error sending newsletter:", err);
      setError("Failed to send newsletter.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="p-6">
      <div className="">
        {/* Subscriber List */}
        <div className="md:w-1/2">
          <h2 className="text-2xl font-bold mb-4">Newsletter Subscribers</h2>
          {loading ? (
            <p>Loading subscribers...</p>
          ) : error ? (
            <p className="text-red-600">{error}</p>
          ) : subscribers.length === 0 ? (
            <p>No subscribers found.</p>
          ) : (
            <ul className="list-disc pl-6 space-y-2">
              {subscribers.map((subscriber) => (
                <li key={subscriber._id} className="text-gray-800">
                  {subscriber.email}
                  <span className="block text-sm text-gray-500">
                    Joined on: {new Date(subscriber.createdAt).toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Compose Form */}
        <div className="mt-[2.5rem]">
          <NewsletterEditor />
        </div>
      </div>
    </div>
  );
};

export default NewsLetters;
