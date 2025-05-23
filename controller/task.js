import { Task } from "../models/tasks.js";

export const newTask = async (req, res) => {
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
};


export const getMyTask = async (req,res) => {
    const userId = req.user._id;

    const tasks = await Task.find({user: userId});
    res.status(200).json({
        success: true,
        tasks,
    })
};


export const updateMyTask = async (req,res) => {
    const {taskId} = req.params; 

    const task = await Task.findById(taskId);

    if(!taskId){
        return res.status(404).json({
            success: false,
            message: "Invalid Id",
        });
    }

    task.isCompleted = !task.isCompleted;

    await task.save();
    
    res.status(200).json({
        success: true,
        message: "Task updated",
    })
};


export const deleteMyTask = async (req,res) => {
    const {taskId} = req.params; 

    if(!taskId){
        return res.status(404).json({
            success: false,
            message: "Invalid Id",
        });
    }
    const task = await Task.findById(taskId);

    await task.deleteOne();
    
    res.status(200).json({
        success: true,
        message: "Task deleted",
    })
};