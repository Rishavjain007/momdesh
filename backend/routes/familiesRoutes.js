import express from "express";
import Family from "../models/Family.js";

const router = express.Router();

// GET all families
router.get("/", async (req, res) => {
  try {
    const families = await Family.find().sort({ createdAt: -1 });
    if (!families.length) {
      return res.status(404).json({ message: "No families found" });
    }
    res.json(families);
  } catch (err) {
    console.error("Error fetching families:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST a new family
router.post("/", async (req, res) => {
  try {
    const { name, members } = req.body;
    const newFamily = new Family({ name, members });
    const savedFamily = await newFamily.save();
    res.status(201).json(savedFamily);
  } catch (err) {
    console.error("Error creating family:", err);
    if (err.name === "ValidationError") {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// PUT update a family
router.put("/:id", async (req, res) => {
  try {
    const { name, members } = req.body;
    const updatedFamily = await Family.findByIdAndUpdate(
      req.params.id,
      { name, members },
      { new: true, runValidators: true }
    );
    if (!updatedFamily) {
      return res.status(404).json({ error: "Family not found" });
    }
    res.json(updatedFamily);
  } catch (err) {
    console.error("Error updating family:", err);
    if (err.name === "ValidationError") {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// DELETE a family
router.delete("/:id", async (req, res) => {
  try {
    const deletedFamily = await Family.findByIdAndDelete(req.params.id);
    if (!deletedFamily) {
      return res.status(404).json({ error: "Family not found" });
    }
    res.json({ message: "Family deleted successfully" });
  } catch (err) {
    console.error("Error deleting family:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;