import mongoose from "mongoose";

// Check if the model is already defined before defining it
const GeneralTransactionModel =
  mongoose.models.generaltransaction ||
  mongoose.model(
    "generaltransaction",
    new mongoose.Schema(
      {
        amount: {
          type: Number,
          required: true,
        },
        date: { type: Date, default: null },
        type: { type: String, default: "debit" },
        aavaktypeid: { type: mongoose.Schema.Types.ObjectId, ref: "" },
        aavaktypename: { type: String, default: "" },
        javaktypeid: { type: mongoose.Schema.Types.ObjectId, ref: "" },
        javaktypename: { type: String, default: "" },
        notes: { type: String, default: "" },
      },
      {
        timestamps: true,
      }
    )
  );

export default GeneralTransactionModel;
