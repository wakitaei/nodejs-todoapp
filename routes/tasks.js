const express = require("express");
const router = express.Router();
const {
    getAllTasks,
    createTask,
    getSingleTask,
    updateTask,
    deleteTask,
} = require("../controllers/tasks");

// app.jsのapp.use("/api/v1/tasks", taskRoute);で"/"のみ指定する
// ルーディングのためのモジュールのため処理はcontrollerで行う
router.get("/", getAllTasks);

router.post("/", createTask);

router.get("/:id", getSingleTask);

router.patch("/:id", updateTask);

router.delete("/:id", deleteTask);

module.exports = router;