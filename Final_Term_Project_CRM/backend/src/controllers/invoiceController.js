const asyncHandler = require("../utils/asyncHandler");
const Customer = require("../models/Customer");
const Invoice = require("../models/Invoice");

const createInvoice = asyncHandler(async (req, res) => {
  const customer = await Customer.findOne({ _id: req.body.customer, createdBy: req.user._id });

  if (!customer) {
    res.status(404);
    throw new Error("Customer not found");
  }

  const quantity = Number(req.body.quantity);
  const unitPrice = Number(req.body.unitPrice);
  const totalAmount = quantity * unitPrice;
  const invoiceNumber = `INV-${Date.now()}`;

  const invoice = await Invoice.create({
    invoiceNumber,
    customer: customer._id,
    serviceTitle: req.body.serviceTitle,
    serviceDescription: req.body.serviceDescription,
    quantity,
    unitPrice,
    totalAmount,
    summary: req.body.summary,
    createdBy: req.user._id
  });

  await invoice.populate("customer");

  res.status(201).json({
    success: true,
    message: "Invoice generated successfully",
    invoice
  });
});

const getInvoices = asyncHandler(async (req, res) => {
  const invoices = await Invoice.find({ createdBy: req.user._id })
    .populate("customer")
    .sort({ createdAt: -1 });

  res.json({ success: true, count: invoices.length, invoices });
});

module.exports = { createInvoice, getInvoices };
