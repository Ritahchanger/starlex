const Router = require("express").Router();


const QuotationController = require("../controllers/quotation.controller");


const asyncWrapper = require("../middleware/asyncWrapper");


Router.post("/", asyncWrapper(QuotationController.submitQuotationForm));



Router.get("/", asyncWrapper(QuotationController.getQuotations));



Router.delete("/:id", asyncWrapper(QuotationController.deleteQuotation));


module.exports = Router;