const Newsletter = require("../models/newsletters.model");

const { transporter } = require("../utils/transporter");

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

const sendNewsletterToAll = async ({ subject, message }) => {
  const subscribers = await Newsletter.find({}, "email");
  if (!subscribers.length) {
    throw new Error("No subscribers found.");
  }

  const sendEmail = async (email) => {
    const mailOptions = {
      from: `"Bemi Editors" <${process.env.COMPANY_EMAIL}>`,
      to: email,
      subject,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
          ${message}
          <hr />
          <small style="color: #999;">You are receiving this because you subscribed to Bemi Editors Newsletter.</small>
        </div>
      `,
    };

    return transporter.sendMail(mailOptions);
  };

  const results = [];
  for (const subscriber of subscribers) {
    try {
      await sendEmail(subscriber.email);
      results.push({ email: subscriber.email, status: "sent" });
    } catch (error) {
      results.push({
        email: subscriber.email,
        status: "failed",
        error: error.message,
      });
    }
  }

  return {
    total: subscribers.length,
    success: results.filter((r) => r.status === "sent").length,
    failed: results.filter((r) => r.status === "failed"),
  };
};

module.exports = {
  subscribeEmail,
  getAllSubscribers,
  deleteSubscriber,
  sendNewsletterToAll,
};
