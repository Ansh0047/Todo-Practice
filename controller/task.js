import ErrorHandler from "../middlewares/error.js";
import { Task } from "../models/tasks.js";

export const newTask = async (req, res) => {
    try {
        const { title, description } = req.body;

        // if user already logged in then it only adds title and description and user info is fetched from the req object 
        await Task.create({
            title,
            description,
            user: req.user,    // we have accessed the user form the req object, if user is authenticated then it will add the user to the req object
        });

        res.status(201).json({
            success: true,
            message: "Task added Succesfully"
        });
    } catch (error) {
        next(error);
    }
};


export const getMyTask = async (req, res) => {
    try {
        const userId = req.user._id;

        const tasks = await Task.find({ user: userId });
        res.status(200).json({
            success: true,
            tasks,
        });
    } catch (error) {
        next(error);
    }
};


export const updateMyTask = async (req, res, next) => {
    try {
        const { taskId } = req.params;

        const task = await Task.findById(taskId);

        if (!task) {
            return next(new ErrorHandler("Task not found", 404));
        }

        task.isCompleted = !task.isCompleted;

        await task.save();

        res.status(200).json({
            success: true,
            message: "Task updated",
        })
    } catch (error) {
        next(error);
    }
};


export const deleteMyTask = async (req, res, next) => {
    try {
        const { taskId } = req.params;
        const task = await Task.findById(taskId);

        if (!task) {
            return next(new ErrorHandler("Task not found", 404));
        }

        await task.deleteOne();

        res.status(200).json({
            success: true,
            message: "Task deleted",
        })
    } catch (error) {
        next(error);
    }
};