import express from "express";
import { getAllUsers, logout } from "../controller/user.js";
import { register } from "../controller/user.js";
import { login } from "../controller/user.js";
import { getMyProfile } from "../controller/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();


router.get("/all", getAllUsers);

router.post("/new", register);

router.post("/login", login);

router.get("/logout", logout);


// isAuthenticated is used as a middleware for getting the user data in the req object 
router.get("/me", isAuthenticated, getMyProfile);



export default router;