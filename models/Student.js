const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Student name is required"],
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Parent",
      required: [true, "Parent is required"],
    },
    assignedBus: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bus",
      required: [true, "Assigned bus is required"],
    },
    pickupLocation: {
      type: String,
      required: [true, "Pick-up location is required"],
    },
    dropOffLocation: {
      type: String,
      required: [true, "Drop-off location is required"],
    },
    biometric: {
      fingerprint: {
        type: String,
        required: [true, "Biometric fingerprint is required"],
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
    },
    boardingStatus: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Student", studentSchema);
