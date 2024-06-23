"use client";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import Link from "next/link";

export default function DukanJavakPage() {
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
  const forMateDate = (date) => {
    return moment(date).format("DD-MMM-YY");
  };

  const [selectedVendorId, setSelectedVendorId] = useState(""); // Add state for selected vendor ID

  const [vendors, setVendors] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState(""); // Add state for selected vendor

  useEffect(() => {
    async function fetchVendors() {
      try {
        const response = await fetch("/api/listvendors");
        if (!response.ok) {
          throw new Error("Failed to fetch vendors");
        }
        const data = await response.json();
        setVendors(data);
      } catch (error) {
        console.error("Error fetching vendors:", error);
      }
    }

    fetchVendors(); // Fetch vendors when component mounts
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

      const response = await fetch("/api/adddukanjavak", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: formattedDateString,
          amount: parseFloat(inputValue),
          type: "debit",
          vendorid: selectedVendorId,
          vendorname: selectedVendor,
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
      alert("જાવક ઉમેરાય ગઈ છે");
      setInputValue("");

      // Refresh transactions list after adding a new entry
      const refreshedResponse = await fetch("/api/listdukanjavaktransactions");
      const refreshedData = await refreshedResponse.json();
      setTransactions(refreshedData);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-between p-6">
      <div className="min-h-screen flex flex-col items-center justify-center py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl px-4">
          {vendors.map((vendor) => (
            <div
              key={vendor.id}
              className="flex flex-col items-center justify-center p-4 bg-gray-800 rounded-lg shadow-md hover:bg-gray-700 transition-colors duration-300"
            >
              <div className="text-4xl text-white mb-4 break-words text-center">
                <Link href={`/dukan/javakv2/${vendor._id}`}>
                  {vendor.vendorgujaratiname}
                  <h3 className="text-xl text-white break-words text-center">
                    ({vendor.vendorname})
                  </h3>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
