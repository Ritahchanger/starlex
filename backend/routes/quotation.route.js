const Router = require("express").Router();

const QuotationController = require("../controllers/quotation.controller");

const asyncWrapper = require("../middleware/asyncWrapper");

const verifyToken = require("../middleware/authToken").verifyToken;

Router.post("/", asyncWrapper(QuotationController.submitQuotationForm));

Router.get("/", asyncWrapper(QuotationController.getQuotations));

Router.delete(
  "/:id",
  verifyToken,
  asyncWrapper(QuotationController.deleteQuotation)
);

Router.post("/send-pdf", asyncWrapper(QuotationController.emailQuotationPdf));

module.exports = Router;
