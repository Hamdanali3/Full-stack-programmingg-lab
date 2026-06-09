const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      minlength: 2,
      maxlength: 120
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true
    },
    company: {
      type: String,
      required: [true, "Company is required"],
      trim: true,
      maxlength: 120
    },
    address: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
      maxlength: 240
    },
    status: {
      type: String,
      enum: ["Lead", "Active", "Inactive"],
      default: "Lead"
    },
    notes: {
      type: String,
      trim: true,
      maxlength: 1000,
      default: ""
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

customerSchema.index({ fullName: "text", company: "text" });

module.exports = mongoose.model("Customer", customerSchema);
