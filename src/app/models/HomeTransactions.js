import mongoose from "mongoose";

// Check if the model is already defined before defining it
const HomeTransactions =
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
        type: { type: String, default: "credit" },
        expensetypeid: { type: mongoose.Schema.Types.ObjectId, ref: "vendor" },
        expensetypename: { type: String, default: "" },
      },
      {
        timestamps: true,
      }
    )
  );

export default HomeTransactions;
