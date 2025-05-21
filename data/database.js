import mongoose from "mongoose";

export const connectDB = () => {
    mongoose
    .connect("mongodb+srv://anshkant090:anshkant@cluster0.r5qpcb6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("Connected to MongoDB succesfully"))
    .catch((err) => console.log(err));
};

