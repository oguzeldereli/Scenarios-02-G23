import mongoose from "mongoose";

const chaptersSchema = new mongoose.Schema({
    title:{type: String, required: true},
    content: {type: String, required: true},
    project: {type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true},
}, {
    timestamps: true //created at, updated at
});

const Chapter = mongoose.model("Chapter", chaptersSchema);

export default Chapter;