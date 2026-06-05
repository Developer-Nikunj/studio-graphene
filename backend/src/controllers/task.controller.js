const asyncHandler = require("../utils/asyncHandler");
const taskModel = require("../models/tasks.model");
const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");
const { NUMBER } = require("sequelize");

const getAllTasks = asyncHandler(async (req, res) => {
    const { limit = 30, offset = 0 } = req.query;

    const tasks = await taskModel.findAll({
        where: {
            isDeleted: false
        },
        attributes: [
            "id",
            "title",
            "isCompleted",
            "isActive",
            "dueDate",
            "order",
        ],
        limit: Number(limit),
        offset: Number(offset),
        order: [["order", "ASC"]]
    });

    return res.status(200).json(
        new ApiResponse(
            200,
            tasks,
            "Tasks fetched successfully"
        )
    );
});


const createTask = asyncHandler(async (req, res) => {
    const { title, description, dueDate, isActive } = req.body;

    if (!title?.trim()) {
        throw new ApiError(400, 'Title is required!!');
    }
    const lastTask = await taskModel.findOne({
        where: { isDeleted: false },
        order: [["order", "DESC"]],
    });

    const order = lastTask ? lastTask.order + 1000 : 1000;

    const task =await taskModel.create({
        title,
        description,
        dueDate,
        isActive,
        order,
    })

    if (!task) {
        throw new ApiError(
            400,
            "Task creation Failed"
        )
    }

    const responseData = {
        id: task.id,
        isCompleted: task.isCompleted,
        title: task.title,
        isActive: task.isActive,
        order: task.order,
        dueDate: task.dueDate
            ? new Date(task.dueDate).toISOString().split("T")[0]
            : null,
    };

    return res.status(201).json(
        new ApiResponse(
            201,
            responseData,
            "Task created successfully"
        )
    );
})


const taskById = asyncHandler(async (req, res) => {
    const { taskId } = req.params;
    if (!taskId) {
        throw new ApiError(
            400,
            'Task Id is required'
        )
    }

    const task = await taskModel.findOne({
        where: {
            id: taskId
        },
        attributes: {
            exclude: ['updatedAt', 'isDeleted','UUID'],
        }
    });

    if (!task) {
        throw new ApiError(
            404,
            "Task not Found!!"
        )
    }

    const formattedTask = {
    ...task.toJSON(),
    dueDate: task.dueDate && !isNaN(new Date(task.dueDate))
        ? new Date(task.dueDate).toISOString().split("T")[0]
        : null,
    createdAt: task.createdAt && !isNaN(new Date(task.createdAt))
        ? new Date(task.createdAt).toISOString().split("T")[0]
        : null,
}

    return res.status(200).json(
        new ApiResponse(
            200,
            formattedTask,
            "Task Found successfully!!!"
        )
    )
})


const updateTask = asyncHandler(async (req, res) => {
    const { title, description, isCompleted, isActive, dueDate } = req.body;

    const { taskId } = req.params;

    if (!taskId) {
        throw new ApiError(
            400,
            "Task Id is required"
        );
    }

    const task = await taskModel.findOne(
        {
            where: {
                id: taskId,
            }
        }
    )

    if (!task) {
        throw new ApiError(
            404,
            "Task not found"
        );
    }

    await task.update({
        ...(title !== undefined && { title: title.trim() }),
        ...(description !== undefined && { description }),
        ...(isCompleted !== undefined && { isCompleted }),
        ...(isActive !== undefined && { isActive }),
        ...(dueDate !== undefined && { dueDate }),
    });

    const responseData = {
        id: task.id,
        isCompleted: task.isCompleted,
        title: task.title,
        isActive: task.isActive,
        dueDate: task.dueDate
            ? new Date(task.dueDate).toISOString().split("T")[0]
            : null,
    };

    return res.status(200).json(
        new ApiResponse(
            200,
            responseData,
            "Task updated successfully"
        )
    );

})


const deleteTask = asyncHandler(async (req, res) => {
    const { taskId } = req.params;

    if (!taskId) {
        throw new ApiError(
            400,
            "Task Id is required"
        );
    }

    const task = await taskModel.update(
        {
            isDeleted: true,
        },
        {
            where: {
                id: taskId,
            },
        }
    );

    const formattedResponse = {
        TaskId:task[0],
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            formattedResponse,
            "Task Deleted successfully"
        )
    ); 
})


const reOrderTask = asyncHandler(async(req,res)=>{
    const { taskId, previousOrder, nextOrder } = req.body;

    const taskOrder = (Number(previousOrder) + Number(nextOrder)) / 2;

    if (!taskId) {
        throw new ApiError(
            400,
            "Task Id is required"
        );
    }

    const task = await taskModel.findOne(
        {
            where:{
                id:taskId,
            },
            attributes: ["id", "title", "order", "isCompleted", "isActive","dueDate"],
        }
    )

    if (!task) {
        throw new ApiError(
            400,
            "Task not Found!!"
        )

    }

    await task.update({
        order: taskOrder
    })

    const responseData = {
        id: task.id,
        isCompleted: task.isCompleted,
        title: task.title,
        order: task.order,
        isActive: task.isActive,
        dueDate: task.dueDate
            ? new Date(task.dueDate).toISOString().split("T")[0]
            : null,
    };

    return res.status(200).json(
        new ApiResponse(
            200,
            responseData,
            "Task ReOrder successfully"
        )
    ); 
    
})

module.exports = {
    getAllTasks,
    createTask,
    taskById,
    updateTask,
    deleteTask,
    reOrderTask
};