import connectToDatabase from "@/app/lib/db";
import TransactionModel from "@/app/models/TransactionsModel"; // Update import

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Only GET requests allowed" });
  }

  try {
    // Connect to the database
    await connectToDatabase();

    // Get the first and last day of the current month
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 2, 0);

    console.log(lastDay);
    // Find transactions within the current month
    const transactions = await TransactionModel.find({
      date: {
        $gte: firstDay,
        $lt: lastDay,
      },
      type: "debit",
    });

    // Respond with the transactions
    return res.status(200).json(transactions);
  } catch (error) {
    console.error("Error saving entry:", error);
    return res.status(500).json({ message: "An error occurred" });
  }
}
