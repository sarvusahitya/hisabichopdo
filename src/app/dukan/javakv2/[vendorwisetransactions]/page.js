"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  formatCurrency,
  forMateDate,
  getLastSlug,
  getFilterObject,
} from "@/app/lib/utils";

export default function DukanVendorWiseTransactions() {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [transactions, setTransactions] = useState([]);
  const [AllTotalAnalysis, setTotalForAllValues] = useState([]);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [selettransactiontypeid, setTransactionsType] = useState(""); // Add state for selected vendor ID
  const [selectvisibletransactionname, setTransactionsVisibleTypeName] =
    useState(""); // Add state for selected vendor ID

  const [selectedVendorId, setSelectedVendorId] = useState(""); // Add state for selected vendor ID
  const [selectedVendorname, setSelectedVendorName] = useState(""); // Add state for selected vendor

  const pathname = usePathname();
  const parts = pathname.split("/");
  const slug = parts[parts.length - 1];

  const handleTransactionTypeChange = (e) => {
    // console.log("Sdds");
    const selettransactiontypeid1 = e.target.value; // Assuming vendor ID is included in the option value
    const selectvisiblenameset = e.target.options[e.target.selectedIndex].text; // Get the selected vendor name from the option text
    setTransactionsType(selettransactiontypeid1);
    setTransactionsVisibleTypeName(selectvisiblenameset);
  };
  async function fetchTransactions() {
    try {
      const response = await fetch("/api/listdukanvendorwisetransactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          vendorid: slug,
        }),
      });
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setFetchLoading(false);
    }
  }
  async function GroupByTotalAnalytics() {
    try {
      const response = await fetch("/api/dukantransactiongroupby", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          vendorid: slug,
        }),
      });
      const data = await response.json();
      setTotalForAllValues(data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      // setFetchLoading(false);
    }
  }
  async function getVendorDetails() {
    try {
      const response = await fetch("/api/listvendors");
      const data = await response.json();

      var { id, name } = getFilterObject(data, slug);

      setSelectedVendorId(id);
      setSelectedVendorName(name);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setFetchLoading(false);
    }
  }

  useEffect(() => {
    getVendorDetails();
    setTimeout(() => {
      fetchTransactions();
    }, 1000);
    setTimeout(() => {
      GroupByTotalAnalytics();
    }, 2000);
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

      console.log(selectedVendorId);
      console.log(selectedVendorname);
      const response = await fetch("/api/adddukanjavak", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: formattedDateString,
          amount: parseFloat(inputValue),
          vendorid: selectedVendorId,
          vendorname: selectedVendorname,
          type: selettransactiontypeid,
          typevisiblename: selectvisibletransactionname,
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

      fetchTransactions();
      // Refresh transactions list after adding a new entry
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const totalAmount = transactions.reduce((total, transaction) => {
    return total + transaction.amount;
  }, 0);

  return (
    <main className="flex flex-col items-center justify-between p-24">
      <h1 className="mb-3 text-2xl font-semibold text-white">
        {selectedVendorname}
      </h1>
      <div className="flex flex-col lg:max-w-5xl lg:w-full lg:mb-3 lg:flex-row lg:justify-between">
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="dd - MMM - yyyy"
          showMonthYearDropdown
          className="mb-2 w-full md:w-auto"
        />

        <select
          onChange={handleTransactionTypeChange}
          className="form-control text-black w-full mb-2 md:mb-0"
        >
          <option value="">Select One</option>
          <option value="debit">રોકડે જાવક </option>
          <option value="borrow">ઉધાર</option>
          <option value="deposit">જમા</option>
        </select>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          pattern="[0-9]*"
          title="Please enter only numeric values"
          className="form-control text-black w-full mb-2 md:mb-0"
          placeholder="જાવક અહીંયા લખો."
        />
        <button
          onClick={handleClick}
          className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none w-full"
        >
          {isLoading ? "Loading..." : "ઉમેરો"}
        </button>
      </div>

      <div className="text-black mt-5">
        {fetchLoading ? (
          <div>Loading...</div>
        ) : (
          <table className="min-w-full bg-white border  table-auto">
            <tbody>
              <tr>
                <td className="py-2 px-1 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  type
                </td>

                <td className="py-2 px-1 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Date
                </td>

                <td className="py-2 px-1 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Transaction
                </td>
              </tr>
              {transactions.map((transaction) => (
                <tr key={transaction._id}>
                  <td className="py-2 px-1 border-b border-gray-200 whitespace-nowrap">
                    {transaction.type}({transaction.typevisiblename})
                  </td>
                  <td className="py-2 px-1 border-b border-gray-200 whitespace-nowrap">
                    {forMateDate(transaction.date)}
                  </td>

                  <td className="py-2 px-1 border-b border-gray-200 whitespace-nowrap text-right">
                    {formatCurrency(transaction.amount)}
                  </td>
                </tr>
              ))}

              <tr>
                <td
                  className="py-2 px-4 border-b border-gray-200 whitespace-nowrap text-right"
                  colSpan={3}
                >
                  {formatCurrency(totalAmount)}
                </td>
              </tr>
            </tbody>
          </table>
        )}

        {AllTotalAnalysis.length > 0 ? (
          <table className="text-white border border-gray-200 m-10 ">
            <tbody>
              <tr className="border">
                <th className="border p-4">રોકડે જાવક </th>
                <th className="border p-4">
                  {formatCurrency(AllTotalAnalysis[0].debit)}{" "}
                </th>
              </tr>
              {/* <tr className="border">
              <th className="border p-4">બાકી લીધેલું </th>

              <th className="border p-4">
                {formatCurrency(AllTotalAnalysis[0].borrowSum)}{" "}
              </th>
            </tr> */}
              {/* <tr className="border">
              <th className="border p-4">જમા કરાવેલા </th>

              <th className="border p-4">
                {formatCurrency(AllTotalAnalysis[0].depositSum)}{" "}
              </th>
            </tr> */}

              <tr className="border">
                <th className="border p-4">જમા કરાવેલા </th>

                <th className="border p-4">
                  {formatCurrency(AllTotalAnalysis[0].depositSum)}{" "}
                </th>
              </tr>
              <tr className="border">
                <th className="border p-4">ટોટલ જાવક</th>

                <th className="border p-4">
                  {formatCurrency(AllTotalAnalysis[0].currenttotal)}
                </th>
              </tr>

              <tr className="border">
                <th className="border p-4"> ટોટલ દેવાના બાકી </th>

                <th className="border p-4">
                  {formatCurrency(AllTotalAnalysis[0].currentBorrow)}{" "}
                </th>
              </tr>
            </tbody>
          </table>
        ) : (
          <p className="text-gray-400">Loading...</p>
        )}
      </div>
    </main>
  );
}
