const express = require("express");
const router = express.Router();
const { handleUserSignUp, handleUserLogIn } = require("../controllers/user");

router.post("/", handleUserSignUp);  // Signup route
router.post("/login", handleUserLogIn);  // Login route

module.exports = router;