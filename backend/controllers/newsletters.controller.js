const NewsletterService = require("../services/newsletters.service");

const subscribe = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    res.status(400);
    throw new Error("Email is required.");
  }
  const subscriber = await NewsletterService.subscribeEmail(email);
  res.status(201).json({
    success: true,
    message: "Subscribed successfully.",
    data: subscriber,
  });
};

const getSubscribers = async (req, res) => {
  const subscribers = await NewsletterService.getAllSubscribers();
  res.status(200).json({
    success: true,
    count: subscribers.length,
    data: subscribers,
  });
};


const removeSubscriber = async (req, res) => {
  const { email } = req.params;
  const deleted = await NewsletterService.deleteSubscriber(email);
  res.status(200).json({
    success: true,
    message: `Unsubscribed: ${deleted.email}`,
  });
};



const sendNewsletter = async (req, res) => {
  const { subject, message } = req.body;
  if (!subject || !message) {
    return res.status(400).json({ error: "Subject and message are required." });
  }
  try {
    const result = await NewsletterService.sendNewsletterToAll({
      subject,
      message,
    });
    res.status(200).json({
      message: `Newsletter sent to ${result.success} subscribers.`,
      failed: result.failed,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



module.exports = {
  subscribe,
  getSubscribers,
  removeSubscriber,
  sendNewsletter,
};
