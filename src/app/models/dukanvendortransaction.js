import mongoose from "mongoose";

// Check if the model is already defined before defining it
const DukanVendorTransactions =
  mongoose.models.dukanVendortransactions ||
  mongoose.model(
    "dukanVendortransactions",
    new mongoose.Schema(
      {
        amount: {
          type: Number,
          required: true,
        },
        date: { type: Date, default: null },
        type: { type: String, default: "baki" },
        vendorid: { type: mongoose.Schema.Types.ObjectId, ref: "vendor" },
        vendorname: { type: String, default: "" },
      },
      {
        timestamps: true,
      }
    )
  );

export default DukanVendorTransactions;
