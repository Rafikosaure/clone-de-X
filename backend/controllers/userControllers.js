import User from "../models/userModel.js";
import bcrypt from "bcrypt";


const register = async (req, res, next) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        await User.create({
            ...req.body,
            password: hashedPassword,
        });
        res.status(201).json("User has been created!");
    } catch (error) {
        console.log(error);
        next(error);
    }
}


export default {
    register
}