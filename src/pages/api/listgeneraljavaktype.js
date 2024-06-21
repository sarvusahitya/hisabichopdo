import connectToDatabase from "@/app/lib/db";
import GeneralJavakTypeModel from "@/app/models/GenralJavakType";
export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Only GET requests allowed" });
  }

  try {
    // Connect to the database
    await connectToDatabase();

    // Get the first and last day of the current month

    // Find transactions within the current month
    const transactions = await GeneralJavakTypeModel.find({});

    // Respond with the transactions
    return res.status(200).json(transactions);
  } catch (error) {
    console.error("Error saving entry:", error);
    return res.status(500).json({ message: "An error occurred" });
  }
}
