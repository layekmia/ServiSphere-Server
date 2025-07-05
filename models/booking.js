const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    serviceId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Service" },
    serviceName: { type: String, required: true },
    serviceImage: { type: String, required: true },
    providerEmail: { type: String, required: true },
    providerName: { type: String, required: true },
    userEmail: { type: String, required: true },
    userName: { type: String, required: true },
    date: { type: String, required: true },
    specialInstruction: { type: String, default: "" },
    price: { type: Number, required: true },
    serviceLocation: {type: String, required:true},
    serviceStatus: { 
      type: String, 
      enum: ["pending", "confirmed", "completed", "cancelled"], 
      default: "pending" 
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
