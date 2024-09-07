import connectToDatabase from "@/app/lib/db";
import CustomerModel from "@/app/models/Customer";
import { addCommonDataSave } from "@/app/lib/utils";
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests allowed" });
  }

  try {
    if (req.body.from == "customeradd") {
      await addCommonDataSave(req.body, CustomerModel);
    }
    // Respond with success message
    return res.status(201).json({ message: "Entry added successfully" });
  } catch (error) {
    console.error("Error saving entry:", error);
    return res.status(500).json({ message: "An error occurred" });
  }
}
