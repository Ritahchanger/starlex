import React, { useState } from "react";
import { X } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { closeContactModal } from "../../../store/Features/ContactSlice";

import Preloader from "../Preloader/Preloader";

import "./contactModal.css";

import { baseUrl } from "../../../config/baseUrl";
import axios from "axios";

const ContactModal = () => {
  const dispatch = useDispatch();

  const { isOpen } = useSelector((state) => state.contact);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    location: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required.";
    if (!formData.lastName.trim())
      newErrors.lastName = "Last name is required.";

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^254\d{9}$/.test(formData.phone.trim())) {
      newErrors.phone = "Phone must start with 254 and be 12 digits total.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email.trim())
    ) {
      newErrors.email = "Invalid email address.";
    }

    if (!formData.location.trim()) newErrors.location = "Location is required.";
    if (!formData.message.trim()) newErrors.message = "Message is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);

      const response = await axios.post(
        `${baseUrl}/api/v1/contact/message/submit`,
        formData
      );

      if (response.data.success) {
        alert("Message submitted successfully!");
        dispatch(closeContactModal());
        setFormData({
          firstName: "",
          lastName: "",
          phone: "",
          email: "",
          location: "",
          message: "",
        });
        setErrors({});
      } else {
        alert("Something went wrong. Try again.");
      }
    } catch (err) {
      if (err.response?.data?.message) {
        alert(err.response.data.message);
      } else {
        alert("Failed to submit. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 contact-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded shadow-xl max-w-[700px] w-full p-6 relative"
            initial={{ scale: 0.8, y: 50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.8, y: 50, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button
              className="absolute top-3 right-3 text-red-500 hover:text-red-600"
              onClick={() => dispatch(closeContactModal())}
              disabled={loading}
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-2xl font-bold text-orange-500 mb-4 text-center">
              Get in Touch
            </h2>

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {[
                { label: "First Name", name: "firstName" },
                { label: "Last Name", name: "lastName" },
                { label: "Phone Number", name: "phone" },
                { label: "Email Address", name: "email" },
                { label: "Location", name: "location", full: true },
              ].map(({ label, name, full }) => (
                <div key={name} className={full ? "md:col-span-2" : ""}>
                  <input
                    type={name === "email" ? "email" : "text"}
                    name={name}
                    placeholder={label}
                    value={formData[name]}
                    onChange={handleChange}
                    disabled={loading}
                    className={`border border-neutral-300 px-4 py-2 w-full focus:outline-none focus:ring-2 ${
                      errors[name]
                        ? "border-red-500 focus:ring-red-400"
                        : "focus:ring-orange-400"
                    } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                  />
                  {errors[name] && (
                    <p className="text-red-500 text-xs mt-1">{errors[name]}</p>
                  )}
                </div>
              ))}

              <div className="md:col-span-2">
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  disabled={loading}
                  className={`border border-neutral-300 px-4 py-2 w-full focus:outline-none resize-none focus:ring-2 ${
                    errors.message
                      ? "border-red-500 focus:ring-red-400"
                      : "focus:ring-orange-400"
                  } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                ></textarea>
                {errors.message && (
                  <p className="text-red-500 text-xs mt-1">{errors.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white py-3 rounded-full font-medium shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] mx-auto"
              >
                {loading ? (
                  <>
                    <Preloader />
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;
