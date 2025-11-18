import mongoose from "mongoose";

const studentProfileSchema = mongoose.Schema({
    studentId: {
        type: mongoose.Schema.ObjectId,
        ref: "studentAuth",
        required: true,
    },
    studentName: {
        type: String,
        required: true
    },
    institute: {
        type: mongoose.Schema.ObjectId,
        ref: "SubAdmin",
        required: true,
    },
    program: {
        type: String,
        enum: ["honors", "degree", "intermediate"],
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    classYear: {
        type: String,
        required: true,
    },
    session: {
        type: String,
        required: true,
    },
    registrationNumber: {
        type: String,
        required: true,
    },
    classRoll: {
        type: String,
        required: true,
    },
    electiveSubject: {
        type: String,
    },
    contactNumber: {
        type: Number,
    },
    hasImprovement: {
        type: Boolean,
        default: false,
    },
    improvementSubjects: [String],
    profilePicture: {
        type: String,
        required: false,
    },
    documents: {
        type: [String],
        default: [],
    },
    isOtherStudent: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const StudentProfileModel = mongoose.models.studentProfile || mongoose.model("studentProfile", studentProfileSchema);

export default StudentProfileModel;
