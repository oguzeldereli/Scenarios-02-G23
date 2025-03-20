import express from "express";
import {
    createProject,
    deleteProject,
    getAllProjects,
    getProject,
    updateProject
} from "../controllers/project.controller.js";

const router = express.Router();

router.get("/", getAllProjects); // get all projects
router.get("/:projectId", getProject); // get a specific project + its document list
router.post("/", createProject); // create a new project
router.put("/:projectId", updateProject); // update a project
router.delete("/:projectId", deleteProject); // delete a project + all its documents + its corkboard

export default router;




