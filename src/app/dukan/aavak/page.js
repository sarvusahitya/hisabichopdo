"use client";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function DukanLandingPage() {
  const [inputValue, setInputValue] = useState("");

  const handleClick = async () => {
    console.log("Clicked! Input value:", inputValue);

    try {
      // Extracting only the date part
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
          date: formattedDateString, // Passing only the date without the time
          amount: parseFloat(inputValue),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
      }

      const data = await response.json();
      console.log("Success:", data);
      alert("આવક ઉમેરાય ગઈ છે");
      setInputValue("");
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    console.log(date);
    setSelectedDate(date);
  };

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
          Add
        </button>
      </div>
      <div className="grid grid-cols-3 gap-4 lg:max-w-5xl lg:w-full lg:mb-0 lg:text-left">
        {/* Your grid content goes here */}
      </div>
    </main>
  );
}
