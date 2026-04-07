const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// 🔥 MongoDB connection (PASTE YOUR URL)
mongoose.connect("mongodb://madhu:Madhu123@ac-f1qnnit-shard-00-00.garkijc.mongodb.net:27017,ac-f1qnnit-shard-00-01.garkijc.mongodb.net:27017,ac-f1qnnit-shard-00-02.garkijc.mongodb.net:27017/?ssl=true&replicaSet=atlas-fqq34u-shard-0&authSource=admin&appName=Cluster0")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// 🔥 Model
const Task = mongoose.model("Task", {
  title: String,
  status: { type: String, default: "pending" }
});

// 🔥 Routes

// Create
app.post("/tasks", async (req, res) => {
  const task = new Task(req.body);
  const saved = await task.save();
  res.json(saved);
});

// Read
app.get("/tasks", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// Delete
app.delete("/tasks/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

app.put("/tasks/:id", async (req, res) => {
  const updated = await Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }   // ⭐ VERY IMPORTANT
  );
  res.json(updated);
});

app.listen(5000, () => console.log("Server running on port 5000"));