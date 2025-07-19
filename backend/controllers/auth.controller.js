const AdminService = require("../services/admin.service");

const { sendEmail } = require("../utils/singleEmailSent");

const signup = async (req, res) => {
  const admin = await AdminService.createAdmin(req.body);

  const token = require("jsonwebtoken").sign(
    { id: admin._id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(201).json({
    success: true,
    message: "Admin registered successfully",
    admin: {
      id: admin._id,
      firstName: admin.firstName,
      secondName: admin.secondName,
      email: admin.email,
      idNumber: admin.idNumber,
    },
  });
};

const login = async (req, res) => {
  const { admin, token } = await AdminService.loginAdmin(req.body);

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    success: true,
    message: "Login successful",
    admin: {
      id: admin._id,
      firstName: admin.firstName,
      secondName: admin.secondName,
      email: admin.email,
      idNumber: admin.idNumber,
    },
  });
};

const logout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "Logged out successfully" });
};

module.exports = {
  signup,
  login,
  logout,
};
