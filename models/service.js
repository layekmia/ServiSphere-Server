const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    image: { type: String, required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    area: { type: String, required: true },
    description: { type: String, required: true },
    providerName: { type: String, required: true },
    providerEmail: { type: String, required: true },
    providerImage: { type: String, required: true },
    category: {type: String, required: true}
  },
  { timestamps: true }
);

module.exports = mongoose.model("Service", serviceSchema); 
