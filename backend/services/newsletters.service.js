const Newsletter = require("../models/newsletters.model");

const { sendNewsletterToAllUtil } = require("../utils/sentMail");

const subscribeEmail = async (email) => {
  if (!email || !email.includes("@")) {
    throw new Error("A valid email is required.");
  }
  const existing = await Newsletter.findOne({ email });
  if (existing) {
    throw new Error("This email is already subscribed.");
  }
  const newSubscriber = await Newsletter.create({ email });
  return newSubscriber;
};



const getAllSubscribers = async () => {
  return await Newsletter.find().sort({ createdAt: -1 });
};


const deleteSubscriber = async (email) => {
  const deleted = await Newsletter.findOneAndDelete({ email });
  if (!deleted) {
    throw new Error("Subscriber not found.");
  }
  return deleted;
};



const sendNewsletterToAll = async ({ subject, message }) => {
  return await sendNewsletterToAllUtil({
    subject,
    message,
  });
};

module.exports = {
  subscribeEmail,
  getAllSubscribers,
  deleteSubscriber,
  sendNewsletterToAll,
};
