import express from "express";
import { getUsers, signup, login } from "../controllers/User-Control.js";


const route = express.Router();
route.get("/", getUsers);
route.post("/signup", signup);
route.post("/login", login);
export default route;
