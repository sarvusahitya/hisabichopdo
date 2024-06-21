import mongoose from "mongoose";

// Check if the model is already defined before defining it
const GeneralAAvakTypeModel =
  mongoose.models.generalaavaktype ||
  mongoose.model(
    "generalaavaktype",
    new mongoose.Schema(
      {
        name: { type: String, default: "" },
        gujaratiname: { type: String, default: "" },
      },
      {
        timestamps: true,
      }
    )
  );

export default GeneralAAvakTypeModel;
