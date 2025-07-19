const Router = require("express").Router();
const ContactController = require("../controllers/contact.controller");
const asyncWrapper = require("../middleware/asyncWrapper");

Router.post("/submit", asyncWrapper(ContactController.submitContactForm));

Router.get("/", asyncWrapper(ContactController.getContactMessages));

Router.delete("/:id", asyncWrapper(ContactController.deleteContactMessage));

Router.post("/reply", asyncWrapper(ContactController.sendReplyToMessage));

module.exports = Router;
