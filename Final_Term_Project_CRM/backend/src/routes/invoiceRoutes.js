const express = require("express");
const { createInvoice, getInvoices } = require("../controllers/invoiceController");
const { protect } = require("../middleware/authMiddleware");
const { invoiceValidator } = require("../validators/invoiceValidators");
const validateRequest = require("../validators/validateRequest");

const router = express.Router();

router.use(protect);
router.route("/").get(getInvoices).post(invoiceValidator, validateRequest, createInvoice);

module.exports = router;
