// index.js
const mongoose = require("mongoose");

const username = "rishav";
const password = "0EAGQPSyoSrgC03E";
const dbName = "Area"; // Tumhara database name

// Final Connection String
const uri = `mongodb+srv://${username}:${password}@area.86ledhx.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=Area`;

async function connectDB() {
  try {
    await mongoose.connect(uri);
    console.log("✅ MongoDB connected successfully!");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
}

// Call the function
connectDB();

// Example schema
const familySchema = new mongoose.Schema({
  name: String,
  members: Number
});

const Family = mongoose.model("Family", familySchema);

// Insert example data
async function createFamily() {
  const fam = new Family({ name: "Sharma", members: 4 });
  await fam.save();
  console.log("👨‍👩‍👦 Family saved!");
}

createFamily();
