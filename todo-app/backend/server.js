const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// ✅ CORS
app.use(cors({
  origin: "*"
}));

app.use(express.json());

// ✅ Model
const Task = mongoose.model("Task", {
  title: String,
  status: { type: String, default: "pending" }
});

// ✅ Routes
app.get("/tasks", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

app.post("/tasks", async (req, res) => {
  const task = new Task(req.body);
  const saved = await task.save();
  res.json(saved);
});

app.delete("/tasks/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

app.put("/tasks/:id", async (req, res) => {
  const updated = await Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

// ✅ MongoDB + Server START
mongoose.connect("mongodb://madhu:Madhu123@ac-f1qnnit-shard-00-00.garkijc.mongodb.net:27017,ac-f1qnnit-shard-00-01.garkijc.mongodb.net:27017,ac-f1qnnit-shard-00-02.garkijc.mongodb.net:27017/?ssl=true&replicaSet=atlas-fqq34u-shard-0&authSource=admin&appName=Cluster0")
.then(() => {
  console.log("MongoDB Connected");

  app.listen(5000, () => {
    console.log("Server running on port 5000");
  });

})
.catch(err => console.log(err));