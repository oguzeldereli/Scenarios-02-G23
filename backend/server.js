import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import {connectDB} from "./config/db.js";
import chapterRoutes from "./routes/chapter.route.js";
import indexCardRoutes from "./routes/indexCard.route.js"
import projectRoutes from "./routes/project.route.js"

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(cors({origin: "http://localhost:5173"})); // vite uses port 5173

// project routes
app.use("/api/projects", projectRoutes);
// chapter routes
app.use("/api/chapters", chapterRoutes);
app.use("/api/projects/:projectId/chapters", chapterRoutes);
// index card routes
app.use("/api/indexCards", indexCardRoutes);
app.use("/api/projects/:projectId/indexCards", indexCardRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    connectDB();
    console.log(`Server running on port ${PORT}`);
});
