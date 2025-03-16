import Chapter from "../models/chapter.model.js";
import mongoose from "mongoose";

export const getAllChapters = async (req, res) => {
    try {
        const chapters = await Chapter.find({});
        res.status(200).json({success: true, data: chapters});
    } catch (error) {
        console.log("error in fetching chapters: ", error.message);
        res.status(500).json({success: false, message: "server error"});
    }
}

export const getChapter = async (req, res) => {
    const {id} = req.params

    try {
        const chapter = await Chapter.findById(id);
        res.status(200).json({success: true, data: chapter});
    } catch (error) {
        console.log("error in retrieving chapter: ", error.message);
        res.status(404).json({success: false, message: "chapter not found"});
    }
}

export const createChapter = async (req, res) => {
    const chapter = req.body; // user will send this data

    if (!chapter.title || !chapter.content) {
        return res.status(400).json({success:false, message: "Please provide all fields"});
    }

    const newChapter = new Chapter(chapter);

    try {
        await newChapter.save();
        res.status(201).json({success: true, data: newChapter});
    } catch(error) {
        console.error("Error in creating product: ", error.message);
        res.status(500).json({success: false, message: "Server error"});
    }
}

export const updateChapter = async (req, res) => {
    const {id} = req.params
    const chapter = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({success: false, message: "chapter not found"});
    }

    try {
        const updatedChapter = await Chapter.findByIdAndUpdate(id, chapter, {new:true});
        res.status(200).json({success: true, message: "chapter updated"});
    } catch (error) {
        console.log("error in updating chapter: ", error.message);
        res.status(500).json({success: false, message: "server error"});
    }
}

export const deleteChapter = async (req, res) => {
    const {id} = req.params

    try {
        await Chapter.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "chapter deleted"});
    } catch (error) {
        console.log("error in deleting chapter: ", error.message);
        res.status(404).json({success: false, message: "chapter not found"});
    }
}

