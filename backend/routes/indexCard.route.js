import express from "express";
import {
    createIndexCard,
    deleteIndexCard,
    getAllIndexCards,
    getIndexCard,
    updateIndexCard
} from "../controllers/indexCard.controller.js";

const router = express.Router({mergeParams: true});

router.get("/", getAllIndexCards); // get all index cards from a specific project's corkboard
router.get("/:indexCardId", getIndexCard); // get a specific index card
router.post("/", createIndexCard); // create an index card in a specific project's corkboard
router.put("/:indexCardId", updateIndexCard); // update an index card
router.delete("/:indexCardId", deleteIndexCard); // delete an index card

export default router;