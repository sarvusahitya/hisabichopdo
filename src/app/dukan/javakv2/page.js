"use client";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import Link from "next/link";

export default function DukanJavakPage() {
  const [AllTotalAnalysis, setTotalForAllValues] = useState([]);

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

  async function allJavakAnalysis() {
    try {
      const response = await fetch("/api/alljavakanalysiscount");
      const data = await response.json();
      setTotalForAllValues(data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      // setFetchLoading(false);
    }
  }

  useEffect(() => {
    async function fetchVendors() {
      try {
        const response = await fetch("/api/listvendors");
        if (!response.ok) {
          throw new Error("Failed to fetch vendors");
        }
        const data = await response.json();
        setVendors(data);
        setFetchLoading(false);
      } catch (error) {
        console.error("Error fetching vendors:", error);
      }
    }
    fetchVendors(); // Fetch vendors when component mounts

    setTimeout(() => {
      allJavakAnalysis();
    }, 1000);
  }, []);

  return (
    <main className="flex flex-col items-center justify-between p-6">
      <div className="min-h-screen flex flex-col items-center justify-center py-12">
        {AllTotalAnalysis.length > 0 ? (
          <table
            className="text-white border border-gray-200 m-10 "
            key="table"
          >
            <tbody key="tabletbody">
              {/* <tr className="border">
              <th className="border p-4">રોકડે જાવક </th>
              <th className="border p-4">
                {formatCurrency(AllTotalAnalysis[0].debit)}{" "}
              </th>
            </tr>



            <tr className="border">
              <th className="border p-4">બાકી લીધેલું </th>

              <th className="border p-4">
                {formatCurrency(AllTotalAnalysis[0].borrowSum)}{" "}
              </th>
            </tr>

            <tr className="border">
              <th className="border p-4">જમા કરાવેલા </th>

              <th className="border p-4">
                {formatCurrency(AllTotalAnalysis[0].depositSum)}{" "}
              </th>
            </tr>
              */}

              <tr className="border">
                <th className="border p-4" key="table1">
                  રોકડે જાવક{" "}
                </th>
                <th className="border p-4" key="table2">
                  {formatCurrency(AllTotalAnalysis[0].debit)}{" "}
                </th>
              </tr>
              <tr className="border">
                <th className="border p-4" key="table3">
                  જમા કરાવેલા{" "}
                </th>

                <th className="border p-4" key="table4">
                  {formatCurrency(AllTotalAnalysis[0].depositSum)}{" "}
                </th>
              </tr>
              <tr className="border">
                <th className="border p-4" key="table5">
                  ટોટલ જાવક
                </th>

                <th className="border p-4" key="table6">
                  {formatCurrency(AllTotalAnalysis[0].currenttotal)}
                </th>
              </tr>

              <tr className="border">
                <th className="border p-4" key="table7">
                  {" "}
                  ટોટલ દેવાના બાકી{" "}
                </th>

                <th className="border p-4" key="table8">
                  {formatCurrency(AllTotalAnalysis[0].currentBorrow)}{" "}
                </th>
              </tr>
            </tbody>
          </table>
        ) : (
          <p className="text-gray-400">Loading...</p>
        )}
        {fetchLoading ? (
          <div>Loading...</div>
        ) : (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl px-4"
            key="firstdiv"
          >
            {vendors.map((vendor) => (
              <div
                key={vendor.id}
                className="flex flex-col items-center justify-center p-4 bg-gray-800 rounded-lg shadow-md hover:bg-gray-700 transition-colors duration-300"
              >
                <div
                  className="text-4xl text-white mb-4 break-words text-center"
                  key={`div${vendor.id}`}
                >
                  <Link
                    href={`/dukan/javakv2/${vendor._id}`}
                    key={`link${vendor.id}`}
                  >
                    {vendor.vendorgujaratiname}
                    <h3
                      className="text-xl text-white break-words text-center"
                      key={`h3${vendor.id}`}
                    >
                      ({vendor.vendorname})
                    </h3>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
