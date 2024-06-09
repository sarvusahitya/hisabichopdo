import mongoose from "mongoose";

// Check if the model is already defined before defining it
const VendorsModel =
  mongoose.models.vendor ||
  mongoose.model(
    "vendor",
    new mongoose.Schema(
      {
        vendorname: { type: String, default: "" },
        vendorgujaratiname: { type: String, default: "" },
      },
      {
        timestamps: true,
      }
    )
  );

export default VendorsModel;
