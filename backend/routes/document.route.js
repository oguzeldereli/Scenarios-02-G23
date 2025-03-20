import express from "express";
import {
    createDocument,
    deleteDocument,
    getDocument,
    updateDocument
} from "../controllers/document.controller.js";

const router = express.Router({ mergeParams: true });

router.post("/", createDocument); // create a new document inside a specific project
router.get("/:documentId", getDocument); // get a specific document
router.put("/:documentId", updateDocument); // update a document
router.delete("/:documentId", deleteDocument); // delete a document

export default router;