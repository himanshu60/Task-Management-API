const express = require("express");
const { taskModel } = require("../models/taskModel");
const taskRouter = express.Router();

// Add TASK
taskRouter.post("/tasks", async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const task = new taskModel({ title, description, status });
    await task.save();
    res.status(200).json({ msg: "task created Sucessfully", tasks: task });
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error", err: error.message });
  }
});

// Retrieve a list of all tasks.
taskRouter.get("/tasks", async (req, res) => {
  try {
    const task = await taskModel.find();
    res.status(200).json({ taskLists: task });
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error", err: error.message });
  }
});

// Retrieve a specific task by ID
taskRouter.get("/tasks/:id", async (req, res) => {
  try {
    const taskID = req.params.id;
    const task = await taskModel.findById(taskID);
    if (!task) {
      res.status(400).json({ msg: "task not Found!" });
    } else {
      res.status(200).json({ task: task });
    }
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error", err: error.message });
  }
});

// Update a specific task by ID
taskRouter.put("/tasks/:id", async (req, res) => {
  try {
    const taskId = req.params.id;
    const { title, description, status } = req.body;
    const updateTask = await taskModel.findByIdAndUpdate(
      taskId,
      { title, description, status },
      { new: true }
    );
    if (!updateTask) {
      res.status(400).json({ msg: "task not Found!" });
    } else {
      res
        .status(200)
        .json({ msg: "task updated sucessfully", task: updateTask });
    }
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error", err: error.message });
  }
});

// Delete a specific task by ID

taskRouter.delete("/tasks/:id", async (req, res) => {
  try {
    const taskId = req.params.id;
    const deltask = await taskModel.findByIdAndDelete(taskId);
    if (!deltask) {
      res.status(400).json({ msg: "task not Found!" });
    }
    res.status(200).json({ msg: "task deleted sucessfully" });
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error", err: error.message });
  }
});

module.exports = { taskRouter };
