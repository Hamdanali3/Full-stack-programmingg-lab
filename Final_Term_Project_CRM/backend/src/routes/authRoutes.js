const express = require("express");
const { login, me, register } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");
const { loginValidator, registerValidator } = require("../validators/authValidators");
const validateRequest = require("../validators/validateRequest");

const router = express.Router();

router.post("/register", registerValidator, validateRequest, register);
router.post("/login", loginValidator, validateRequest, login);
router.get("/me", protect, me);

module.exports = router;
