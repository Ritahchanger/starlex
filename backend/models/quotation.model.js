const mongoose = require("mongoose");

const quotationSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },
    idNumber: {
      type: String,
      required: [true, "ID number is required"],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      match: [/^254\d{9}$/, "Phone must start with 254 and be 12 digits"],
    },
    service: {
      type: String,
      required: [true, "Service is required"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Quotation", quotationSchema);
