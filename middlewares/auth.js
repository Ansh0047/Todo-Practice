import { User } from "../models/user.js";
import jwt from "jsonwebtoken";

// middleware for checking the user is verfied or not
export const isAuthenticated = async (req,res,next) => {
    // now i have token created for a user and i can now get my id from the token

    const { token } = req.cookies;
    // console.log(token);

    if (!token) {
        return res.status(404).json({
            success: false,
            message: "Login first",
        });
    }   

    // now we can decode our token and can acces to the id
    const decoded = jwt.verify(token,process.env.JWT_SECRET);

    // saving the object in the req object
    req.user = await User.findById(decoded._id);
    next();   // and by calling this the next method in the chain gets executed
};