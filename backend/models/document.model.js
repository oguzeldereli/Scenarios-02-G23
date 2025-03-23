import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
    title:{type: String, required: true},
    content: {type: String, required: true},
    type: {type: String, enum: ["scene", "location", "character", "research"], required: true}, // specifies category
    project: {type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true},
}, {
    timestamps: true //created at, updated at
});

const Document = mongoose.model("Document", documentSchema);

export default Document;