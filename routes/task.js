import express from "express";
import { deleteMyTask, getMyTask, newTask, updateMyTask } from "../controller/task.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();


router.post("/new", isAuthenticated, newTask);

router.get("/my", isAuthenticated, getMyTask);

// when we have same url for different routes;
router.route("/:taskId").put(isAuthenticated,updateMyTask).delete(isAuthenticated,deleteMyTask);

export default router;