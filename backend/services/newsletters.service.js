const Newsletter = require("../models/newsletters.model");


const subscribeEmail = async (email) => {
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



module.exports = {
  subscribeEmail,
  getAllSubscribers,
  deleteSubscriber,
};
