
import mongoose from "mongoose";

const studentAuthSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
}, { timestamps: true });

 const StudentAuthModel =  mongoose.models.studentAuth || mongoose.model("studentAuth", studentAuthSchema);


export default StudentAuthModel