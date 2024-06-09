"use client";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function DukanLandingPage() {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [transactions, setTransactions] = useState([]);
  const [fetchLoading, setFetchLoading] = useState(true);
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const response = await fetch("/api/listdukantransactions");
        if (!response.ok) {
          throw new Error("Failed to fetch transactions");
        }
        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setFetchLoading(false);
      }
    }

    fetchTransactions();
  }, []);

  const handleClick = async () => {
    console.log("Clicked! Input value:", inputValue);
    setIsLoading(true);

    try {
      const selectedDateString = selectedDate.toLocaleDateString("en-US");
      const parts = selectedDateString.split("/");
      const formattedDateString = `${parts[2]}-${parts[0].padStart(
        2,
        "0"
      )}-${parts[1].padStart(2, "0")}`;

      const response = await fetch("/api/adddukanaavak", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: formattedDateString,
          amount: parseFloat(inputValue),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData.message);
        alert(errorData.message);
        throw new Error(errorData.message || "Something went wrong");
      }

      const data = await response.json();
      console.log("Success:", data);
      alert("આવક ઉમેરાય ગઈ છે");
      setInputValue("");

      // Refresh transactions list after adding a new entry
      const refreshedResponse = await fetch("/api/listdukantransactions");
      const refreshedData = await refreshedResponse.json();
      setTransactions(refreshedData);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDateChange = (date) => {
    console.log(date);
    setSelectedDate(date);
  };
  const totalAmount = transactions.reduce((total, transaction) => {
    return total + transaction.amount;
  }, 0);

  return (
    <main className="flex flex-col items-center justify-between p-24">
      <h1 className="mb-3 text-2xl font-semibold text-white">
        દુકાન આવક ઉમેરો
      </h1>
      <div className="flex flex-col lg:max-w-5xl lg:w-full lg:mb-3 lg:flex-row lg:justify-between">
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="dd - MMM - yyyy"
          showMonthYearDropdown
          className="mb-2 w-full md:w-auto"
        />
        <input
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          pattern="[0-9]*"
          title="Please enter only numeric values"
          className="form-control text-black w-full mb-2 md:mb-0"
          placeholder="આવક અહીંયા લખો."
        />
        <button
          onClick={handleClick}
          className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none w-full"
        >
          {isLoading ? "Loading..." : "ઉમેરો"}
        </button>
      </div>

      <h1 className="mb-3 text-2xl font-semibold text-white">દુકાન આવક યાદી</h1>
      <div className="text-black">
        {fetchLoading ? (
          <div>Loading...</div>
        ) : (
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Date
                </th>
                <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Transaction
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction._id}>
                  <td className="py-2 px-4 border-b border-gray-200 whitespace-nowrap">
                    {new Date(transaction.date).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200 whitespace-nowrap text-right">
                    {formatCurrency(transaction.amount)}
                  </td>
                </tr>
              ))}

              <td
                className="py-2 px-4 border-b border-gray-200 whitespace-nowrap text-right"
                colSpan={2}
              >
                {formatCurrency(totalAmount)}
              </td>
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
}
