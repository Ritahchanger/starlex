const ContactService = require("../services/contact.service");

const submitContactForm = async (req, res) => {
  const message = await ContactService.submitMessage(req.body);
  res.status(201).json({
    success: true,
    message: "Contact message submitted successfully.",
    data: message,
  });
};

const getContactMessages = async (req, res) => {
  const messages = await ContactService.getAllMessages();
  res.status(200).json({
    success: true,
    count: messages.length,
    data: messages,
  });
};

const deleteContactMessage = async (req, res) => {
  const { id } = req.params;
  const deleted = await ContactService.deleteMessage(id);
  res.status(200).json({
    success: true,
    message: `Deleted message from ${deleted.firstName} ${deleted.lastName}`,
  });
};

module.exports = {
  submitContactForm,
  getContactMessages,
  deleteContactMessage,
};
