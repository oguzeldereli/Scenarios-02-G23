import mongoose from "mongoose";

const indexCardSchema = new mongoose.Schema({
    title:{type: String, required: true},
    content: {type: String},
    colour: {type: String, default: "#ffffff"},
    position: {type: Number, required: true}, // order in the corkboard
    project: {type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true},
}, {
    timestamps: true //created at, updated at
});

const indexCard = mongoose.model("IndexCard", indexCardSchema);

export default indexCard;