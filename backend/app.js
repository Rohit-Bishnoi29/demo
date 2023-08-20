import express from "express";
import mongoose from "mongoose";
import blogRouter from "./routes/blog-routes.js";
import router from "./routes/user-routes.js";
import cors from "cors";
import path, {dirname} from "path";
import {fileURLToPath} from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(
    express.urlencoded({ extended: true })
);
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "./frontend/build")))
app.use("/api/user",router)
app.use("/api/blog",blogRouter)

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./frontend/build/index.html"))
})

const PORT = process.env.PORT || 3001;

mongoose.connect('mongodb+srv://admin:bTwMy2WbteTKMn8g@cluster0.yea3jox.mongodb.net/?retryWrites=true&w=majority'
).then(()=>app.listen(PORT)).then(()=>console.log("Connected to database and listening on PORT 5000")
).catch((err)=>{console.log(err)});
