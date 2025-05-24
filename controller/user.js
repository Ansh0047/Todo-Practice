import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";


export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // here all user with the email is found with all the fileds and password we have to set manually bcoz in model we have specified it to false
        // now it will fetch all the details + password of the user from the db
        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return next(new ErrorHandler("Invald email or password", 400));
        }


        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return next(new ErrorHandler("Invalid email or password", 400));
        }

        // if (!isMatch) {
        //     return res.status(401).json({
        //         success: false,
        //         message: "Invalid email or password",
        //     });
        // }

        sendCookie(user, res, `Welcome back, ${user.name}`, 200);
    } catch (error) {
        next(error);
    }
};


export const logout = (req, res) => {
    res
        .status(200).cookie("token", "", { 
            expires: new Date(Date.now()),
            sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
            secure: process.env.NODE_ENV === "Development" ? false : true,
        })
        .json({
            success: true,
            user: req.user,
        })
};

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        let user = await User.findOne({ email });


        // if (user) {
        //     return res.status(404).json({
        //         success: false,
        //         message: "User Already Exists",
        //     });
        // }

        // handling errors using  middleware
        if (user) {
            return next(new ErrorHandler("User Already Exists", 400));
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        user = await User.create({ name, email, password: hashedPassword });

        sendCookie(user, res, "Registered Successfully", 200);
    } catch (error) {
        next(error);
    }
};

export const getMyProfile = (req, res) => {
    res.status(200).json({
        success: true,
        user: req.user,
    });
};
