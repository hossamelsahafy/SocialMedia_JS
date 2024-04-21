import User from "../models/User.js";
import bcrypt from "bcryptjs"
export const getUsers = async(req,res,next) => {
    let users;
    try {
        users = await User.find();
    } catch (err) {
        console.log(err);
    }
    if(!users) {
        return res.status(404).json({ message: "No Users Was Found !"});
    }
    return res.status(200).json({ users });
};

export const signup = async (req, res, next) => {
    const { name, email, password } = req.body;
    // Check if the password is provided
    if (!password) {
        return res.status(400).json({ message: "Password is required" });
    }
    let ExUser;
    try {
        ExUser = await User.findOne({ email });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
    if (ExUser) {
        return res.status(400).json({ message: "User already exists, please login" });
    }
    const hashedPass = bcrypt.hashSync(password, 10);
    const user = new User({
        name,
        email,
        password: hashedPass,
        blogs: []
    });
    try {
        await user.save();
        return res.status(201).json({ user });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const login = async(req, res, next) => {
    const { email, password } = req.body;
    let ExUser;
    try {
        ExUser = await User.findOne({ email }); 
    } catch (err) {
        return console.log(err);
    }
    if (!ExUser) {
        return res
        .status(404)
        .json({ message: "User Is n't Exist, Signup Please!"})
    }

    const isPassCorr = bcrypt.compareSync(password, ExUser.password);
    if (!isPassCorr) {
        return res
        .status(400)
        .json({ message: "Pass Isn't Correct Please Try Again!"})
    }

    res.status(200).json({ message: `Hi ${ExUser.name}, Welcome Back`});

}
