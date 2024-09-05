import moment from "moment";
import connectToDatabase from "./db";

module.exports.formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount);
};
module.exports.forMateDate = (date) => {
  return moment(date).format("DD-MMM-YY");
};
module.exports.getLastSlug = (url) => {
  const parts = url.split("/");
  const lastSlug = parts[parts.length - 1];
  return lastSlug;
};
module.exports.getFilterObject = (data, id) => {
  const filteredItem = data.find((item) => item._id === id);
  if (filteredItem) {
    return {
      id: filteredItem._id,
      name: filteredItem.vendorname,
    };
  }
  return []; // Return null if item with matching ID not found
};

module.exports.addCommonDataSave = async (formdata, ModelName) => {
  // Connect to the database
  await connectToDatabase();

  // Create a new instance of TransactionModel with date and amount
  const entry = new ModelName(formdata);

  // Save the entry to the database
  await entry.save();
};
