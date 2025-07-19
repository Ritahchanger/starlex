const Quotation = require("../models/quotation.model");

const {
  sendEmailWithAttatchments,
} = require("../utils/sendEmailWithAttatchments");

const submitQuotation = async (data) => {
  const quotation = await Quotation.create(data);
  return quotation;
};

const getAllQuotations = async () => {
  return await Quotation.find().sort({ createdAt: -1 });
};

const deleteQuotation = async (id) => {
  const deleted = await Quotation.findByIdAndDelete(id);
  if (!deleted) throw new Error("Quotation not found.");
  return deleted;
};

const sendQuotationPdf = async (email, fullName, fileName, base64PDF) => {
  if (!email || !fileName || !base64PDF) {
    throw new Error("Missing required data for PDF email.");
  }

  const htmlMessage = `
    <h2>Hello ${fullName},</h2>
    <p>Please find your requested quotation attached in this email.</p>
  `;

  await sendEmailWithAttatchments(
    email,
    "Your Requested Quotation - Starlex Innovation",
    htmlMessage,
    [
      {
        filename: fileName,
        content: Buffer.from(base64PDF, "base64"),
        contentType: "application/pdf",
      },
    ]
  );

  return { message: "Quotation sent successfully." };
};

module.exports = {
  submitQuotation,
  getAllQuotations,
  deleteQuotation,
  sendQuotationPdf,
};
