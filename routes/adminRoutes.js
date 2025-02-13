const express = require("express");
const router = express.Router();
const adminController = require("../controller/adminController");
const {protect,} = require('../middleware/auth')

router.post("/register", adminController.registerAdmin);
router.post("/login", adminController.loginAdmin);

module.exports = router;
