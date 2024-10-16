import connectToDatabase from "@/app/lib/db";
import TransactionModel from "@/app/models/TransactionsModel"; // Update import

import mongoose, { mongo } from "mongoose";
import { Underdog } from "next/font/google";
export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Only POST requests allowed" });
  }

  try {
    // Connect to the database
    await connectToDatabase();

    // Get the first and last day of the current month
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    var query = [];

    var q = {
      $match: {
        type: {
          $in: ["borrow", "deposit", "debit"],
        },
      },
    };
    query.push(q);

    var q2 = {
      $group: {
        _id: null,
        borrowSum: {
          $sum: {
            $cond: {
              if: {
                $eq: ["$type", "borrow"],
              },
              then: "$amount",
              else: 0,
            },
          },
        },
        depositSum: {
          $sum: {
            $cond: {
              if: {
                $eq: ["$type", "deposit"],
              },
              then: "$amount",
              else: 0,
            },
          },
        },
        debit: {
          $sum: {
            $cond: {
              if: {
                $eq: ["$type", "debit"],
              },
              then: "$amount",
              else: 0,
            },
          },
        },
      },
    };
    query.push(q2);
    var q3 = {
      $addFields: {
        currentBorrow: {
          $subtract: ["$borrowSum", "$depositSum"],
        },
      },
    };
    query.push(q3);
    var q4 = {
      $addFields: {
        currenttotal: {
          $add: ["$debit", "$depositSum"],
        },
      },
    };
    query.push(q4);

    const transactions = await TransactionModel.aggregate(query); // Sort by date in descending order;

    // Find transactions within the current month

    // Respond with the transactions
    return res.status(200).json(transactions);
  } catch (error) {
    console.error("Error saving entry:", error);
    return res.status(500).json({ message: "An error occurred" });
  }
}
