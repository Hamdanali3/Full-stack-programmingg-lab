const { body } = require("express-validator");

const invoiceValidator = [
  body("customer").isMongoId().withMessage("Valid customer is required"),
  body("serviceTitle").trim().notEmpty().withMessage("Service title is required"),
  body("serviceDescription").optional({ checkFalsy: true }).trim(),
  body("quantity").isInt({ min: 1 }).withMessage("Quantity must be at least 1"),
  body("unitPrice").isFloat({ min: 0 }).withMessage("Unit price must be zero or greater"),
  body("summary").optional({ checkFalsy: true }).trim()
];

module.exports = { invoiceValidator };
