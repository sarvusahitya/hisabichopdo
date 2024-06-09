import connectToDatabase from "@/app/lib/db";
import HomeTransactions from "@/app/models/HomeTransactions";
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests allowed" });
  }

  const { date, amount } = req.body;

  if (!date || !amount) {
    return res.status(400).json({ message: "Date and amount are required" });
  }

  try {
    // Connect to the database
    await connectToDatabase();

    // Create a new instance of TransactionModel with date and amount
    const entry = new HomeTransactions({ date, amount });

    // Save the entry to the database
    await entry.save();

    // Respond with success message
    return res.status(201).json({ message: "Entry added successfully" });
  } catch (error) {
    console.error("Error saving entry:", error);
    return res.status(500).json({ message: "An error occurred" });
  }
}
