const express = require("express");
const {
  createCustomer,
  deleteCustomer,
  getCustomer,
  getCustomers,
  updateCustomer
} = require("../controllers/customerController");
const { protect } = require("../middleware/authMiddleware");
const { customerValidator } = require("../validators/customerValidators");
const validateRequest = require("../validators/validateRequest");

const router = express.Router();

router.use(protect);
router.route("/").get(getCustomers).post(customerValidator, validateRequest, createCustomer);
router
  .route("/:id")
  .get(getCustomer)
  .put(customerValidator, validateRequest, updateCustomer)
  .delete(deleteCustomer);

module.exports = router;
