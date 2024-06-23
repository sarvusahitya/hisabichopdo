import mongoose from "mongoose";

// Check if the model is already defined before defining it
const TransactionModel =
  mongoose.models.transaction ||
  mongoose.model(
    "transaction",
    new mongoose.Schema(
      {
        amount: {
          type: Number,
          required: true,
        },
        date: { type: Date, default: null },
        type: { type: String, default: "credit" }, // credit,debit, baki ,cash
        typevisiblename: { type: String, default: "" }, // credit,debit, baki ,cash
        vendorid: { type: mongoose.Schema.Types.ObjectId, ref: "vendor" },
        vendorname: { type: String, default: "" },
        losstypeid: { type: String, default: "" },
        losstypename: { type: String, default: "" },
        notes: { type: String, default: "" },
      },
      {
        timestamps: true,
      }
    )
  );

export default TransactionModel;
