const ContactMessage = require("../models/contact.model");

const submitMessage = async (data) => {
    
  const newMessage = await ContactMessage.create(data);
  return newMessage;
};

const getAllMessages = async () => {
  return await ContactMessage.find().sort({ createdAt: -1 });
};

const deleteMessage = async (id) => {
  const deleted = await ContactMessage.findByIdAndDelete(id);
  if (!deleted) {
    throw new Error("Message not found");
  }
  return deleted;
};

module.exports = {
  submitMessage,
  getAllMessages,
  deleteMessage,
};
