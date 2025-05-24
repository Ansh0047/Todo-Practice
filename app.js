import express from "express";
import userRouter from "./routes/user.js"
import taskRouter from "./routes/task.js"
import { connectDB } from "./data/database.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleWare } from "./middlewares/error.js";
import cors from "cors";

export const app = express();


dotenv.config();
app.use(express.json());
app.use(cookieParser());   // using this middleware i can acces cookies  

// cors middleware to allow requests from other domains
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET","POST","PUT","DELETE"],
    credentials: true,
}));    


// if there is some common route then we can add the prefix so that it is already added before it hits
app.use("/users", userRouter);
app.use("/task", taskRouter);



app.get("/", (req, res) => {
    res.send("Hello AK");
});


// error middleware
// this is the error handling in node, if we call the next method with the error then this will be executed
app.use(errorMiddleWare);