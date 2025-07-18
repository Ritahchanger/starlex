const Quotation = require("../models/quotation.model");


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



module.exports = {
  submitQuotation,
  getAllQuotations,
  deleteQuotation,
};
