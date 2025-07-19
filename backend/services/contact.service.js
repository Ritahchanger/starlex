const ContactMessage = require("../models/contact.model");

const { sendEmail } = require("../utils/singleEmailSent");

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

const replyToMessage = async ({ subject, email, message }) => {
  
  await sendEmail(email, subject, message);

  return { success: true, message: "Reply sent successfully." };
};

module.exports = {
  submitMessage,
  getAllMessages,
  deleteMessage,
  replyToMessage,
};
