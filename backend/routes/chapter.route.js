import express from "express";
import {
    createChapter,
    deleteChapter,
    getChapter,
    updateChapter
} from "../controllers/chapter.controller.js";

const router = express.Router({ mergeParams: true });

router.post("/", createChapter); // create a new chapter inside a specific project
router.get("/:chapterId", getChapter); // get a specific chapter
router.put("/:chapterId", updateChapter); // update a chapter
router.delete("/:chapterId", deleteChapter); // delete a chapter

export default router;