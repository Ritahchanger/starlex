const Admin = require("../models/admin.model");

const generateToken = require("../utils/generateToken");

const bcrypt = require("bcryptjs");

const createAdmin = async (adminData) => {
  const { email, idNumber, password } = adminData;

  const existingEmail = await Admin.findOne({ email });
  if (existingEmail) {
    throw new Error("Email already in use.");
  }

  const existingId = await Admin.findOne({ idNumber });
  if (existingId) {
    throw new Error("ID Number already in use.");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newAdmin = await Admin.create({
    ...adminData,
    password: hashedPassword,
  });

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

module.exports = { createAdmin, loginAdmin, getAllAdmins, getAdminMe };
