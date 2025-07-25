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
const emailQuotationPdf = async (req, res) => {
  try {
    const { email, fullName, fileName, base64PDF } = req.body;

    const result = await QuotationService.sendQuotationPdf(
      email,
      fullName,
      fileName,
      base64PDF
    );

    res.status(200).json({
      message: result.message,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  submitQuotationForm,
  getQuotations,
  deleteQuotation,
  emailQuotationPdf,
};
