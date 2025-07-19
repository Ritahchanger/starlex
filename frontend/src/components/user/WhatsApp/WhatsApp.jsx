import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";

const WhatsApp = () => {
  const [showModal, setShowModal] = useState(false);
  const whatsappNumber = "254713457529";

  const openWhatsApp = () => {
    window.open(`https://wa.me/${whatsappNumber}`, "_blank");
    setShowModal(false);
  };

  return (
    <div>
      <button
        aria-label="Open WhatsApp Chat"
        onClick={() => setShowModal(true)}
        className="bg-green-600 h-14 w-14 flex items-center justify-center fixed bottom-4 right-6 rounded-full text-white cursor-pointer shadow-xl hover:scale-105 transition duration-300 z-40"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {showModal && (
        <div className="fixed bottom-[6.5rem] right-6 z-50 w-[320px] max-w-full">
          <div className="bg-white rounded shadow-2xl p-2 text-start relative animate-fadeIn">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-red-500"
              aria-label="Close Modal"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Redirecting to WhatsApp
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              You'll be redirected to WhatsApp to chat with{" "}
              <span className="text-green-700 font-medium">
                Starlex Networks
              </span>
              .
            </p>

            <div className="flex justify-start gap-3 mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-[0.2rem] rounded border border-gray-300 text-sm text-gray-700 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={openWhatsApp}
                className="px-4 py-[0.2rem] rounded bg-green-600 text-white text-sm hover:bg-green-700 transition"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WhatsApp;
