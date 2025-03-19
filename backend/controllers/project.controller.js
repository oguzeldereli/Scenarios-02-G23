import Project from "../models/project.model.js";
import Document from "../models/document.model.js";
import IndexCard from "../models/indexCard.model.js"
import mongoose from "mongoose";

export const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find({});
        res.status(200).json({success: true, data: projects});
    } catch (error) {
        console.log("error in fetching projects: ", error.message);
        res.status(500).json({success: false, message: "server error"});
    }
}

export const getProject = async (req, res) => {
    const {projectId} = req.params

    try {
        const project = await Project.findById(projectId);
        if (!project) {
            res.status(404).json({success: false, message: "project not found"});
        }

        const documents = await Document.find({project: projectId}).select("-content");
        res.status(200).json({success: true, data: project, documents});
    } catch (error) {
        console.log("error in fetching project: ", error.message);
        res.status(500).json({success: false, message: "server error"});
    }
}

export const createProject = async (req, res) => {
    const project = req.body; // user will send this data

    if (!project.title) {
        return res.status(400).json({success:false, message: "Please provide all fields"});
    }

    const newProject = new Project(project);

    try {
        await newProject.save();
        res.status(201).json({success: true, data: newProject});
    } catch(error) {
        console.error("Error in creating project: ", error.message);
        res.status(500).json({success: false, message: "Server error"});
    }
}

export const updateProject = async (req, res) => {
    const {projectId} = req.params
    const project = req.body;

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
        return res.status(404).json({success: false, message: "project not found"});
    }

    try {
        const updateProject = await Project.findByIdAndUpdate(projectId, project, {new:true});
        res.status(200).json({success: true, message: "project updated"});
    } catch (error) {
        console.log("error in updating project: ", error.message);
        res.status(500).json({success: false, message: "server error"});
    }
}

export const deleteProject = async (req, res) => {
    const {projectId} = req.params

    try {
        await Document.deleteMany({project: projectId});
        await IndexCard.deleteMany({project: projectId});
        await Project.findByIdAndDelete(projectId);
        res.status(200).json({success: true, message: "project + documents and corkboard deleted"});
    } catch (error) {
        console.log("error in deleting project: ", error.message);
        res.status(404).json({success: false, message: "project not found"});
    }
}