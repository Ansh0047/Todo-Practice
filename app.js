import express from "express";
import userRouter from "./routes/user.js"
import taskRouter from "./routes/task.js"
import { connectDB } from "./data/database.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

const app = express();


dotenv.config();
app.use(express.json());
app.use(cookieParser());   // using this middleware i can acces cookies  


// if there is some common route then we can add the prefix so that it is already added before it hits
app.use("/users",userRouter);
app.use("/task",taskRouter);


// separated the database connection
connectDB();


app.get("/", (req,res) => {
    res.send("Hello AK");
});

app.listen(5000,() => {
    console.log("Server is working");
})