const AdminService = require("../services/admin.service");

const getAllAdmins = async (req, res) => {
  const admins = await AdminService.getAllAdmins();

  res.status(200).json({
    success: true,
    count: admins.length,
    data: admins.map((admin) => ({
      id: admin._id,
      firstName: admin.firstName,
      secondName: admin.secondName,
      email: admin.email,
      idNumber: admin.idNumber,
      createdAt: admin.createdAt,
    })),
  });
};

const getMe = async (req, res) => {
  const admin = await AdminService.getAdminMe(req.user.id);
  res.status(200).json({ success: true, admin });
};

const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await AdminService.deleteAdminById(id);

    return res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    console.error("Delete Admin Error:", error.message);
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAllAdmins,
  getMe,
  deleteAdmin,
};
