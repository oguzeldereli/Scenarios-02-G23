import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import {connectDB} from "./config/db.js";
import documentRoutes from "./routes/document.route.js";
import indexCardRoutes from "./routes/indexCard.route.js"
import projectRoutes from "./routes/project.route.js"

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(cors({origin: "http://localhost:5173"})); // vite uses port 5173

// project routes
app.use("/api/projects", projectRoutes);

// document routes
app.use("/api/documents", documentRoutes);
app.use("/api/projects/:projectId/documents", documentRoutes);

// index card routes
app.use("/api/indexCards", indexCardRoutes);
app.use("/api/projects/:projectId/indexCards", indexCardRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    connectDB();
    console.log(`Server running on port ${PORT}`);
});


// "/api/projects/" = get all projects
// "/api/projects/:projectId" = get a specific project + its document list
// "/api/projects/" = create a new project
// "/api/projects/:projectId" = update a project
// "/api/projects/:projectId" = delete a project + all its documents + its corkboard

// "/api/projects/:projectId/documents/" = create a new document inside a specific project
// "/api/documents/:documentId/" = get a specific document
// "/api/documents/:documentId/" = update a document
// "/api/documents/:documentId/" = delete a document

// "/api/projects/:projectId/indexCards/" = get all index cards from a specific project's corkboard
// "/api/indexCards/:indexCardId/" = get a specific index card
// "/api/projects/:projectId/indexCards/" = create an index card in a specific project's corkboard
// "/api/indexCards/:indexCardId/" = update an index card
// "/api/indexCards/:indexCardId/" = delete an index card
