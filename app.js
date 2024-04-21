import express from 'express';
import mongoose from 'mongoose';
import route from './routes/User-routes.js';
import bodyParser from 'body-parser';
import blogRoute from './routes/Blog-routes.js';

const app = express();
app.use(bodyParser.json());

app.use("/api/user", route);
app.use("/api/blog", blogRoute)
mongoose.connect('mongodb+srv://admin:******@cluster0.lzbpskl.mongodb.net/Socialmedia?retryWrites=true&w=majority&appName=Cluster0'
).then(()=>app.listen(5000)).then(()=>console.log("Connected To DataBase And Listening To Localhost 5000")).catch((err)=>console.log(err));
