import Chapter from "../models/chapter.model.js";
import Project from "../models/project.model.js";
import mongoose from "mongoose";

export const getChapter = async (req, res) => {
    const {chapterId} = req.params;

    try {
        const chapter = await Chapter.findById(chapterId);
        res.status(200).json({success: true, data: chapter});
    } catch (error) {
        console.log("error in fetching chapter: ", error.message);
        res.status(404).json({success: false, message: "chapter not found"});
    }
}

export const createChapter = async (req, res) => {
    const {projectId} = req.params;
    const {title, content} = req.body;

    console.log("Received projectId:", projectId);

    try {
        if (!mongoose.Types.ObjectId.isValid(projectId)) {
            return res.status(400).json({ success: false, message: "Invalid project ID" });
        }

        const projectExists = await Project.findById(projectId);
        if (!projectExists) {
            return res.status(404).json({ success: false, message: "Project not found" });
        }

        if (!title || !content) {
            return res.status(400).json({ success: false, message: "Please provide all fields" });
        }

        const newChapter = new Chapter({ title, content, project: projectId });
        await newChapter.save();

        res.status(201).json({ success: true, data: newChapter });
    } catch (error) {
        console.error("Error in creating chapter:", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const updateChapter = async (req, res) => {
    const {chapterId} = req.params
    const chapter = req.body;

    if (!mongoose.Types.ObjectId.isValid(chapterId)) {
        return res.status(404).json({success: false, message: "chapter not found"});
    }

    try {
        const updatedChapter = await Chapter.findByIdAndUpdate(chapterId, chapter, {new:true});
        res.status(200).json({success: true, message: "chapter updated", data: updatedChapter});
    } catch (error) {
        console.log("error in updating chapter: ", error.message);
        res.status(500).json({success: false, message: "server error"});
    }
}

export const deleteChapter = async (req, res) => {
    const {chapterId} = req.params

    try {
        await Chapter.findByIdAndDelete(chapterId);
        res.status(200).json({success: true, message: "chapter deleted"});
    } catch (error) {
        console.log("error in deleting chapter: ", error.message);
        res.status(404).json({success: false, message: "chapter not found"});
    }
}