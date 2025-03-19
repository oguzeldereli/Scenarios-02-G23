import mongoose from "mongoose";

const projectsSchema = new mongoose.Schema({
    title:{type: String, required: true},
}, {
    timestamps: true //created at, updated at
});

const Project = mongoose.model("Project", projectsSchema);

export default Project;