const express = require('express');
const router = express.Router();
const {studentRegister, studentlogin, googleAuth} = require("../controllers/authController")

router.post("/register", studentRegister)
router.post("/login", studentlogin)
router.post("/google", googleAuth);

module.exports = router;