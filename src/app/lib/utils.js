import moment from "moment";

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
