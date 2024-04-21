import mongoose from "mongoose";
import Blog from "../models/Blog.js"
import User from "../models/User.js";

export const getBlogs = async(req, res, next) => {
    let blogs;
    try {
        blogs = await Blog.find();
    } catch (err) {
        return console.log(err)
    }
    if (!blogs) {
        return res.status(404).json({message: "Not Found!"})
    }
    return res.status(200).json({blogs})
}

export const addBlogs = async(req, res, next) => {
    const {title, description, image, user} = req.body;
    let ExistUser;
    try {
        ExistUser = await User.findById(user);
    } catch (err) {
        return console.log(err);
    }
    if (!ExistUser) {
        return res.status(400).json({message: "Unable To Find User By Id"})
    }
    const blog = new Blog ({
        title,
        description,
        image,
        user,
    });
    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await blog.save();
        ExistUser.blogs.push(blog);
        await ExistUser.save({ session });
        await session.commitTransaction();
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: err})
    }
    return res.status(200).json({blog});
};

export const updateBlogs = async (req, res, next) => {
    const { title, description } = req.body;
    const blogId = req.params.id;
    try {
        const blog = await Blog.findByIdAndUpdate(blogId, { title, description }, { new: true });
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        return res.status(200).json({ blog });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const getById = async(req, res, next) => {
    const id = req.params.id;
    let blog;
    try {
        blog = await Blog.findById(id);
    } catch (err) {
        return console.log(err); 
    } if (!blog) {
        return res.status(404).json({message: "Blog Not Found!"})
    }
    return res.status(200).json({ blog });
};

export const deleteBlog = async (req, res, next) => {
    const id = req.params.id;
    try {
        const blog = await Blog.findByIdAndDelete(id).populate('user');
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        await blog.user.blogs.pull(blog);
        await blog.user.save();
        return res.status(200).json({ message: "Blog was deleted successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const getByUserId = async (req,res,next) => {
    const userId = req.params.id;
    let userBlogs;
    try{
        userBlogs = await User.findById(userId).populate("blogs");
    }
    catch (err) {
        return console.log(err);
    }
    if (!userBlogs) {
        return res.status(404).json({message: "No Blog Found"})
    }
    return res.status(200).json({blog:userBlogs})
}
