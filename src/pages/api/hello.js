// src/pages/api/hello.js

export default function handler(req, res) {
  console.log("SSSS");
  res.status(200).json({ message: "Hello from the API" });
}
