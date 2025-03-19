import Document from "../models/document.model.js";
import Project from "../models/project.model.js";
import mongoose from "mongoose";

export const getDocument = async (req, res) => {
    const {documentId} = req.params;

    try {
        const document = await Document.findById(documentId);
        res.status(200).json({success: true, data: document});
    } catch (error) {
        console.log("error in fetching document: ", error.message);
        res.status(404).json({success: false, message: "document not found"});
    }
}

export const createDocument = async (req, res) => {
    const {projectId} = req.params;
    const {title, content, type} = req.body;

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

        const newDocument = new Document({ title, content, type, project: projectId });
        await newDocument.save();

        res.status(201).json({ success: true, data: newDocument });
    } catch (error) {
        console.error("Error in creating document:", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const updateDocument = async (req, res) => {
    const {documentId} = req.params
    const document = req.body;

    if (!mongoose.Types.ObjectId.isValid(documentId)) {
        return res.status(404).json({success: false, message: "document not found"});
    }

    try {
        const updatedDocument = await Document.findByIdAndUpdate(documentId, document, {new:true});
        res.status(200).json({success: true, message: "document updated"});
    } catch (error) {
        console.log("error in updating document: ", error.message);
        res.status(500).json({success: false, message: "server error"});
    }
}

export const deleteDocument = async (req, res) => {
    const {documentId} = req.params

    try {
        await Document.findByIdAndDelete(documentId);
        res.status(200).json({success: true, message: "document deleted"});
    } catch (error) {
        console.log("error in deleting document: ", error.message);
        res.status(404).json({success: false, message: "document not found"});
    }
}