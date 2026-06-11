const Task = require('../models/Task');
const logActivity = require('../utils/activityLogger');

// Create Task
const createTask = async (req, res) => {
  try {
    const { title, description, priority } = req.body;

    const task = await Task.create({
      title,
      description,
      priority,
      userId: req.user._id,
    });

    await logActivity({
      userId: req.user._id,
      action: 'TASK_CREATED',
      entity: 'Task',
      entityId: task._id,
      details: `Created task: ${task.title}`,
      ipAddress: req.ip,
    });

    res.status(201).json({
      success: true,
      task,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Get My Tasks
const getMyTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      userId: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: tasks.length,
      tasks,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Update Task
const updateTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    Object.assign(task, req.body);

    await task.save();

    await logActivity({
      userId: req.user._id,
      action: 'TASK_UPDATED',
      entity: 'Task',
      entityId: task._id,
      details: `Updated task: ${task.title}`,
      ipAddress: req.ip,
    });

    res.status(200).json({
      success: true,
      task,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Delete Task
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    await Task.findByIdAndDelete(task._id);

    await logActivity({
      userId: req.user._id,
      action: 'TASK_DELETED',
      entity: 'Task',
      entityId: task._id,
      details: `Deleted task: ${task.title}`,
      ipAddress: req.ip,
    });

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully',
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  createTask,
  getMyTasks,
  updateTask,
  deleteTask,
};