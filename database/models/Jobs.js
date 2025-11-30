import mongoose from "mongoose";

const postWithFeeSchema = mongoose.Schema({
    postName: { type: String, required: true },
    payPaymentFee: { type: Number, required: true, },
    charge: { type: Number, required: true, },
    totalFee: { type: Number, required: true, },
}, { _id: false })

const jobPostSchema = new mongoose.Schema(
    {
        category: {
            type: String,
            required: true,
            trim: true,
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        startDate: {
            type: String,
            required: true,
        },
        endDate: {
            type: String,
            required: true,
        },
        totalVacancy: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        postWithFee: {
            type: [],
            required: true,
            default: []
        },
        noticeLink: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

// Reuse model if already compiled (Next.js hot reload fix)
const JobPost =
    mongoose.models.JobPost || mongoose.model("JobPost", jobPostSchema);

export default JobPost;
