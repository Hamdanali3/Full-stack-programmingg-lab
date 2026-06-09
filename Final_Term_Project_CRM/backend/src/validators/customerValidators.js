const { body } = require("express-validator");

const customerValidator = [
  body("fullName").trim().isLength({ min: 2 }).withMessage("Full name is required"),
  body("email").isEmail().withMessage("Enter a valid email").normalizeEmail(),
  body("phone").trim().isLength({ min: 7 }).withMessage("Phone number must be at least 7 characters"),
  body("company").trim().notEmpty().withMessage("Company is required"),
  body("address").trim().notEmpty().withMessage("Address is required"),
  body("status").isIn(["Lead", "Active", "Inactive"]).withMessage("Status must be Lead, Active, or Inactive"),
  body("notes").optional({ checkFalsy: true }).trim().isLength({ max: 1000 }).withMessage("Notes are too long")
];

module.exports = { customerValidator };
