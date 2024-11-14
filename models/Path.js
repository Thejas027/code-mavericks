const mongoose = require("mongoose");

const pathSchema = new mongoose.Schema(
  {
    routeId: {
      type: String,
      required: [true, "Route ID is required"],
      unique: true, // Ensures each route has a unique identifier
    },
    routeNumber: {
      type: String,
      required: [true, "Route number is required"],
    },
    stops: [
      {
        stopName: {
          type: String,
          required: [true, "Stop name is required"], // Name of the stop (e.g., "Central Park")
        },
        stopLocation: {
          latitude: {
            type: Number,
            required: true, // Latitude of the stop
          },
          longitude: {
            type: Number,
            required: true, // Longitude of the stop
          },
        },
        sequence: {
          type: Number,
          required: true, // Sequence of the stop in the route
        },
        estimatedArrivalTime: {
          type: Date, // Estimated time the bus will arrive at this stop
        },
      },
    ],
    preferredPath: [
      {
        latitude: {
          type: Number,
          required: true, // Latitude coordinate for the path
        },
        longitude: {
          type: Number,
          required: true, // Longitude coordinate for the path
        },
      },
    ],
    estimatedTime: {
      type: Number,
      required: true, // Total estimated time for the trip (in minutes)
    },
    startTime: {
      type: Date,
      required: true, // Expected start time for the route
    },
    endTime: {
      type: Date,
      required: true, // Expected end time for the route
    },
    status: {
      type: String,
      enum: ["Active", "Completed", "Under Maintenance"],
      default: "Active", // The current status of the route
    },
    totalDistance: {
      type: Number, // Total distance covered by the route (in kilometers or miles)
      required: true,
    },
    estimatedDuration: {
      type: Number, // Estimated duration for the route (in minutes)
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

module.exports = mongoose.model("Path", pathSchema);
