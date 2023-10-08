const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  creationDate: { type: Date, default: Date.now },
  status: { type: String, enum: ["pending", "completed"], default: "pending" },
});

const taskModel = mongoose.model("task", taskSchema);

module.exports = { taskModel };
