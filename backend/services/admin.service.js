const Admin = require("../models/admin.model");

const generateToken = require("../utils/generateToken");

const bcrypt = require("bcryptjs");

const { generateCustomPassword } = require("../utils/generatePassword");

const { sendEmail } = require("../utils/singleEmailSent");

const createAdmin = async (adminData) => {
  const { email, idNumber } = adminData;

  const existingEmail = await Admin.findOne({ email });
  if (existingEmail) {
    throw new Error("Email already in use.");
  }

  const existingId = await Admin.findOne({ idNumber });
  if (existingId) {
    throw new Error("ID Number already in use.");
  }

  const plainPassword = generateCustomPassword();

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(plainPassword, salt);

  const newAdmin = await Admin.create({
    ...adminData,
    password: hashedPassword,
  });

  const message = `
    <h2>Hello ${adminData.firstName} ${adminData.secondName},</h2>
    <p>Your admin account has been created successfully.</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Password:</strong> ${plainPassword}</p>
    <p>Please login and change this password immediately for security purposes.</p>
  `;

  await sendEmail(
    adminData.email,
    "Your Admin Account Password - Starlex Innovation",
    message
  );

  return newAdmin;
};

const loginAdmin = async ({ email, password }) => {
  const admin = await Admin.findOne({ email });

  if (!admin) throw new Error("Invalid credentials.");

  const isMatch = await bcrypt.compare(password, admin.password);

  if (!isMatch) throw new Error("Invalid credentials.");

  const token = generateToken(admin._id);
  return { admin, token };
};

const getAllAdmins = async () => {
  return await Admin.find().select("-password").sort({ createdAt: -1 });
};

const getAdminMe = async (adminId) => {
  const admin = await Admin.findById(adminId).select("-password");
  if (!admin) throw new Error("Admin not found.");
  return admin;
};

const deleteAdminById = async (adminId) => {
  const admin = await Admin.findById(adminId);
  if (!admin) {
    throw new Error("Admin not found.");
  }

  await Admin.findByIdAndDelete(adminId);
  return { message: "Admin deleted successfully." };
};

module.exports = {
  createAdmin,
  loginAdmin,
  getAllAdmins,
  getAdminMe,
  deleteAdminById,
};
