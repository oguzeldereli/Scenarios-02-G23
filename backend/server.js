import express from "express";
import dotenv from "dotenv";
import {connectDB} from "./config/db.js";
import chapterRoutes from "./routes/chapter.route.js";
import projectRoutes from "./routes/project.route.js"

dotenv.config();
const app = express();

app.use(express.json()); // allows us to accept json data in the req.body

// project routes
app.use("/api/projects", projectRoutes);
// chapter routes
app.use("/api/chapters", chapterRoutes);
app.use("/api/projects/:projectId/chapters", chapterRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    connectDB();
    console.log(`Server running on port ${PORT}`);
});
