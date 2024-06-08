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
      },
      {
        timestamps: true,
      }
    )
  );

export default TransactionModel;
