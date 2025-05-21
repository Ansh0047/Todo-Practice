import express from "express";
import userRouter from "./routes/user.js"
import { connectDB } from "./data/database.js";

const app = express();

app.use(express.json());


// if there is some common route then we can add the prefix so that it is already added before it hits
app.use("/users",userRouter);


// separated the database connection
connectDB();


app.get("/", (req,res) => {
    res.send("Hello AK");
});



app.listen(5000,() => {
    console.log("Server is working");
})