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
      newErrors.phone = "Phone must start with 254 and be 12 digits.";
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
    dispatch(closeQuotationSlice());
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/70 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => dispatch(closeQuotationSlice())}
          />

          {/* Modal */}
          <motion.div
            className="fixed top-0 right-0 h-full w-full sm:max-w-[600px] bg-white z-50 p-6 overflow-y-auto shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-blue-700">
                Request a Quotation
              </h2>
              <button onClick={() => dispatch(closeQuotationSlice())}>
                <X className="w-6 h-6 text-red-500 hover:text-red-700" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 text-sm">
              {/* Input fields */}
              {[
                { name: "firstName", placeholder: "First Name", type: "text" },
                { name: "lastName", placeholder: "Last Name", type: "text" },
                { name: "email", placeholder: "Email Address", type: "email" },
                { name: "idNumber", placeholder: "ID Number", type: "text" },
                {
                  name: "phone",
                  placeholder: "Phone Number (e.g. 254712345678)",
                  type: "text",
                },
              ].map(({ name, placeholder, type }) => (
                <div key={name}>
                  <input
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    value={formData[name]}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border ${
                      errors[name] ? "border-red-500" : "border-gray-300"
                    } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  {errors[name] && (
                    <p className="text-red-500 text-xs mt-1">{errors[name]}</p>
                  )}
                </div>
              ))}

              {/* Service dropdown */}
              <div>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border ${
                    errors.service ? "border-red-500" : "border-gray-300"
                  } rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                >
                  <option value="">-- Select a Service --</option>
                  {services.map((service, index) => (
                    <option key={index} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
                {errors.service && (
                  <p className="text-red-500 text-xs mt-1">{errors.service}</p>
                )}
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white py-3 rounded-full font-medium shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
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
