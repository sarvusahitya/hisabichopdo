import mongoose from "mongoose";

// Check if the model is already defined before defining it
const GeneralJavakTypeModel =
  mongoose.models.generaljavaktype ||
  mongoose.model(
    "generaljavaktype",
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

export default GeneralJavakTypeModel;
