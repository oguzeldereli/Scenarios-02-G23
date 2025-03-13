import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import {connectDB} from "./config/db.js";
import Chapter from "./models/chapter.model.js";

dotenv.config();
const app = express();

app.use(express.json()); // allows us to accept json data in the req.body
app.use(cors());

// create a new chapter
app.post("/api/chapters", async (req, res) => {
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
});

// update a chapter
app.put("/api/chapters/:id", async (req, res) => {
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
});

// delete a chapter
app.delete("/api/chapters/:id", async (req, res) => {
    const {id} = req.params

    try {
        await Chapter.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "chapter deleted"});
    } catch (error) {
        console.log("error in deleting chapter: ", error.message);
        res.status(404).json({success: false, message: "chapter not found"});
    }
});

// get all chapters
app.get("/api/chapters", async (req, res) => {
    try {
        const chapters = await Chapter.find({});
        res.status(200).json({success: true, data: chapters});
    } catch (error) {
        console.log("error in fetching chapters: ", error.message);
        res.status(500).json({success: false, message: "server error"});
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    connectDB();
    console.log(`Server running on port ${PORT}`);
});




// /home/projects
// /home/projects/project1
// /home/projects/project1/chapter1
// /home/projects/project1/corkboard
