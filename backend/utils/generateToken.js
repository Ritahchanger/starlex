const jwt = require("jsonwebtoken");
const generateToken = (adminId) => {
  return jwt.sign({ id: adminId }, process.env.JWT_SECRET, {
    expiresIn: "30m",
  });
};

module.exports = generateToken;
