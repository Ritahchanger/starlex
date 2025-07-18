const QuotationService = require("../services/quotation.service");

const submitQuotationForm = async (req, res) => {
  const quotation = await QuotationService.submitQuotation(req.body);

  res.status(201).json({
    success: true,
    message: "Quotation submitted successfully.",
    data: quotation,
  });
};

const getQuotations = async (req, res) => {
  const quotations = await QuotationService.getAllQuotations();
  res.status(200).json({
    success: true,
    count: quotations.length,
    data: quotations,
  });
};

const deleteQuotation = async (req, res) => {
  const { id } = req.params;
  const deleted = await QuotationService.deleteQuotation(id);

  res.status(200).json({
    success: true,
    message: `Deleted quotation from ${deleted.firstName} ${deleted.lastName}`,
  });
};

module.exports = {
  submitQuotationForm,
  getQuotations,
  deleteQuotation,
};
