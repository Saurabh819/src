const express = require("express");
const router = express.Router();
const sellerController = require("../controller/sellerController");
const {protect, authorizeRoles} = require('../middleware/auth')

router.post("/register",[protect,authorizeRoles('admin')], sellerController.registerSeller);
router.post("/login", sellerController.loginSeller);
router.put("/update/:id", [protect,authorizeRoles('seller')],sellerController.updateSeller);
router.delete("/delete/:id", [protect,authorizeRoles('seller')],sellerController.deleteSeller);

module.exports = router;
