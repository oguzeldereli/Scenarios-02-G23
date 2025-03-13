import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import {connectDB} from "./config/db.js";
import chapterRoutes from "./routes/chapter.route.js";

dotenv.config();
const app = express();

app.use(express.json()); // allows us to accept json data in the req.body

app.use("/api/chapters", chapterRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    connectDB();
    console.log(`Server running on port ${PORT}`);
});




// /home/projects
// /home/projects/project1
// /home/projects/project1/chapter1
// /home/projects/project1/corkboard
