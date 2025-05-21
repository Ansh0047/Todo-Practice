import express from "express";
import { getAllUsers } from "../controller/user.js";
import { register } from "../controller/user.js";
import { login } from "../controller/user.js";
import { getUserDetails } from "../controller/user.js";

const router = express.Router();


router.get("/all", getAllUsers);

router.post("/new", register);

router.post("/login", login);

router.get("/userid/:id", getUserDetails);



export default router;