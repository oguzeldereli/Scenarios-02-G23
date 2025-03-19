import IndexCard from "../models/indexCard.model.js"
import Project from "../models/project.model.js";
import mongoose from "mongoose";

export const getAllIndexCards = async (req, res) => {
    const {projectId} = req.params;
    try {
        const indexCards = await IndexCard.find({project: projectId});
        if (!indexCards.length) {
            return res.status(404).json({ success: false, message: "no index cards found for this project" });
        }
        res.status(200).json({success: true, data: indexCards});
    } catch (error) {
        console.log("error in fetching index cards: ", error.message);
        res.status(500).json({success: false, message: "server error"});
    }
}

export const getIndexCard = async (req, res) => {
    const {indexCardId} = req.params;

    try {
        const indexCard = await IndexCard.findById(indexCardId);
        res.status(200).json({success: true, data: indexCard});
    } catch (error) {
        console.log("error in fetching index card: ", error.message);
        res.status(404).json({success: false, message: "index card not found"});
    }
}

export const createIndexCard = async (req, res) => {
    const {projectId} = req.params;
    const {title, content, colour, position} = req.body;

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

        const newIndexCard = new IndexCard({ title, content, colour, position, project: projectId });
        await newIndexCard.save();

        res.status(201).json({success: true, data: newIndexCard});
    } catch (error) {
        console.error("Error in creating index card:", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const updateIndexCard = async (req, res) => {
    const {indexCardId} = req.params
    const indexCard = req.body;

    if (!mongoose.Types.ObjectId.isValid(indexCardId)) {
        return res.status(404).json({success: false, message: "index card not found"});
    }

    try {
        await IndexCard.findByIdAndUpdate(indexCardId, indexCard, {new:true});
        res.status(200).json({success: true, message: "index card updated"});
    } catch (error) {
        console.log("error in updating index card: ", error.message);
        res.status(500).json({success: false, message: "server error"});
    }
}

export const deleteIndexCard = async (req, res) => {
    const {indexCardId} = req.params

    try {
        await IndexCard.findByIdAndDelete(indexCardId);
        res.status(200).json({success: true, message: "index card deleted"});
    } catch (error) {
        console.log("error in deleting index card: ", error.message);
        res.status(404).json({success: false, message: "index card not found"});
    }
}