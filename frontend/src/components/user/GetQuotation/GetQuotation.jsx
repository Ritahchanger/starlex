import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

import { useDispatch, useSelector } from "react-redux";

import { closeQuotationSlice } from "../../../store/Features/QuotationSlice";

const services = [
  "Networking Solutions",
  "CCTV Systems",
  "Web Design",
  "Software Development",
];

const QuotationModal = () => {
  const dispatch = useDispatch();

  const { isOpen } = useSelector((state) => state.quotation);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    idNumber: "",
    phone: "",
    service: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required.";
    if (!formData.lastName.trim())
      newErrors.lastName = "Last name is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email.trim())
    ) {
      newErrors.email = "Invalid email address.";
    }
    if (!formData.idNumber.trim())
      newErrors.idNumber = "ID number is required.";
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^254\d{9}$/.test(formData.phone.trim())) {
      newErrors.phone = "Phone must start with 254 and be 12 digits total.";
    }
    if (!formData.service) newErrors.service = "Please select a service.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    console.log("Quotation Request Submitted:", formData);
    alert("Quotation request submitted!");
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      idNumber: "",
      phone: "",
      service: "",
    });
    setErrors({});
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/90 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              dispatch(closeQuotationSlice());
            }}
          />

          <motion.div
            className="fixed top-0 right-0 h-full w-full sm:max-w-[700px] bg-white z-50 p-6 overflow-y-auto shadow-xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex justify-between items-center mb-3 border-b border-blue-400">
              <h2 className="text-xl font-bold text-blue-800 ">
                Request a Quotation
              </h2>
              <button
                onClick={() => {
                  dispatch(closeQuotationSlice());
                }}
                className="text-red-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-sm">
              <div>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border ${
                    errors.firstName ? "border-red-500" : "border-gray-300"
                  }  focus:outline-none focus:ring-2 focus:ring-orange-400`}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-xs">{errors.firstName}</p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border ${
                    errors.lastName ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-orange-400`}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-xs">{errors.lastName}</p>
                )}
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }  focus:outline-none focus:ring-2 focus:ring-orange-400`}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs">{errors.email}</p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  name="idNumber"
                  placeholder="ID Number"
                  value={formData.idNumber}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border ${
                    errors.idNumber ? "border-red-500" : "border-gray-300"
                  }  focus:outline-none focus:ring-2 focus:ring-orange-400`}
                />
                {errors.idNumber && (
                  <p className="text-red-500 text-xs">{errors.idNumber}</p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number (e.g. 254712345678)"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-orange-400`}
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs">{errors.phone}</p>
                )}
              </div>

              <div>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border border-neutral-300 ${
                    errors.service ? "border-red-500" : "border-neutral-300"
                  }bg-white focus:outline-none focus:ring-2 focus:ring-orange-400`}
                >
                  <option value="">-- Select a Service --</option>
                  {services.map((service, index) => (
                    <option key={index} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
                {errors.service && (
                  <p className="text-red-500 text-xs">{errors.service}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold  shadow transition"
              >
                Submit Request
              </button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default QuotationModal;
