const Task = require("../models/Task");

const getAllTasks = async (req, res) => {
  try {
    const allTask = await Task.find({});
    res.status(200).json(allTask);
  } catch (err) {
    res.status(500).json(err);
  }
};

const createTask = async (req, res) => {
  try {
    const createTask = await Task.create(req.body);
    res.status(200).json(createTask);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getSingleTask = async (req, res) => {
  try {
    const singleTask = await Task.findOne({ _id: req.params.id });
    if (!singleTask) {
      return res.status(404).json(`_id:${req.params.id}は存在しません`);
    }
    res.status(200).json(singleTask);
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateTask = async (req, res) => {
  try {
    // https://mongoosejs.com/docs/api/model.html#Model.findOneAndUpdate()
    // [options.new=false] «Boolean» true の場合、元のドキュメントではなく変更されたドキュメントを返します。
    const updateTask = await Task.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
      });
    if (!updateTask) {
      return res.status(404).json(`_id:${req.params.id}は存在しません`);
    }
    res.status(200).json(updateTask);
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteTask = async (req, res) => {
  try {
    const deleteTask = await Task.findByIdAndDelete({ _id: req.params.id });
    if (!deleteTask) {
      return res.status(404).json(`_id:${req.params.id}は存在しません`);
    }
    res.status(200).json(deleteTask);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAllTasks,
  createTask,
  getSingleTask,
  updateTask,
  deleteTask,
};
