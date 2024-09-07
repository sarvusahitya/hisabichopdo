import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema({
  name: { type: String },
  mobile: { type: String, default: true },
  customer_unique_number: { type: Number, default: 0 },
});

CustomerSchema.pre("save", async function (next) {
  try {
    const doc = this;
    if (!doc.customer_unique_number) {
      const lastOrder = await CustomerModel.findOne()
        .sort({ customer_unique_number: -1 })
        .limit(1);
      const nextOrderNumber =
        lastOrder && lastOrder.customer_unique_number
          ? lastOrder.customer_unique_number + 1
          : 1;
      doc.customer_unique_number = nextOrderNumber;
    }
  } catch (error) {
    console.error("Error saving entry:", error);
  }
  next();
});

let CustomerModel;
try {
  // Check if the model is already defined
  CustomerModel = mongoose.model("customer");
} catch {
  // If not defined, define it
  CustomerModel = mongoose.model("customer", CustomerSchema);
}

export default CustomerModel;
