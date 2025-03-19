import mongoose from "mongoose";

const corkboardSchema = new mongoose.Schema({
    title:{type: String, required: true},
    project: {type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true},
}, {
    timestamps: true //created at, updated at
});

const Corkboard = mongoose.model("Corkboard", corkboardSchema);

export default Corkboard;