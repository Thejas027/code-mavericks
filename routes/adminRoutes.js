const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminControllers");

// Define the route to get admin dashboard data
router.get("/dashboard", adminController.getAdminDashboardData);

module.exports = router;
