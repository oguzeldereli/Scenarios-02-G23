import express from "express";
import {createChapter, deleteChapter, getAllChapters, getChapter, updateChapter} from "../controllers/chapter.controller.js";

const router = express.Router();

// get all chapters
router.get("/", getAllChapters);
// get a specific chapter
router.get("/:id", getChapter);
// create a new chapter
router.post("/", createChapter);
// update a chapter
router.put("/:id", updateChapter);
// delete a chapter
router.delete("/:id", deleteChapter);

export default router;