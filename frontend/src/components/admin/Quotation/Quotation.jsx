import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../../config/axiosInstance";
import { FileUp } from "lucide-react";
const Quotation = () => {
  const [quotations, setQuotations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [replyModal, setReplyModal] = useState(false);
  const [selectedQuotation, setSelectedQuotation] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [sending, setSending] = useState(false);

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

  const openReplyModal = (quotation) => {
    setSelectedQuotation(quotation);
    setReplyModal(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setPdfFile(file);
    } else {
      alert("Please upload a valid PDF file.");
      setPdfFile(null);
    }
  };

  const handleQuotationReply = async (e) => {
    e.preventDefault();
    if (!pdfFile || !selectedQuotation) return;

    setSending(true);

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64PDF = reader.result.split(",")[1];

      try {
        await axiosInstance.post("/api/v1/quotation/send-pdf", {
          email: selectedQuotation.email,
          fullName: `${selectedQuotation.firstName} ${selectedQuotation.lastName}`,
          fileName: pdfFile.name,
          base64PDF,
        });

        alert("Quotation sent successfully.");
        setReplyModal(false);
        setPdfFile(null);
      } catch (error) {
        console.error("Error sending quotation:", error);
        alert("Failed to send quotation.");
      } finally {
        setSending(false);
      }
    };

    reader.readAsDataURL(pdfFile);
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Quotation Requests</h2>

      {loading ? (
        <div className="text-blue-600 animate-pulse">
          Loading quotation requests...
        </div>
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
                    <button
                      onClick={() => openReplyModal(q)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition duration-200"
                    >
                      Send Quotation
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal for Sending Quotation PDF */}
      {replyModal && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
          <form
            onSubmit={handleQuotationReply}
            className="bg-white p-6 rounded shadow max-w-[500px] w-full space-y-4"
          >
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Send Quotation PDF to {selectedQuotation?.email}
            </h3>

            <label className="text-sm font-medium text-gray-600">
              Upload Quotation PDF
            </label>
            <div className="flex items-center space-x-3">
              <FileUp className="text-blue-600" size={20} />
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                required
                className="w-full border border-neutral-300 px-4 py-2"
              />
            </div>

            <div className="flex justify-end space-x-3 mt-4">
              <button
                type="button"
                className="px-4 py-2 bg-gray-400 text-white rounded"
                onClick={() => {
                  setReplyModal(false);
                  setPdfFile(null);
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                disabled={sending}
              >
                {sending ? "Sending..." : "Send PDF"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Quotation;
