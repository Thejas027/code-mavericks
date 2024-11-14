const mongoose = require("mongoose");

const parentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Parent name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
    },
    address: {
      type: String,
      required: [true, "Address is required"],
    },
    students: [
      {
        studentId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Student",
          required: true,
        },
        boardingInfo: {
          busId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Bus", // Refers to the bus the child is boarding
            required: true,
          },
          isBoarded: {
            type: Boolean,
            default: false, // Indicates if the child has boarded the bus
          },
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Parent", parentSchema);
