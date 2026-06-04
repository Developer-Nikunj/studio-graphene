const express = require('express');
const taskRoutes = express.Router();

const {
    getAllTasks,
    createTask,
    taskById,
    updateTask,
    deleteTask,
    reOrderTask,
} = require('../controllers/task.controller.js');

taskRoutes.route('/task')
    .get(getAllTasks)
    .post(createTask);

taskRoutes.route('/task/:taskId')
    .get(taskById)
    .put(updateTask)
    .delete(deleteTask);

taskRoutes.route('/re-order')
    .post(reOrderTask);

module.exports = taskRoutes;