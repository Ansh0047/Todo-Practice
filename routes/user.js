import express from "express";
import { logout, register, login, getMyProfile } from "../controller/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();


router.post("/new", register);

router.post("/login", login);

router.get("/logout", logout);


// isAuthenticated is used as a middleware for getting the user data in the req object 
router.get("/me", isAuthenticated, getMyProfile);



export default router;