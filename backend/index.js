// index.js
const express = require("express");
const app = express();
const PORT = 5000; // You can choose any port

// Basic route
app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.get("/hlo", (req, res) => {
  res.send("Server is not running!");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
