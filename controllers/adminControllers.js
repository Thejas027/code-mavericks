const Bus = require("../models/Bus.js");
const Driver = require("../models/Driver.js");
const Student = require("../models/Student.js");
const Route = require("../models/Path.js");

// Function to fetch total number of buses
const getTotalBuses = async () => {
  return await Bus.countDocuments({});
};

// Function to fetch all students
const getAllStudents = async () => {
  return await Student.find({}).select(
    "name parentName assignedBus pickupLocation dropLocation"
  );
};

// Function to fetch all drivers with assigned bus details
const getAllDrivers = async () => {
  return await Driver.find({})
    .select("name licenseNumber email phone assignedBus")
    .populate("assignedBus", "busNo currentLocation");
};

// Function to fetch all routes
const getAllRoutes = async () => {
  return await Route.find({}).select(
    "routeId stops preferredPath estimatedTime"
  );
};

// Main controller function to gather data for the admin dashboard
const getAdminDashboardData = async (req, res) => {
  try {
    const totalBuses = await getTotalBuses();
    const students = await getAllStudents();
    const drivers = await getAllDrivers();
    const routes = await getAllRoutes();

    res.status(200).json({
      totalBuses,
      students,
      drivers,
      routes,
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({ error: "Failed to load admin dashboard data" });
  }
};

module.exports = {
  getAdminDashboardData,
};
