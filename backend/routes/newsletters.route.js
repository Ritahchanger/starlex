const Router = require("express").Router();

const NewsletterController = require("../controllers/newsletters.controller");

const asyncWrapper = require("../middleware/asyncWrapper");

Router.post("/subscribe", asyncWrapper(NewsletterController.subscribe));

Router.get("/subscribers", asyncWrapper(NewsletterController.getSubscribers));

Router.delete(
  "/unsubscribe/:email",
  asyncWrapper(NewsletterController.removeSubscriber)
);

Router.post("/send", asyncWrapper(NewsletterController.sendNewsletter));

module.exports = Router;
