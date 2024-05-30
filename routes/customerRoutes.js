const express = require("express");
const router = express.Router();
const CustomerController = require("../controller/customerController");
const { protect, authorizeRoles } = require("../middleware/auth");

router.post("/register", CustomerController.registerCustomer);
router.post(
  "/login",

  CustomerController.loginCustomer
);

router.put(
  "/update/:id",
  protect,
  authorizeRoles("admin", "customer"),
  CustomerController.updateCustomer
);
router.delete(
  "/delete/:id",
  protect,
  authorizeRoles("admin", "customer"),
  CustomerController.deleteCustomer
);

router.get(
  "/getAllCustomer",
  protect,
  authorizeRoles("admin"),
  CustomerController.getAllCustomer
);

module.exports = router;
