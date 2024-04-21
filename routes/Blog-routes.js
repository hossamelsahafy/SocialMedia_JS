import express from 'express';
import { getBlogs, addBlogs, updateBlogs, getById, deleteBlog, getByUserId } from '../controllers/Blog-Control.js';
const blogRoute =express.Router();

blogRoute.get("/", getBlogs);
blogRoute.post("/add", addBlogs);
blogRoute.put("/update/:id", updateBlogs);
blogRoute.get("/:id", getById);
blogRoute.get('/user/:id', getByUserId);
blogRoute.delete("/:id", deleteBlog);
export default blogRoute;
