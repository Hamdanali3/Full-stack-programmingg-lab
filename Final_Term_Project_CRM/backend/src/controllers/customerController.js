const asyncHandler = require("../utils/asyncHandler");
const Customer = require("../models/Customer");

const getCustomers = asyncHandler(async (req, res) => {
  const { search = "", status = "" } = req.query;
  const query = { createdBy: req.user._id };

  if (search) {
    query.fullName = { $regex: search, $options: "i" };
  }

  if (status && ["Lead", "Active", "Inactive"].includes(status)) {
    query.status = status;
  }

  const customers = await Customer.find(query).sort({ createdAt: -1 });
  res.json({ success: true, count: customers.length, customers });
});

const getCustomer = asyncHandler(async (req, res) => {
  const customer = await Customer.findOne({ _id: req.params.id, createdBy: req.user._id });

  if (!customer) {
    res.status(404);
    throw new Error("Customer not found");
  }

  res.json({ success: true, customer });
});

const createCustomer = asyncHandler(async (req, res) => {
  const customer = await Customer.create({
    ...req.body,
    createdBy: req.user._id
  });

  res.status(201).json({ success: true, message: "Customer added successfully", customer });
});

const updateCustomer = asyncHandler(async (req, res) => {
  const customer = await Customer.findOneAndUpdate(
    { _id: req.params.id, createdBy: req.user._id },
    req.body,
    { new: true, runValidators: true }
  );

  if (!customer) {
    res.status(404);
    throw new Error("Customer not found");
  }

  res.json({ success: true, message: "Customer updated successfully", customer });
});

const deleteCustomer = asyncHandler(async (req, res) => {
  const customer = await Customer.findOneAndDelete({ _id: req.params.id, createdBy: req.user._id });

  if (!customer) {
    res.status(404);
    throw new Error("Customer not found");
  }

  res.json({ success: true, message: "Customer deleted successfully" });
});

module.exports = { getCustomers, getCustomer, createCustomer, updateCustomer, deleteCustomer };
