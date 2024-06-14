import connectToDatabase from "@/app/lib/db";

import DukanVendorTransactions from "@/app/models/dukanvendortransaction";
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests allowed" });
  }

  try {
    // Connect to the database
    await connectToDatabase();
    const { type } = req.body;

    // Get the first and last day of the current month
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    // Find transactions within the current month
    const transactions = await DukanVendorTransactions.find({
      date: {
        $gte: firstDay,
        $lt: lastDay,
      },
      type: type,
    });

    // Respond with the transactions
    return res.status(200).json(transactions);
  } catch (error) {
    console.error("Error saving entry:", error);
    return res.status(500).json({ message: "An error occurred" });
  }
}
