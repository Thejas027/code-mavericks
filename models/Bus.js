const mongoose = require("mongoose");

const busSchema = new mongoose.Schema(
  {
    busNo: {
      type: String,
      required: [true, "A bus should have a unique bus number"],
      unique: true,
    },
    routeNo: {
      type: String,
      required: [true, "A bus must have a route number"],
    },
    driverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Driver",
      required: [true, "A bus must have an assigned driver"],
    },
    capacity: {
      type: Number,
      required: [true, "Bus capacity is required"],
    },
    currentLocation: {
      latitude: {
        type: Number,
        required: true,
      },
      longitude: {
        type: Number,
        required: true,
      },
    },
    status: {
      type: String,
      enum: ["On Route", "Stopped", "In Maintenance"],
      default: "On Route",
    },
    studentBoarded: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Bus", busSchema);
